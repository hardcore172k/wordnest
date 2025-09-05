"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Newsletter from "../../components/NewsLetter";
import SignupModal from "../../components/SignUpModal";

export default function Articles() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSearch, setCurrentSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('community');

  
  const openSignupModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSignupModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };


  const articles = [
    {
      category: "design",
      title: "Mastering Color Theory for Digital Interfaces",
      author: "Sarah Miller",
      role: "UI Designer",
      readTime: "8 min",
      date: "Jan 18",
      gradient: "warm-gradient",
      color: "pink-600",
      initials: "SM",
      description:
        "Learn how to create harmonious color palettes that enhance user experience and brand identity...",
    },
    {
      category: "design",
      title: "UX Research Methods That Actually Work",
      author: "Alex Thompson",
      role: "UX Researcher",
      readTime: "11 min",
      date: "Jan 15",
      gradient: "warm-gradient",
      color: "pink-600",
      initials: "AT",
      description:
        "Discover proven research techniques to understand your users and create better products...",
    },
    {
      category: "technology",
      title: "Building Scalable APIs with Node.js",
      author: "David Johnson",
      role: "Backend Engineer",
      readTime: "12 min",
      date: "Jan 16",
      gradient: "cool-gradient",
      color: "blue-600",
      initials: "DJ",
      description:
        "Best practices for creating robust, maintainable APIs that can handle millions of requests...",
    },
    {
      category: "technology",
      title: "Machine Learning for Web Developers",
      author: "Priya Patel",
      role: "ML Engineer",
      readTime: "15 min",
      date: "Jan 13",
      gradient: "cool-gradient",
      color: "blue-600",
      initials: "PP",
      description:
        "A practical guide to integrating AI and ML capabilities into your web applications...",
    },
    {
      category: "business",
      title: "Remote Team Leadership in 2025",
      author: "Lisa Wang",
      role: "Team Lead",
      readTime: "6 min",
      date: "Jan 14",
      gradient: "ocean-gradient",
      color: "purple-600",
      initials: "LW",
      description:
        "Strategies for managing distributed teams and maintaining company culture across time zones...",
    },
    {
      category: "business",
      title: "Startup Funding Strategies for 2025",
      author: "Michael Chen",
      role: "Startup Advisor",
      readTime: "9 min",
      date: "Jan 11",
      gradient: "ocean-gradient",
      color: "purple-600",
      initials: "MC",
      description:
        "Navigate the evolving landscape of venture capital and alternative funding options...",
    },
    {
      category: "productivity",
      title: "Time Management for Creative Professionals",
      author: "Maria Rodriguez",
      role: "Creative Director",
      readTime: "5 min",
      date: "Jan 12",
      gradient: "purple-gradient",
      color: "indigo-600",
      initials: "MR",
      description:
        "Proven techniques to balance creative flow with deadline management and client expectations...",
    },
    {
      category: "productivity",
      title: "Deep Work in a Distracted World",
      author: "Robert Kim",
      role: "Productivity Expert",
      readTime: "7 min",
      date: "Jan 9",
      gradient: "purple-gradient",
      color: "indigo-600",
      initials: "RK",
      description:
        "Strategies to maintain focus and produce high-quality work in our hyperconnected age...",
    },
    {
      category: "lifestyle",
      title: "Digital Minimalism: Reclaiming Your Focus",
      author: "James Chen",
      role: "Wellness Coach",
      readTime: "7 min",
      date: "Jan 10",
      gradient: "green-gradient",
      color: "green-600",
      initials: "JC",
      description:
        "How to reduce digital clutter and create meaningful relationships with technology...",
    },
    {
      category: "lifestyle",
      title: "Mindful Living in the Digital Age",
      author: "Sophia Martinez",
      role: "Mindfulness Coach",
      readTime: "6 min",
      date: "Jan 7",
      gradient: "green-gradient",
      color: "green-600",
      initials: "SM",
      description:
        "Practical approaches to maintaining mental wellness while staying connected...",
    },
    {
      category: "innovation",
      title: "The Rise of Sustainable Tech Solutions",
      author: "Emma Parker",
      role: "Sustainability Expert",
      readTime: "10 min",
      date: "Jan 8",
      gradient: "sunset-gradient",
      color: "orange-600",
      initials: "EP",
      description:
        "Exploring how technology companies are addressing climate change through innovative solutions...",
    },
    {
      category: "innovation",
      title: "Quantum Computing: Breakthrough Applications",
      author: "Dr. Alan Foster",
      role: "Quantum Researcher",
      readTime: "13 min",
      date: "Jan 5",
      gradient: "sunset-gradient",
      color: "orange-600",
      initials: "AF",
      description:
        "Real-world applications of quantum computing that are transforming industries today...",
    },
    {
      category: "technology",
      title: "Cloud Architecture Best Practices",
      author: "Jennifer Lee",
      role: "Cloud Architect",
      readTime: "14 min",
      date: "Jan 4",
      gradient: "cool-gradient",
      color: "blue-600",
      initials: "JL",
      description:
        "Design scalable, secure, and cost-effective cloud solutions for modern applications...",
    },
    {
      category: "technology",
      title: "Cybersecurity Trends for Developers",
      author: "Marcus Wright",
      role: "Security Engineer",
      readTime: "9 min",
      date: "Jan 3",
      gradient: "cool-gradient",
      color: "blue-600",
      initials: "MW",
      description:
        "Essential security practices every developer needs to know in 2025...",
    },
    {
      category: "technology",
      title: "Mobile App Performance Optimization",
      author: "Rachel Green",
      role: "Mobile Developer",
      readTime: "11 min",
      date: "Jan 2",
      gradient: "cool-gradient",
      color: "blue-600",
      initials: "RG",
      description:
        "Techniques to make your mobile apps faster, smoother, and more efficient...",
    },
    {
      category: "design",
      title: "Accessibility in Modern Web Design",
      author: "Carlos Rivera",
      role: "UX Designer",
      readTime: "10 min",
      date: "Jan 1",
      gradient: "warm-gradient",
      color: "pink-600",
      initials: "CR",
      description:
        "Creating inclusive digital experiences that work for everyone...",
    },
    {
      category: "design",
      title: "Design Systems That Scale",
      author: "Nina Patel",
      role: "Design Lead",
      readTime: "13 min",
      date: "Dec 30",
      gradient: "warm-gradient",
      color: "pink-600",
      initials: "NP",
      description:
        "Building consistent, maintainable design systems for growing teams...",
    },
    {
      category: "design",
      title: "Typography Trends in Digital Design",
      author: "Oliver Stone",
      role: "Visual Designer",
      readTime: "7 min",
      date: "Dec 29",
      gradient: "warm-gradient",
      color: "pink-600",
      initials: "OS",
      description:
        "How modern typography is shaping user experiences across platforms...",
    },
    {
      category: "business",
      title: "Building High-Performance Teams",
      author: "Amanda Foster",
      role: "HR Director",
      readTime: "8 min",
      date: "Dec 28",
      gradient: "ocean-gradient",
      color: "purple-600",
      initials: "AF",
      description:
        "Strategies for creating collaborative, productive, and motivated teams...",
    },
    {
      category: "business",
      title: "Digital Transformation Strategies",
      author: "Thomas Anderson",
      role: "Strategy Consultant",
      readTime: "12 min",
      date: "Dec 27",
      gradient: "ocean-gradient",
      color: "purple-600",
      initials: "TA",
      description:
        "How companies are successfully navigating digital transformation...",
    },
    {
      category: "business",
      title: "Customer Experience Optimization",
      author: "Sarah Kim",
      role: "CX Manager",
      readTime: "9 min",
      date: "Dec 26",
      gradient: "ocean-gradient",
      color: "purple-600",
      initials: "SK",
      description:
        "Creating exceptional customer journeys that drive loyalty and growth...",
    },
    {
      category: "productivity",
      title: "Automation Tools for Busy Professionals",
      author: "Kevin Zhang",
      role: "Automation Expert",
      readTime: "6 min",
      date: "Dec 25",
      gradient: "purple-gradient",
      color: "indigo-600",
      initials: "KZ",
      description:
        "Save hours every week with these powerful automation solutions...",
    },
    {
      category: "productivity",
      title: "Effective Meeting Strategies",
      author: "Laura Johnson",
      role: "Project Manager",
      readTime: "5 min",
      date: "Dec 24",
      gradient: "purple-gradient",
      color: "indigo-600",
      initials: "LJ",
      description:
        "Transform your meetings from time-wasters to productivity boosters...",
    },
    {
      category: "lifestyle",
      title: "Work-Life Balance in Remote Work",
      author: "Maya Patel",
      role: "Remote Work Expert",
      readTime: "8 min",
      date: "Dec 23",
      gradient: "green-gradient",
      color: "green-600",
      initials: "MP",
      description:
        "Maintaining healthy boundaries when your home is your office...",
    },
    {
      category: "lifestyle",
      title: "Sustainable Living for Tech Professionals",
      author: "Daniel Brown",
      role: "Sustainability Advocate",
      readTime: "9 min",
      date: "Dec 22",
      gradient: "green-gradient",
      color: "green-600",
      initials: "DB",
      description:
        "Eco-friendly practices that fit into a busy tech lifestyle...",
    },
    {
      category: "innovation",
      title: "Blockchain Beyond Cryptocurrency",
      author: "Victoria Chen",
      role: "Blockchain Developer",
      readTime: "11 min",
      date: "Dec 21",
      gradient: "sunset-gradient",
      color: "orange-600",
      initials: "VC",
      description:
        "Innovative applications of blockchain technology across industries...",
    },
    {
      category: "innovation",
      title: "AI Ethics in Product Development",
      author: "Ryan Mitchell",
      role: "AI Ethics Researcher",
      readTime: "12 min",
      date: "Dec 20",
      gradient: "sunset-gradient",
      color: "orange-600",
      initials: "RM",
      description: "Building responsible AI systems that benefit society...",
    },
  ];

  const filterCounts = {
    all: articles.length,
    technology: articles.filter((a) => a.category === "technology").length,
    design: articles.filter((a) => a.category === "design").length,
    business: articles.filter((a) => a.category === "business").length,
    lifestyle: articles.filter((a) => a.category === "lifestyle").length,
    productivity: articles.filter((a) => a.category === "productivity").length,
    innovation: articles.filter((a) => a.category === "innovation").length,
  };

  useEffect(() => {
    filterAndSearchArticles();
  }, [currentFilter, currentSearch]);

  const filterAndSearchArticles = () => {
    let count = 0;
    articles.forEach((article) => {
      const matchesFilter =
        currentFilter === "all" || article.category === currentFilter;
      const matchesSearch =
        currentSearch === "" ||
        article.title.toLowerCase().includes(currentSearch) ||
        article.author.toLowerCase().includes(currentSearch) ||
        article.category.toLowerCase().includes(currentSearch);
      if (matchesFilter && matchesSearch) count++;
    });
    setVisibleCount(count);
  };

  const handleFilterClick = (category) => {
    setCurrentFilter(category);
    window.scrollTo({
      top: document.getElementById("articles-grid").offsetTop,
      behavior: "smooth",
    });
  };

  const handleSearch = (e) => {
    setCurrentSearch(e.target.value.toLowerCase());
  };

  const clearSearch = () => {
    setCurrentSearch("");
    setCurrentFilter("all");
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 2000);
  };

  return (
    <>
      <Header openSignupModal={openSignupModal} />
      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Page Header */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Explore Our
              <span className="gradient-text block">Article Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Discover insights, tutorials, and stories from our community of
              expert writers across technology, design, business, and lifestyle.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
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
                placeholder="Search articles, topics, or authors..."
                value={currentSearch}
                onChange={handleSearch}
                className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:border-orange-400 search-focus text-gray-700 font-medium shadow-soft"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "All Articles",
                "Technology",
                "Design",
                "Business",
                "Lifestyle",
                "Productivity",
                "Innovation",
              ].map((filter, index) => (
                <button
                  key={filter}
                  onClick={() =>
                    handleFilterClick(
                      filter === "All Articles" ? "all" : filter.toLowerCase()
                    )
                  }
                  className={`filter-button px-6 py-3 rounded-full font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 ${
                    currentFilter ===
                    (filter === "All Articles" ? "all" : filter.toLowerCase())
                      ? "active"
                      : ""
                  }`}
                >
                  {filter}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs text-white ${
                      filter === "All Articles"
                        ? "bg-orange-500"
                        : filter === "Technology"
                        ? "bg-blue-500"
                        : filter === "Design"
                        ? "bg-pink-500"
                        : filter === "Business"
                        ? "bg-purple-500"
                        : filter === "Lifestyle"
                        ? "bg-green-500"
                        : filter === "Productivity"
                        ? "bg-indigo-500"
                        : "bg-orange-600"
                    }`}
                  >
                    {
                      filterCounts[
                        filter === "All Articles" ? "all" : filter.toLowerCase()
                      ]
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl overflow-hidden shadow-soft">
            <div className="md:flex">
              <div className="md:w-1/2 h-80 md:h-auto sunset-gradient relative">
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium text-gray-700">
                    15 min read
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 p-12">
                <div className="flex items-center mb-4">
                  <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mr-4">
                    Technology
                  </span>
                  <span className="text-sm text-gray-500">
                    Published 2 days ago
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                  The Future of Web Development: What Every Developer Should
                  Know
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  Explore the cutting-edge technologies and frameworks that are
                  reshaping how we build web applications. From AI-powered
                  development tools to the rise of edge computing, discover
                  what&apos;s coming next in the world of web development.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-14 h-14 sunset-gradient rounded-full mr-4 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        AK
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">
                        Alex Kim
                      </div>
                      <div className="text-gray-500">
                        Senior Full-Stack Developer
                      </div>
                    </div>
                  </div>
                  <button className="sunset-gradient text-white px-8 py-3 rounded-full font-semibold button-hover">
                    Read Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
          <div
            id="articles-grid"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, index) => {
              const matchesFilter =
                currentFilter === "all" || article.category === currentFilter;
              const matchesSearch =
                currentSearch === "" ||
                article.title.toLowerCase().includes(currentSearch) ||
                article.author.toLowerCase().includes(currentSearch) ||
                article.category.toLowerCase().includes(currentSearch);
              return (
                <article
                  key={index}
                  className={`article-card bg-white rounded-3xl overflow-hidden shadow-soft shadow-hover ${
                    matchesFilter && matchesSearch ? "block" : "hidden"
                  }`}
                  style={{
                    animation:
                      matchesFilter && matchesSearch
                        ? "fadeIn 0.5s ease-in-out"
                        : "none",
                  }}
                  data-category={article.category}
                  data-title={article.title.toLowerCase()}
                  data-author={article.author.toLowerCase()}
                >
                  <div className={`h-48 ${article.gradient} relative`}>
                    <div className="absolute top-4 left-4">
                      <span
                        className={`bg-white/90 text-${article.color} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm`}
                      >
                        {article.category.charAt(0).toUpperCase() +
                          article.category.slice(1)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-medium text-gray-700">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 ${article.gradient} rounded-full mr-2 flex items-center justify-center`}
                        >
                          <span className="text-white font-semibold text-xs">
                            {article.initials}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-xs">
                            {article.author}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {article.role}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {article.date}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div
            id="no-results"
            className={`${
              visibleCount === 0 ? "block" : "hidden"
            } text-center py-16`}
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Articles Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any articles matching your search. Try
                different keywords or browse our categories.
              </p>
              <button
                onClick={clearSearch}
                className="sunset-gradient text-white px-6 py-3 rounded-full font-semibold button-hover"
              >
                Clear Search
              </button>
            </div>
          </div>
        </section>

        {/* Load More */}
        <section className="text-center mb-16">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="border-2 border-orange-400 text-orange-500 px-12 py-4 rounded-full font-semibold hover:bg-orange-400 hover:text-white button-hover text-lg"
          >
            {isLoadingMore ? "Loading..." : "Load More Articles"}
          </button>
          <p className="text-gray-500 mt-4">
            {currentFilter === "all" && currentSearch === ""
              ? `Showing ${visibleCount} of 247 articles`
              : `Showing ${visibleCount} filtered articles`}
          </p>
        </section>
        <Newsletter />
      </main>
      <Footer />
      <SignupModal
        isOpen={isModalOpen}
        closeModal={closeSignupModal}
        modalType={modalType}
      />
    </>
  );
}
