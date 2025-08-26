"use client";
import { toast } from "sonner";
import { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const isValidEmail = email.includes("@") && email.includes(".com");

  const handleSubscribe = () => {
    if (isValidEmail) {
      toast.success("Subscribed successfully 🎉");
    } else {
      toast.error("Please enter a valid email address");
    }
  };
  return (
    <div className="bg-gradient-light py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Stay Updated with Poudel Enterprises
        </h3>
        <p className="text-gray-600 mb-8 text-lg">
          Get the latest news, product updates, and exclusive offers delivered
          to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleSubscribe}
            className="px-6 py-3 bg-gradient-hero text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            Subscribe
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy.{" "}
          <span
            className="text-gray-900 cursor-pointer"
            onClick={() => toast.success("Unsubscribed")}
          >
            Unsubscribe
          </span>{" "}
          at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsLetterBox;
