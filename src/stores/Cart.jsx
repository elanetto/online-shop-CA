import { useCart } from "../stores/store.js";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

    const getTotalSavings = () => {
        return cart.reduce((total, item) => {
            if (item.discountedPrice < item.price) {
                const savingsPerItem = (item.price - item.discountedPrice) * item.quantity;
                return total + savingsPerItem;
            }
            return total;
        }, 0).toFixed(2);
    };

    const totalSavings = getTotalSavings();

    return (
        <div className="lg:w-1/2 w-full mx-auto p-6">
            <h2 className="text-2xl font-bold text-blue-900 text-center mb-4">Your Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow">
                            <Link to={`/product/${item.id}`}>
                                <img
                                    src={item.image.url}
                                    alt={item.image.alt && item.image.alt.trim() !== ""
                                        ? item.image.alt
                                        : "This is an image of the item"}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </Link>
                            <div className="flex-1 ml-4">
                                <h3 className="font-bold">{item.title}</h3>
                                <p>
                                    {item.discountedPrice < item.price && (
                                        <span className="line-through text-gray-500 mr-1">${item.price.toFixed(2)}</span>
                                    )}
                                    ${item.discountedPrice.toFixed(2)}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button
                                    className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >+</button>
                            </div>
                            <button
                                className="ml-4 px-2 py-1 bg-red-500 text-white rounded flex items-center justify-center cursor-pointer"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Remove item from cart"
                            >
                                <span className="hidden sm:block">Remove</span>
                                <span className="block sm:hidden">
                                    <Trash2 size={18} />
                                </span>
                            </button>
                        </div>
                    ))}

                    <div className="text-right font-bold text-xl mt-4 space-y-2">
                        {totalSavings > 0 && (
                            <p className="text-green-600">
                                Savings: ${totalSavings}
                            </p>
                        )}

                        <p>
                            Total: ${getTotalPrice()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
