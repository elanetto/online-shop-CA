import { create } from "zustand";

export const useCart = create((set, get) => ({
    cart: [],

    addToCart: (product) =>
        set((state) => {
            const existingProduct = state.cart.find((item) => item.id === product.id);

            if (existingProduct) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }

            return {
                cart: [...state.cart, { ...product, quantity: 1 }],
            };
        }),

    removeFromCart: (productId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId),
        })),

    updateQuantity: (productId, newQuantity) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            ),
        })),

    clearCart: () => set({ cart: [] }),

    getTotalPrice: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => total + item.quantity * item.discountedPrice, 0).toFixed(2);
    },
}));
