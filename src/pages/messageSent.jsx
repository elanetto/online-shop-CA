import { Link } from "react-router-dom";

export function MessageSent() {
    return (
        <div className="flex flex-col pt-10 items-center h-screen">
            <div className="bg-white p-6 rounded-lg text-center">
                <h1 className="text-green-600 font-bold text-2xl mb-4">Message Sent!</h1>
                <p className="text-gray-700 mb-4">Thank you for reaching out. We'll get back to you soon.</p>
                <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
