"use client";

import { getCartItemsFresh } from "@/lib/cart/actions.cart";
import { CartCookieItem, CartItem } from "@/lib/cart/types.cart";
import {
  getEffectiveLimit,
  saveCartToCookiesClient,
} from "@/lib/cart/utils.cart";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
    saveCartToCookiesClient(items);
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

/**
 * Hydrate cookie items into CartItem shape with zeroed server fields.
 * Prices/limits will be populated by `getCartItemsFresh` on mount.
 */
function hydrateCookieItems(cookieItems: CartCookieItem[]): CartItem[] {
  return cookieItems.map((c) => ({
    ...c,
    final_price: 0,
    item_price: 0,
  }));
}

export function CartProvider({
  initialItems = [],
  children,
}: PropsWithChildren<{ initialItems?: CartCookieItem[] }>) {
  const hydratedItems = useMemo(
    () => hydrateCookieItems(initialItems),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
    [],
  );
  const store = getOrCreateStore(hydratedItems);
  const [isSyncing, setIsSyncing] = useState(initialItems.length > 0);

  const items = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => hydratedItems,
  );

  // Auto-sync cart items with fresh server data on mount
  useEffect(() => {
    const currentItems = store.getSnapshot();
    if (currentItems.length === 0) return;

    let cancelled = false;
    setIsSyncing(true);

    getCartItemsFresh(currentItems).then((synced) => {
      if (cancelled) return;

      // Filter out removed items and map back to CartItem shape
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
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync once on mount
  }, []);

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
