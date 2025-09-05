"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Newsletter from "../../components/NewsLetter";
import LoginModal from "../../components/LoginModal";
import SignupModal from "../../components/SignUpModal";

const Categories = () => {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
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

  // State for animated stats counters
  const [stats, setStats] = useState({
    totalArticles: 0,
    categories: 0,
    writers: 0,
    readers: 0,
  });

  // Category data
  const categories = [
    {
      id: 1,
      name: "Technology",
      articles: 42,
      description:
        "Cutting-edge insights into web development, AI, machine learning, cloud computing, and the latest tech innovations shaping our digital future.",
      tags: ["Web Development", "AI & ML", "Cloud", "Cybersecurity"],
      gradient: "tech-gradient",
      badge: { text: "🔥 Trending", color: "bg-white/90 text-blue-600" },
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Design & UX",
      articles: 38,
      description:
        "Master the art of user experience design, visual aesthetics, design systems, and creating interfaces that users love and remember.",
      tags: ["UI Design", "UX Research", "Typography", "Color Theory"],
      gradient: "design-gradient",
      badge: { text: "✨ Popular", color: "bg-white/90 text-pink-600" },
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Business",
      articles: 35,
      description:
        "Strategic insights for entrepreneurs, startup founders, and business leaders navigating the modern marketplace and digital transformation.",
      tags: ["Startups", "Leadership", "Strategy", "Growth"],
      gradient: "business-gradient",
      badge: null,
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Lifestyle",
      articles: 29,
      description:
        "Wellness, work-life balance, mindfulness, and sustainable living practices for the modern professional seeking fulfillment.",
      tags: ["Wellness", "Mindfulness", "Work-Life", "Sustainability"],
      gradient: "lifestyle-gradient",
      badge: null,
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Productivity",
      articles: 31,
      description:
        "Time management, automation tools, workflow optimization, and proven strategies to maximize your efficiency and output.",
      tags: ["Time Management", "Automation", "Focus", "Tools"],
      gradient: "productivity-gradient",
      badge: { text: "⚡ Hot", color: "bg-white/90 text-indigo-600" },
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 6,
      name: "Innovation",
      articles: 27,
      description:
        "Breakthrough technologies, emerging trends, future predictions, and innovative solutions that are reshaping industries worldwide.",
      tags: ["Emerging Tech", "Future Trends", "Blockchain", "Quantum"],
      gradient: "innovation-gradient",
      badge: { text: "🚀 New", color: "bg-white/90 text-orange-600" },
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Featured topics data
  const featuredTopics = [
    {
      name: "Remote Work",
      description: "Best practices for distributed teams",
      articles: 18,
      gradient: "tech-gradient",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      badgeColor: "bg-blue-100 text-blue-600",
    },
    {
      name: "Design Systems",
      description: "Building scalable design frameworks",
      articles: 12,
      gradient: "design-gradient",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      badgeColor: "bg-pink-100 text-pink-600",
    },
    {
      name: "Sustainability",
      description: "Eco-friendly tech and practices",
      articles: 15,
      gradient: "green-gradient",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ),
      badgeColor: "bg-green-100 text-green-600",
    },
    {
      name: "AI Ethics",
      description: "Responsible AI development",
      articles: 9,
      gradient: "sunset-gradient",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      badgeColor: "bg-orange-100 text-orange-600",
    },
  ];

  // Authors data
  const authors = [
    {
      initials: "AK",
      name: "Alex Kim",
      title: "Senior Full-Stack Developer",
      categories: ["Technology", "Innovation"],
      stats: "23 articles • 15K readers",
      gradient: "tech-gradient",
      badgeColors: [
        "bg-blue-100 text-blue-600",
        "bg-purple-100 text-purple-600",
      ],
    },
    {
      initials: "SM",
      name: "Sarah Miller",
      title: "UI/UX Design Lead",
      categories: ["Design", "Productivity"],
      stats: "19 articles • 12K readers",
      gradient: "design-gradient",
      badgeColors: [
        "bg-pink-100 text-pink-600",
        "bg-indigo-100 text-indigo-600",
      ],
    },
    {
      initials: "LW",
      name: "Lisa Wang",
      title: "Business Strategy Consultant",
      categories: ["Business", "Lifestyle"],
      stats: "17 articles • 18K readers",
      gradient: "business-gradient",
      badgeColors: [
        "bg-purple-100 text-purple-600",
        "bg-green-100 text-green-600",
      ],
    },
  ];

  // Animate stats counters on mount
  useEffect(() => {
    const targetStats = {
      totalArticles: 247,
      categories: 8,
      writers: 45,
      readers: 12000,
    };

    let timer;

    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 50;
      const increment = {
        totalArticles: targetStats.totalArticles / steps,
        categories: targetStats.categories / steps,
        writers: targetStats.writers / steps,
        readers: targetStats.readers / steps,
      };

      let current = { totalArticles: 0, categories: 0, writers: 0, readers: 0 };
      const timer = setInterval(() => {
        current = {
          totalArticles: Math.min(
            current.totalArticles + increment.totalArticles,
            targetStats.totalArticles
          ),
          categories: Math.min(
            current.categories + increment.categories,
            targetStats.categories
          ),
          writers: Math.min(
            current.writers + increment.writers,
            targetStats.writers
          ),
          readers: Math.min(
            current.readers + increment.readers,
            targetStats.readers
          ),
        };

        setStats({
          totalArticles: Math.floor(current.totalArticles),
          categories: Math.floor(current.categories),
          writers: Math.floor(current.writers),
          readers: Math.floor(current.readers / 1000) + "K",
        });

        if (
          current.totalArticles >= targetStats.totalArticles &&
          current.categories >= targetStats.categories &&
          current.writers >= targetStats.writers &&
          current.readers >= targetStats.readers
        ) {
          clearInterval(timer);
          setStats(targetStats); // Ensure final values are exact
        }
      }, duration / steps);
    };

    const timeout = setTimeout(animateCounters, 500);
    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, []);

  // Handle category card click
  const handleCategoryClick = (categoryName) => {
    alert(`Navigating to ${categoryName} articles... (This is a demo)`);
  };

  // Handle topic card click
  const handleTopicClick = (topicName) => {
    alert(`Exploring ${topicName} articles... (This is a demo)`);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <Header
        openSignupModal={openSignupModal}
        setIsLoginOpen={setIsLoginOpen}
      />
      <main className="container mx-auto px-6 py-16">
        {/* Page Header */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Explore by
              <span className="gradient-text block">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Discover curated content across our most popular topics. From
              cutting-edge technology to lifestyle insights, find exactly what
              interests you.
            </p>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text stats-counter">
                  {stats.totalArticles}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Total Articles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text stats-counter">
                  {stats.categories}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text stats-counter">
                  {stats.writers}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Expert Writers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text stats-counter">
                  {stats.readers}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Monthly Readers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search categories or topics..."
                className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:border-orange-400 search-focus text-gray-700 font-medium shadow-soft"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Main Categories Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="category-card bg-white rounded-3xl overflow-hidden shadow-soft"
                onClick={() => handleCategoryClick(category.name)}
                style={{
                  animation: searchTerm ? "fadeIn 0.5s ease-in-out" : "none",
                }}
              >
                <div
                  className={`h-48 ${category.gradient} relative flex items-center justify-center`}
                >
                  <div className="category-icon">{category.icon}</div>
                  {category.badge && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={`trending-badge ${category.badge.color} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm`}
                      >
                        {category.badge.text}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {category.name}
                    </h3>
                    <span
                      className={`bg-${
                        category.gradient.split("-")[0]
                      }-100 text-${
                        category.gradient.split("-")[0]
                      }-600 px-3 py-1 rounded-full text-sm font-semibold`}
                    >
                      {category.articles} Articles
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className={`w-full ${category.gradient} text-white py-3 rounded-xl font-semibold button-hover`}
                  >
                    Explore {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Topics Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Topics
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dive deeper into specific subjects that are trending in our
              community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-soft shadow-hover text-center"
                onClick={() => handleTopicClick(topic.name)}
              >
                <div
                  className={`w-12 h-12 ${topic.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  {topic.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{topic.name}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {topic.description}
                </p>
                <span
                  className={`text-xs ${topic.badgeColor} px-2 py-1 rounded-full`}
                >
                  {topic.articles} articles
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Authors Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl p-12 shadow-soft">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Meet Our Expert Writers
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn from industry leaders and experienced professionals
                sharing their knowledge
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {authors.map((author, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-20 h-20 ${author.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-white font-bold text-2xl">
                      {author.initials}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    {author.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{author.title}</p>
                  <div className="flex justify-center space-x-2 mb-4">
                    {author.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className={`text-xs ${author.badgeColors[idx]} px-2 py-1 rounded-full`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{author.stats}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Newsletter />
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

export default Categories;
