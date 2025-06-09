import { useCart } from "../stores/store.js";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const navigate = useNavigate();

  function handlePayment() {
    clearCart();
    navigate("/order-confirmation");
  }

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  const totalSavings = cart.reduce((acc, item) => {
    if (item.discountedPrice && item.discountedPrice < item.price) {
      return acc + (item.price - item.discountedPrice) * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-12 items-center bg-white text-neutral-800">
      <h1 className="text-4xl font-extrabold text-center tracking-tight">
        Checkout
      </h1>

      <div className="w-full space-y-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-neutral-100 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={item.image.url}
                alt={item.image.alt || item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Title */}
              <div className="flex-1 text-center">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                {item.discountedPrice < item.price ? (
                  <>
                    <p className="text-sm text-neutral-500 line-through">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-md font-medium text-green-800">
                      ${item.discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-red-800">
                      You save ${(item.price - item.discountedPrice).toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-md font-medium text-neutral-800">
                    ${item.price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    −
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-500 italic">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Summary */}
      {cart.length > 0 && (
        <div className="w-full sm:w-[400px] space-y-6">
          <div className="text-center space-y-1">
            <p className="text-lg">Total</p>
            <p className="text-3xl font-bold text-green-800 tracking-tight">
              ${totalPrice.toFixed(2)}
            </p>
            {totalSavings > 0 && (
              <p className="text-sm text-red-800">
                You’re saving ${totalSavings.toFixed(2)} today!
              </p>
            )}
          </div>
          <button
            onClick={handlePayment}
            className="w-full py-3 px-6 bg-neutral-900 text-white rounded-lg text-lg font-medium tracking-wide hover:bg-neutral-950 transition"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}
