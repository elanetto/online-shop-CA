import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Contact() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        const nameParts = formData.fullName.trim().split(" ");
        if (nameParts.length < 2 || nameParts.some((part) => part.length < 2)) {
            newErrors.fullName = "Please enter your full name (first and last name).";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (formData.subject.length < 5) {
            newErrors.subject = "Subject must be at least 5 characters.";
        }

        if (formData.message.trim().split(" ").length < 5) {
            newErrors.message = "Message must contain at least 5 words.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            navigate("/message-sent");
        }
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="font-bold text-blue-900 text-3xl text-center mb-6">Contact Us</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96">
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        placeholder="Your full name"
                        className={`w-full p-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded`}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Subject</label>
                    <input
                        type="text"
                        placeholder="Main subject: What is this about?"
                        className={`w-full p-2 border ${errors.subject ? "border-red-500" : "border-gray-300"} rounded`}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Message</label>
                    <textarea
                        className={`w-full p-2 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded`}
                        rows="4"
                        placeholder="Please explain your question or concern"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                    Send Message
                </button>
            </form>
        </div>
    );
}
