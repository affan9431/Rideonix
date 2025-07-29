import React, { useState } from "react";
import axios from "axios";
import {
  BikeIcon,
  CreditCard,
  FileText,
  Headset,
  LifeBuoy,
  MapPin,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function RiderHelpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issues: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://rideonix-backend.onrender.com/api/contact", formData);
      if (res.data.success === "success") {
        toast.success("Form submitted successfully!");
        setFormData({ name: "", email: "", issues: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      {/* Hero Section */}
      <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
        <img
          src="/images/help-center.avif"
          alt="Help Center Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <LifeBuoy className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
            Rider Help Center
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Your one-stop solution for all ride-related queries.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <Headset className="h-6 w-6 text-blue-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How do I book a ride?",
              a: "Open the app, select your pickup and drop location, and tap on 'Book Ride'.",
            },
            {
              q: "What if no drivers are available?",
              a: "Wait a few minutes and try again. You can also try adjusting your pickup location slightly.",
            },
            {
              q: "How do I pay after the ride?",
              a: "You can pay via UPI, card, or cash depending on your selected option.",
            },
            {
              q: "Can I cancel a ride after booking?",
              a: "Yes, you can cancel a ride before the driver arrives. Cancellation fees may apply depending on the timing.",
            },
          ].map((faq, idx) => (
            <details
              key={idx}
              className="border border-gray-200 rounded-lg overflow-hidden group"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                {faq.q}
                <svg
                  className="w-5 h-5 transform transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 border-t border-gray-200">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              Contact Support
            </h3>
            <p className="text-gray-600 mb-4">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@example.com"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="issues">Select Issue</label>
                <select
                  id="issues"
                  name="issues"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.issues}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select an issue type</option>
                  <option value="payment">Payment Issue</option>
                  <option value="ride">Ride Issue</option>
                  <option value="account">Account Issue</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Please describe your issue in detail..."
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-600 cursor-pointer"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <MapPin className="h-6 w-6 text-blue-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <FileText />, label: "View Past Rides" },
            { icon: <CreditCard />, label: "Payment History" },
            { icon: <User />, label: "Manage Profile" },
            { icon: <XCircle />, label: "Cancel Ride" },
          ].map((action, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-700"
            >
              {React.cloneElement(action.icon, {
                className: "h-6 w-6 text-gray-600",
              })}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Emergency Section */}
      <section>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg shadow-sm">
          <div className="p-4 flex items-center gap-3">
            <BikeIcon className="h-8 w-8 flex-shrink-0 text-red-600" />
            <div>
              <h3 className="font-semibold text-lg">Emergency Assistance</h3>
              <p className="text-sm">
                In case of emergency, call <strong>112</strong> or share your
                live location with a trusted contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 hover:bg-blue-700">
          <MessageSquare className="h-6 w-6" />
          <span className="hidden md:inline">Chat with Support</span>
        </button>
      </div>
    </div>
  );
}
