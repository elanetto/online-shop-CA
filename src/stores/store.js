import { create } from "zustand";

export const useCart = create((set) =>({
    cart: [],
    addToCart: (cart) => set((state)=>({
        cart: [...state.cart, cart]
    })),
    removeFromCart: (cart) => 
        set((state)=>({
            cart: state.cart.filter((value)=> cart != value),
        })),
    removeAll: () => set({cart: []}),
}))