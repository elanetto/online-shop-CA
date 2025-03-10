import { Link } from "react-router-dom";
import { useCart } from "../../stores/store.js";
import { ShoppingCart } from "lucide-react";

export function CartIcon() {
    const cart = useCart((state) => state.cart);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link to="/cart" className="relative">
            <ShoppingCart size={28} className="text-white hover:text-amber-200" />

            {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                </span>
            )}
        </Link>
    );
}
