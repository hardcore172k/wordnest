"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginModal from "../../components/LoginModal";
import SignupModal from "../../components/SignUpModal";

const About = () => {
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
    // Animate stats counters
    const animateCounters = () => {
      const counters = document.querySelectorAll(".stats-counter");
      counters.forEach((counter) => {
        const text = counter.textContent;
        const hasK = text.includes("K");
        const hasComma = text.includes(",");
        const hasDot = text.includes(".");

        let target;
        if (hasDot) {
          target = parseFloat(text.replace(/[^\d.]/g, ""));
        } else {
          target = parseInt(text.replace(/[^\d]/g, ""));
          if (hasK) target = target * 1000;
        }

        let current = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            if (hasDot) {
              counter.textContent = target.toFixed(1);
            } else if (hasK) {
              counter.textContent = Math.floor(target / 1000) + "K+";
            } else if (hasComma) {
              counter.textContent = target.toLocaleString();
            } else {
              counter.textContent = target;
            }
            clearInterval(timer);
          } else {
            if (hasDot) {
              counter.textContent = current.toFixed(1);
            } else if (hasK) {
              counter.textContent = Math.floor(current / 1000) + "K+";
            } else if (hasComma) {
              counter.textContent = Math.floor(current).toLocaleString();
            } else {
              counter.textContent = Math.floor(current);
            }
          }
        }, 40);
      });
    };

    // Animate progress bars
    const animateProgressBars = () => {
      const progressBars = document.querySelectorAll(".progress-bar");
      progressBars.forEach((bar) => {
        setTimeout(() => {
          bar.classList.add("animate-progress");
        }, 1000);
      });
    };

    // Initialize animations
    setTimeout(() => {
      animateCounters();
      animateProgressBars();
    }, 500);

    // Smooth scroll for internal links
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
  }, []);

  return (
    <>
      <Header
        openSignupModal={openSignupModal}
        setIsLoginOpen={setIsLoginOpen}
      />
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
              About
              <span className="gradient-text block">WordNest</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              We&apos;re building the future of professional blogging, where expert
              knowledge meets beautiful storytelling, and where every voice has
              the power to inspire and educate.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  50K+
                </div>
                <div className="text-gray-600 font-medium">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  247
                </div>
                <div className="text-gray-600 font-medium">
                  Published Articles
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  45
                </div>
                <div className="text-gray-600 font-medium">Expert Writers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  8
                </div>
                <div className="text-gray-600 font-medium">Categories</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-12 shadow-soft">
              <div className="w-16 h-16 sunset-gradient rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                To democratize knowledge sharing by creating a platform where
                industry experts, thought leaders, and passionate professionals
                can share their insights with a global audience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that everyone has valuable knowledge to share, and
                we&apos;re here to amplify those voices through beautiful,
                accessible, and engaging content.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-12 shadow-soft">
              <div className="w-16 h-16 tech-gradient rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                To become the world&apos;s most trusted platform for professional
                knowledge sharing, where quality content meets exceptional user
                experience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where learning is continuous, accessible,
                and inspiring - where every professional can both teach and
                learn from the global community.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-soft">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-8">
                Our Story
              </h3>
              <div className="text-left space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  WordNest was born from a simple observation: the internet was
                  full of content, but finding truly valuable, expert-level
                  insights was becoming increasingly difficult. In early 2023,
                  our founders - Sarah Chen and Marcus Rodriguez - were
                  frustrated by the scattered nature of professional knowledge
                  online.
                </p>
                <p>
                  As a UX designer and a software engineer respectively, they
                  spent countless hours searching for quality content in their
                  fields. They realized that while there were many brilliant
                  professionals creating amazing work, there wasn&apos;t a dedicated
                  platform that celebrated depth, expertise, and beautiful
                  presentation.
                </p>
                <p>
                  That&apos;s when the idea for WordNest was born. They envisioned a
                  platform that would be the "nest" where words of wisdom could
                  flourish - a place where professionals could share their
                  knowledge in a beautifully designed, easily discoverable
                  format.
                </p>
                <p>
                  Starting with just 5 writers and a handful of articles,
                  WordNest has grown into a thriving community of over 45 expert
                  contributors and 50,000+ monthly readers. But we&apos;re just
                  getting started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">
              Our Values
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from the content we
              publish to the community we build.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="value-card bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 design-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Quality First
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We prioritize depth and expertise over quantity. Every article
                is carefully curated to ensure it provides genuine value to our
                readers.
              </p>
            </div>
            <div className="value-card bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 green-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Community Driven
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Our platform thrives because of our amazing community of writers
                and readers who support, challenge, and inspire each other.
              </p>
            </div>
            <div className="value-card bg-white rounded-3xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 innovation-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
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
                Innovation
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We continuously evolve our platform with cutting-edge features
                and design to provide the best possible experience for our
                users.
              </p>
            </div>
          </div>
        </section>

        {/* Growth Metrics Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-soft">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-800 mb-6">
                Our Growth
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See how our community has grown and the impact we&apos;re making in
                professional knowledge sharing.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 sunset-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  50,247
                </div>
                <div className="text-gray-600 font-medium mb-4">
                  Monthly Readers
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="progress-bar bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full"
                    style={{ "--progress-width": "85%" }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  +127% this year
                </div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 tech-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  247
                </div>
                <div className="text-gray-600 font-medium mb-4">
                  Published Articles
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="progress-bar bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                    style={{ "--progress-width": "62%" }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">+89% this year</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 design-gradient rounded-full flex items-center justify-center mx-auto mb-4">
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
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  45
                </div>
                <div className="text-gray-600 font-medium mb-4">
                  Expert Writers
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="progress-bar bg-gradient-to-r from-pink-400 to-yellow-400 h-2 rounded-full"
                    style={{ "--progress-width": "75%" }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  +200% this year
                </div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 green-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-4xl font-bold gradient-text stats-counter mb-2">
                  4.9
                </div>
                <div className="text-gray-600 font-medium mb-4">
                  Reader Rating
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="progress-bar bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                    style={{ "--progress-width": "98%" }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Based on 2,847 reviews
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">
              What Our Community Says
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from the writers and readers who make WordNest such a special
              place.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 sunset-gradient rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Jessica Davis</div>
                  <div className="text-gray-500 text-sm">
                    Product Manager at Stripe
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "WordNest has become my go-to source for high-quality
                professional insights. The content is always well-researched and
                actionable."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 tech-gradient rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MK</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Michael Kumar</div>
                  <div className="text-gray-500 text-sm">
                    Senior Developer at Microsoft
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "As a writer on WordNest, I love how the platform showcases
                content beautifully and connects me with engaged readers who
                truly value expertise."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 design-gradient rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">LT</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Lisa Thompson</div>
                  <div className="text-gray-500 text-sm">
                    Design Director at Airbnb
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "The quality of content and community on WordNest is unmatched.
                It&apos;s where I come to both learn from others and share my own
                experiences."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="sunset-gradient rounded-3xl p-12 mb-[15px] text-center text-white shadow-soft">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6">
              Join the WordNest Community
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Whether you&apos;re here to learn, share, or connect - there&apos;s a place
              for you in our growing community of professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 button-hover">
                Start Reading
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300 button-hover">
                Become a Writer
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

export default About;
