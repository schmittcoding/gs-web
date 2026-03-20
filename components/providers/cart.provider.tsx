"use client";

import { ShopItem } from "@/components/item-shop/types.item-shop";
import { getCartItemsFresh } from "@/lib/cart/actions.cart";
import { CartItem } from "@/lib/cart/types.cart";
import {
  getCartFromStorage,
  getEffectiveLimit,
  saveCartToStorage,
} from "@/lib/cart/utils.cart";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type CartContextProps = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isSyncing: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => boolean;
  removeItem: (productNum: number) => void;
  updateQuantity: (productNum: number, quantity: number) => boolean;
  clearCart: () => void;
  /** Fetch fresh item-shop data from the server and sync cart prices/stock. */
  syncCart: () => Promise<void>;
  /** Sync cart prices/stock from already-available shop items (no fetch). */
  syncCartFromShopData: (shopItems: ShopItem[]) => void;
};

const CartContext = createContext<CartContextProps | null>(null);

function createCartStore(initialItems: CartItem[]) {
  let items = initialItems;
  const listeners = new Set<() => void>();

  function getSnapshot() {
    return items;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function setItems(next: CartItem[] | ((prev: CartItem[]) => CartItem[])) {
    items = typeof next === "function" ? next(items) : next;
    saveCartToStorage(items);
    listeners.forEach((l) => l());
  }

  return { getSnapshot, subscribe, setItems };
}

let storeInstance: ReturnType<typeof createCartStore> | null = null;

function getOrCreateStore(initialItems: CartItem[]) {
  if (!storeInstance) {
    storeInstance = createCartStore(initialItems);
  }
  return storeInstance;
}

const EMPTY_CART: CartItem[] = [];

export function CartProvider({ children }: PropsWithChildren) {
  const store = useMemo(() => {
    const initial = getCartFromStorage().map((c) => ({
      ...c,
      item_price: c.final_price,
    }));
    return getOrCreateStore(initial);
  }, []);

  const [isSyncing, setIsSyncing] = useState(false);
  const syncRef = useRef(0);

  const items = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => EMPTY_CART,
  );

  /**
   * Merge shop data into current cart items.
   * Items not found in shopMap are flagged as removed and filtered out.
   */
  const applyShopData = useCallback(
    (shopMap: Map<number, ShopItem>) => {
      const currentItems = store.getSnapshot();
      const updatedItems: CartItem[] = currentItems
        .filter((c) => shopMap.has(c.product_num))
        .map((c) => {
          const fresh = shopMap.get(c.product_num)!;
          return {
            product_num: c.product_num,
            quantity: c.quantity,
            item_name: fresh.item_name,
            item_image: fresh.item_image,
            item_price: fresh.item_price,
            final_price: fresh.final_price,
            remaining_purchase_limit: fresh.remaining_purchase_limit,
            item_stock: fresh.item_stock,
            item_description: fresh.item_description,
          };
        });
      store.setItems(updatedItems);
    },
    [store],
  );

  /** Sync cart prices/stock from already-available shop items (no fetch). */
  const syncCartFromShopData = useCallback(
    (shopItems: ShopItem[]) => {
      if (store.getSnapshot().length === 0) return;
      const shopMap = new Map(shopItems.map((s) => [s.product_num, s]));
      applyShopData(shopMap);
    },
    [store, applyShopData],
  );

  /** Fetch fresh item-shop data from the server and sync cart prices/stock. */
  const syncCart = useCallback(async () => {
    const currentItems = store.getSnapshot();
    if (currentItems.length === 0) return;

    const id = ++syncRef.current;
    setIsSyncing(true);

    const cookieItems = currentItems.map((i) => ({
      product_num: i.product_num,
      quantity: i.quantity,
      item_name: i.item_name,
      item_image: i.item_image,
      final_price: i.final_price,
    }));

    const synced = await getCartItemsFresh(cookieItems);

    // Stale response — a newer sync was started
    if (id !== syncRef.current) return;

    const updatedItems: CartItem[] = synced
      .filter((s) => !s.is_removed)
      .map((s) => ({
        product_num: s.product_num,
        item_name: s.item_name,
        item_image: s.item_image,
        final_price: s.final_price,
        item_price: s.item_price,
        quantity: s.quantity,
        remaining_purchase_limit: s.remaining_purchase_limit,
        item_stock: s.item_stock,
        item_description: s.item_description,
      }));

    store.setItems(updatedItems);
    setIsSyncing(false);
  }, [store]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">): boolean => {
      const current = store.getSnapshot();
      const existing = current.find((i) => i.product_num === item.product_num);
      const currentQty = existing?.quantity ?? 0;
      const limit = getEffectiveLimit(
        item.remaining_purchase_limit ?? existing?.remaining_purchase_limit,
        item.item_stock ?? existing?.item_stock,
      );

      if (typeof limit === "number" && currentQty + 1 > limit) {
        return false;
      }

      store.setItems((prev) => {
        const found = prev.find((i) => i.product_num === item.product_num);
        if (found) {
          return prev.map((i) =>
            i.product_num === item.product_num
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      return true;
    },
    [store],
  );

  const removeItem = useCallback(
    (productNum: number) => {
      store.setItems((prev) =>
        prev.filter((i) => i.product_num !== productNum),
      );
    },
    [store],
  );

  const updateQuantity = useCallback(
    (productNum: number, quantity: number): boolean => {
      if (quantity <= 0) {
        removeItem(productNum);
        return true;
      }

      const current = store.getSnapshot();
      const existing = current.find((i) => i.product_num === productNum);
      const limit = getEffectiveLimit(
        existing?.remaining_purchase_limit,
        existing?.item_stock,
      );

      if (typeof limit === "number" && quantity > limit) {
        return false;
      }

      store.setItems((prev) =>
        prev.map((i) =>
          i.product_num === productNum ? { ...i, quantity } : i,
        ),
      );
      return true;
    },
    [store, removeItem],
  );

  const clearCart = useCallback(() => {
    store.setItems([]);
  }, [store]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.final_price * i.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextProps>(
    () => ({
      items,
      totalItems,
      totalPrice,
      isSyncing,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      syncCart,
      syncCartFromShopData,
    }),
    [
      items,
      totalItems,
      totalPrice,
      isSyncing,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      syncCart,
      syncCartFromShopData,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextProps {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart() must be used within a CartProvider.");
  }

  return ctx;
}
