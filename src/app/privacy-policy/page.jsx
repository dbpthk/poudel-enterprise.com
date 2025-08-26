import React from "react";
import { contactInfo } from "../_config/contact";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          {/* Last Updated */}
          <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Last Updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Poudel Enterprises ("we," "our," or "us") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website, use our services, or interact with us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our services, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Personal Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide
              to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>
                Name and contact information (email, phone number, address)
              </li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information</li>
              <li>Communication preferences</li>
              <li>Feedback and survey responses</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Automatically Collected Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain
              information, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>
                Device information (IP address, browser type, operating system)
              </li>
              <li>Usage data (pages visited, time spent, links clicked)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Analytics and performance data</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>Providing and maintaining our services</li>
              <li>Processing transactions and managing accounts</li>
              <li>Communicating with you about our services</li>
              <li>Improving our website and user experience</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Ensuring security and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. However, we may share your information in the following
              circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>
                With trusted service providers who assist in our operations
              </li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data transmission protocols</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact us using the information
              provided below.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your
              browsing experience, analyze website traffic, and understand where
              our visitors are coming from.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can control cookie settings through your browser preferences.
              However, disabling certain cookies may affect the functionality of
              our website.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites or services.
              We are not responsible for the privacy practices or content of
              these external sites. We encourage you to review their privacy
              policies before providing any personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you believe we have collected such information, please
              contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date. We encourage you
              to review this policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📧</span>
                  <span className="text-gray-700">
                    Email: {contactInfo.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <span className="text-gray-700">
                    Phone: {contactInfo.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <span className="text-gray-700">
                    Address: {contactInfo.fullAddress}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center pt-8 border-t border-gray-200">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>←</span>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
