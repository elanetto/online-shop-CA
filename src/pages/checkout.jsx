import { useCart } from "../stores/store.js";
import { useNavigate } from "react-router-dom";
import { Cart } from "../stores/Cart.jsx";

export function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    function handlePayment() {
        clearCart();
        navigate("/order-confirmation");
    }

    return (
        
        <div className="flex flex-col justify-center items-center">
            <title>Checkout</title>
            <h1 className="font-bold text-blue-900 text-3xl text-center">Checkout</h1>
            <Cart />
            {cart.length > 0 && (
                <button
                    onClick={handlePayment}
                    className="mt-6 px-6 py-2 bg-blue-700 hover:bg-blue-950 text-white rounded-lg text-lg cursor-pointer"
                >
                    Pay Now
                </button>
            )}
        </div>
    );
}
