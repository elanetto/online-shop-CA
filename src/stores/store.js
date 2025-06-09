import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const existingItem = get().cart.find((i) => i.id === item.id);
        if (existingItem) {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { ...item, quantity: 1 }],
          }));
        }
      },
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      getTotalPrice: () => {
        return get()
          .cart.reduce(
            (total, item) => total + item.discountedPrice * item.quantity,
            0
          )
          .toFixed(2);
      },
      increaseQuantity: (id) => {
        const item = get().cart.find((i) => i.id === id);
        if (item) {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        }
      },

      decreaseQuantity: (id) => {
        const item = get().cart.find((i) => i.id === id);
        if (item && item.quantity > 1) {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          }));
        } else if (item && item.quantity === 1) {
          set((state) => ({
            cart: state.cart.filter((i) => i.id !== id),
          }));
        }
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
