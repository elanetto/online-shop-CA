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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/message-sent");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold text-neutral-900 mb-8 text-center">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-100 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        {/* Full Name */}
        <div>
          <label className="block font-medium text-neutral-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className={`w-full p-3 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.fullName ? "border-red-500" : "border-neutral-300"
            }`}
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-neutral-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className={`w-full p-3 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-neutral-300"
            }`}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block font-medium text-neutral-700 mb-1">Subject</label>
          <input
            type="text"
            placeholder="Main subject"
            className={`w-full p-3 rounded bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.subject ? "border-red-500" : "border-neutral-300"
            }`}
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          {errors.subject && (
            <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium text-neutral-700 mb-1">Message</label>
          <textarea
            rows="5"
            placeholder="Your message here..."
            className={`w-full p-3 bg-white rounded border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.message ? "border-red-500" : "border-neutral-300"
            }`}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          ></textarea>
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-neutral-900 hover:bg-neutral-700 text-white rounded-lg text-lg font-medium transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
