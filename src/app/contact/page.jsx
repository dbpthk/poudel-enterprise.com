"use client";

import React, { useState } from "react";
import { contactInfo } from "../_config/contact";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Building2,
  Users,
  Globe,
} from "lucide-react";
import NewsLetterBox from "../_components/NewsLetterBox";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: "Email Us",
      description: "Send us an email anytime",
      value: contactInfo.email,
      action: () => window.open(`mailto:${contactInfo.email}`),
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: "Call Us",
      description: "Speak with our team",
      value: contactInfo.phone,
      action: () => window.open(`tel:${contactInfo.phone}`),
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: "Visit Us",
      description: "Come see our office",
      value: contactInfo.fullAddress,
      action: () =>
        window.open(
          `https://maps.google.com/?q=${encodeURIComponent(
            contactInfo.fullAddress
          )}`
        ),
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const whyContactUs = [
    {
      icon: <MessageSquare className="w-7 h-7 text-white" />,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance for all your needs and inquiries.",
    },
    {
      icon: <Building2 className="w-7 h-7 text-white" />,
      title: "Expert Team",
      description:
        "Experienced professionals ready to help with any questions.",
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: "Personal Touch",
      description: "Personalized service and attention to every customer.",
    },
    {
      icon: <Globe className="w-7 h-7 text-white" />,
      title: "Global Reach",
      description: "Serving customers worldwide with local expertise.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 sm:py-10 md:py-12 lg:px-12 lg:py-15">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-4xl lg:text-6xl font-bold mb-8 leading-tight"
              style={{ color: "#1F2937" }}
            >
              Contact Us
            </h1>
            <p
              className="text-md lg:text-lg max-w-3xl mx-auto font-light leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              Get in touch with our team. We're here to help and answer any
              questions you may have.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="mt-10 sm:mt-5 py-8 lg:py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`${method.color} ${method.hoverColor} rounded-2xl p-6 text-white cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                onClick={method.action}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{method.title}</h3>
                    <p className="text-white/80 text-sm">
                      {method.description}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-medium">{method.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="mt-10 py-8 lg:py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
            {/* Left: Contact Form */}
            <div className="space-y-6">
              <h2
                className="text-3xl lg:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#1F2937" }}
              >
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-600">
                    Thank you for contacting us. We'll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#1F2937" }}
                >
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h4>
                      <p className="text-gray-600">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h4>
                      <p className="text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Office Address
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.address.street}
                        <br />
                        {contactInfo.address.suite}
                        <br />
                        {contactInfo.address.city}, {contactInfo.address.state}
                        <br />
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Business Hours
                      </h4>
                      <div className="space-y-1">
                        {businessHours.map((schedule, index) => (
                          <div
                            key={index}
                            className="flex justify-between gap-3 text-sm"
                          >
                            <span className="text-gray-600">
                              {schedule.day}
                            </span>
                            <span className="text-gray-800 font-medium">
                              {schedule.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Contact Us Section */}
      <div
        className="mt-10 py-15 lg:py-20"
        style={{ backgroundColor: "#D1D5DB" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Why Contact Us?
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#4B5563" }}
            >
              We're committed to providing exceptional service and support to
              all our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyContactUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Contact;
