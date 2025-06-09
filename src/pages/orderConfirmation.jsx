import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export function OrderConfirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
      <CheckCircle className="w-16 h-16 text-green-800 mb-4" />
      <h1 className="text-4xl font-extrabold text-green-800 mb-2">
        Order Confirmed!
      </h1>
      <p className="text-lg text-neutral-700 mb-6 max-w-md">
        Thank you for your purchase. Your order has been placed and is being
        processed. You'll receive a confirmation email shortly.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-500 transition text-lg font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
