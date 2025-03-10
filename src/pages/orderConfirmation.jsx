import { Link } from "react-router-dom";

export function OrderConfirmation() {
    return (
        <div className="flex flex-col pt-10 items-center h-screen text-center">
            <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
            <p className="text-lg">Thank you for your purchase. Your order has been placed.</p>
            <Link to="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
                Continue Shopping
            </Link>
        </div>
    );
}
