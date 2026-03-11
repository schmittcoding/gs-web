"use client";

import { CartItem } from "@/lib/cart/types.cart";
import { saveCartToCookiesClient } from "@/lib/cart/utils.cart";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

type CartContextProps = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productNum: number) => void;
  updateQuantity: (productNum: number, quantity: number) => void;
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

export function CartProvider({
  initialItems = [],
  children,
}: PropsWithChildren<{ initialItems?: CartItem[] }>) {
  const storeRef = useRef<ReturnType<typeof createCartStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createCartStore(initialItems);
  }
  const store = storeRef.current;

  const items = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => initialItems,
  );

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      store.setItems((prev) => {
        const existing = prev.find((i) => i.product_num === item.product_num);
        if (existing) {
          return prev.map((i) =>
            i.product_num === item.product_num
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
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
    (productNum: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productNum);
        return;
      }
      store.setItems((prev) =>
        prev.map((i) =>
          i.product_num === productNum ? { ...i, quantity } : i,
        ),
      );
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
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      totalItems,
      totalPrice,
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
