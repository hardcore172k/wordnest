"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginModal from "../../components/LoginModal";
import SignupModal from "../../components/SignUpModal";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("community");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openSignupModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSignupModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    // FAQ accordion functionality
    const initFAQ = () => {
      const faqButtons = document.querySelectorAll(".faq-button");

      faqButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const content = this.nextElementSibling;
          const icon = this.querySelector(".faq-icon");

          // Close all other FAQs
          faqButtons.forEach((otherButton) => {
            if (otherButton !== this) {
              const otherContent = otherButton.nextElementSibling;
              const otherIcon = otherButton.querySelector(".faq-icon");
              otherContent.classList.add("hidden");
              otherIcon.style.transform = "rotate(0deg)";
            }
          });

          // Toggle current FAQ
          if (content.classList.contains("hidden")) {
            content.classList.remove("hidden");
            icon.style.transform = "rotate(180deg)";
          } else {
            content.classList.add("hidden");
            icon.style.transform = "rotate(0deg)";
          }
        });
      });
    };

    // Form input animations
    const initFormAnimations = () => {
      const inputs = document.querySelectorAll(".form-input");

      inputs.forEach((input) => {
        input.addEventListener("focus", function () {
          this.parentElement.classList.add("focused");
        });

        input.addEventListener("blur", function () {
          this.parentElement.classList.remove("focused");
        });
      });
    };

    // Intersection Observer for animations
    const initScrollAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1 }
      );

      const animatedElements = document.querySelectorAll(".fade-in-up");
      animatedElements.forEach((el) => observer.observe(el));
    };

    // Smooth scroll for internal links
    const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });
    };

    // Initialize all functionality
    initFAQ();
    initFormAnimations();
    initScrollAnimations();
    initSmoothScroll();

    // Cleanup event listeners on component unmount
    return () => {
      document.querySelectorAll(".faq-button").forEach((button) => {
        button.removeEventListener("click", () => {});
      });
      document.querySelectorAll(".form-input").forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", () => {});
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessMessage(true);
      e.target.reset();

      // Scroll to success message
      const successMessage = document.getElementById("successMessage");
      if (successMessage) {
        successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }, 2000);
  };

  return (
    <>
      <Header
        openSignupModal={openSignupModal}
        setIsLoginOpen={setIsLoginOpen}
      />
      <main className="container mx-auto px-6 py-16 bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold text-gray-800 mb-6 leading-tight fade-in-up">
              Get in <span className="gradient-text block">Touch</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 fade-in-up stagger-1">
              Have questions, ideas, or want to join our community? We&apos;d love to
              hear from you. Let&apos;s start a conversation that could change
              everything.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto fade-in-up stagger-2">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">24h</div>
                <div className="text-gray-600 font-medium">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">98%</div>
                <div className="text-gray-600 font-medium">
                  Satisfaction Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">5K+</div>
                <div className="text-gray-600 font-medium">
                  Messages Answered
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  24/7
                </div>
                <div className="text-gray-600 font-medium">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">
              How Can We Help?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the best way to reach us based on your needs. We&apos;re here to
              support you every step of the way.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="contact-card bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-20 h-20 sunset-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                General Inquiries
              </h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Questions about WordNest, our platform, or how to get started?
                We&apos;re here to help with any general questions.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>
                  <strong>Email:</strong> hello@wordnest.com
                </p>
                <p>
                  <strong>Response:</strong> Within 24 hours
                </p>
              </div>
            </div>
            <div className="contact-card bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-20 h-20 design-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Writer Support
              </h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Want to become a writer or need help with your existing
                articles? Our content team is ready to assist you.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>
                  <strong>Email:</strong> writers@wordnest.com
                </p>
                <p>
                  <strong>Response:</strong> Within 12 hours
                </p>
              </div>
            </div>
            <div className="contact-card bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-20 h-20 tech-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Technical Support
              </h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Experiencing technical issues or need help with platform
                features? Our tech team is here to solve any problems.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>
                  <strong>Email:</strong> support@wordnest.com
                </p>
                <p>
                  <strong>Response:</strong> Within 6 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Form Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-soft">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Fill out the form below and we&apos;ll get back to you as soon as
                  possible. We read every message personally.
                </p>
              </div>
              {showSuccessMessage && (
                <div
                  id="successMessage"
                  className="success-message bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center show"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-green-600">
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">
                    Contact Information
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-14 h-14 sunset-gradient rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-lg mb-2">
                          Email Address
                        </div>
                        <div className="text-gray-600 mb-1">
                          hello@wordnest.com
                        </div>
                        <div className="text-sm text-gray-500">
                          We respond within 24 hours
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-14 h-14 tech-gradient rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-lg mb-2">
                          Office Location
                        </div>
                        <div className="text-gray-600 mb-1">
                          123 Innovation Drive
                        </div>
                        <div className="text-gray-600 mb-1">
                          San Francisco, CA 94105
                        </div>
                        <div className="text-sm text-gray-500">
                          United States
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-14 h-14 design-gradient rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-lg mb-2">
                          Phone Number
                        </div>
                        <div className="text-gray-600 mb-1">
                          +1 (555) 123-4567
                        </div>
                        <div className="text-sm text-gray-500">
                          Monday - Friday, 9AM - 6PM PST
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-14 h-14 green-gradient rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-lg mb-2">
                          Live Chat
                        </div>
                        <div className="text-gray-600 mb-1">
                          Available on our website
                        </div>
                        <div className="text-sm text-gray-500">
                          Instant responses during business hours
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12">
                    <h5 className="font-semibold text-gray-800 mb-4">
                      Follow Us
                    </h5>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <form
                    id="contactForm"
                    className="space-y-8"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid md:grid-cols-2 gap-10">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-5">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="form-input w-full px-6 py-5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-5">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          className="form-input w-full px-6 py-5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-input w-full px-6 py-5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input w-full px-6 py-5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-5">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        required
                        className="form-input w-full px-6 py-5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="writer">Become a Writer</option>
                        <option value="partnership">
                          Partnership Opportunity
                        </option>
                        <option value="technical">Technical Support</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="press">Press & Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows="6"
                        required
                        className="form-input w-full px-6 py-5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    <div className="space-y-6 pt-4">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          className="mt-1.5 mr-5 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                        />
                        <label
                          htmlFor="newsletter"
                          className="text-sm text-gray-600 leading-relaxed"
                        >
                          I&apos;d like to receive updates about new articles and
                          WordNest news via email.
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="privacy"
                          name="privacy"
                          required
                          className="mt-1.5 mr-5 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                        />
                        <label
                          htmlFor="privacy"
                          className="text-sm text-gray-600 leading-relaxed"
                        >
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-orange-500 hover:underline"
                          >
                            Privacy Policy
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-orange-500 hover:underline"
                          >
                            Terms of Service
                          </a>
                          . *
                        </label>
                      </div>
                    </div>
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sunset-gradient text-white py-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 button-hover"
                      >
                        <span
                          className={isSubmitting ? "hidden" : "submit-text"}
                        >
                          Send Message
                        </span>
                        <span
                          className={
                            isSubmitting
                              ? "loading-text"
                              : "loading-text hidden"
                          }
                        >
                          Sending...
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions. Can&apos;t find what you&apos;re
              looking for? Contact us directly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <button className="faq-button w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-lg font-semibold text-gray-800">
                  How do I become a writer on WordNest?
                </span>
                <svg
                  className="w-6 h-6 text-gray-400 transform transition-transform faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="faq-content hidden px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  To become a writer on WordNest, simply fill out our contact
                  form with &quot;Become a Writer&quot; as the subject. Include samples of
                  your work and tell us about your expertise. Our content team
                  will review your application and get back to you within 48
                  hours.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <button className="faq-button w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-lg font-semibold text-gray-800">
                  What topics do you accept for publication?
                </span>
                <svg
                  className="w-6 h-6 text-gray-400 transform transition-transform faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="faq-content hidden px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  We accept high-quality content in Technology, Design,
                  Business, Productivity, Innovation, Lifestyle, Career
                  Development, and Entrepreneurship. All content must be
                  original, well-researched, and provide genuine value to our
                  professional audience.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <button className="faq-button w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-lg font-semibold text-gray-800">
                  How long does it take to get a response?
                </span>
                <svg
                  className="w-6 h-6 text-gray-400 transform transition-transform faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="faq-content hidden px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  We typically respond to general inquiries within 24 hours,
                  writer applications within 48 hours, and technical support
                  requests within 6 hours during business days. For urgent
                  matters, please call our support line.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <button className="faq-button w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-lg font-semibold text-gray-800">
                  Do you offer partnership opportunities?
                </span>
                <svg
                  className="w-6 h-6 text-gray-400 transform transition-transform faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="faq-content hidden px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  Yes! We&apos;re always interested in partnerships with companies,
                  educational institutions, and other platforms that align with
                  our mission. Contact us with &quot;Partnership Opportunity&quot; as the
                  subject to discuss potential collaborations.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <button className="faq-button w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-lg font-semibold text-gray-800">
                  Can I republish my content elsewhere?
                </span>
                <svg
                  className="w-6 h-6 text-gray-400 transform transition-transform faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="faq-content hidden px-8 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  Writers retain full rights to their content. You can republish
                  your articles elsewhere, though we appreciate a canonical link
                  back to the original WordNest publication. We believe in
                  empowering our writers to maximize their reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Office Location with Map */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">
              Visit Our Office
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Located in the heart of San Francisco&apos;s innovation district. Drop
              by for a coffee and chat about the future of content.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">
                Office Details
              </h4>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 sunset-gradient rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">
                      Address
                    </div>
                    <div className="text-gray-600">
                      123 Innovation Drive, Suite 400
                    </div>
                    <div className="text-gray-600">San Francisco, CA 94105</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 tech-gradient rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">
                      Office Hours
                    </div>
                    <div className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </div>
                    <div className="text-gray-600">
                      Saturday: 10:00 AM - 2:00 PM
                    </div>
                    <div className="text-gray-600">Sunday: Closed</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 design-gradient rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">
                      Getting Here
                    </div>
                    <div className="text-gray-600">
                      BART: Montgomery Station (2 blocks)
                    </div>
                    <div className="text-gray-600">
                      Parking: Available in building garage
                    </div>
                    <div className="text-gray-600">
                      Public Transit: Multiple bus lines nearby
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="sunset-gradient rounded-3xl p-12 text-center text-white shadow-soft">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6">Ready to Connect?</h3>
            <p className="text-xl mb-8 opacity-90">
              Whether you have a question, an idea, or want to join our
              community - we&apos;re here to help make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("contactForm")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 button-hover"
              >
                Send a Message
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300 button-hover">
                Schedule a Call
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SignupModal
        isOpen={isModalOpen}
        closeModal={closeSignupModal}
        type={modalType}
      />
      <LoginModal
        isOpen={isLoginOpen}
        closeModal={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Contact;
