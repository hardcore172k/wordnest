'"use client";'
import { forwardRef } from "react";
import { useRouter } from "next/navigation";

const BlogShowcase = forwardRef((props, ref) => {
  const router = useRouter();
  const articles = [
    {
      category: "Productivity",
      gradient: "from-purple-100 to-pink-100",
      color: "purple-600",
      title: "10 Morning Habits That Will Transform Your Day",
      description:
        "Discover simple yet powerful morning routines that successful entrepreneurs swear by. From meditation to strategic planning, these habits will boost your productivity and set you up for success...",
      author: "Jessica Davis",
      role: "Productivity Coach",
      initials: "JD",
      gradientAvatar: "from-purple-400 to-pink-400",
      readTime: "5 min read",
    },
    {
      category: "Startup",
      gradient: "from-green-100 to-blue-100",
      color: "green-600",
      title: "From Idea to Launch: A Founder's Journey",
      description:
        "Follow the incredible story of how a simple idea became a million-dollar startup. Learn about the challenges, failures, and breakthroughs that shaped this entrepreneurial adventure...",
      author: "Robert Thompson",
      role: "Tech Entrepreneur",
      initials: "RT",
      gradientAvatar: "from-green-400 to-blue-400",
      readTime: "7 min read",
    },
    {
      category: "Creativity",
      gradient: "from-yellow-100 to-orange-100",
      color: "yellow-600",
      title: "Unlocking Your Creative Potential in 2025",
      description:
        "Creativity isn’t just for artists. Discover practical techniques to boost your creative thinking in any field, from problem-solving frameworks to inspiration-gathering methods...",
      author: "Emma Martinez",
      role: "Creative Director",
      initials: "EM",
      gradientAvatar: "from-yellow-400 to-orange-400",
      readTime: "4 min read",
    },
    {
      category: "Wellness",
      gradient: "from-indigo-100 to-purple-100",
      color: "indigo-600",
      title: "The Science of Work-Life Balance",
      description:
        "Research-backed strategies for maintaining mental health while pursuing ambitious goals. Learn how top performers manage stress and maintain peak performance without burning out...",
      author: "Dr. Kevin Park",
      role: "Wellness Expert",
      initials: "DK",
      gradientAvatar: "from-indigo-400 to-purple-400",
      readTime: "6 min read",
    },
  ];

  return (
    <section id="blog-showcase" className="mb-20" ref={ref}>
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">
          Latest from Our Community
        </h3>
        <p className="text-lg text-gray-600">
          Fresh perspectives and insights from talented writers
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {articles.map((article, index) => (
          <article
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-soft shadow-hover"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`bg-gradient-to-r ${article.gradient} text-${article.color} px-4 py-2 rounded-full text-sm font-semibold`}
                >
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {article.readTime}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                {article.title}
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {article.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${article.gradientAvatar} rounded-full mr-4 flex items-center justify-center`}
                  >
                    <span className="text-white font-semibold">
                      {article.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {article.author}
                    </div>
                    <div className="text-gray-500 text-sm">{article.role}</div>
                  </div>
                </div>
                <button 
                  onClick={() => router.push("/articles")} 
                  className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => router.push("/articles")}
          className="border-2 border-orange-400 text-orange-500 px-10 py-4 rounded-full font-semibold hover:bg-orange-400 hover:text-white button-hover text-lg"
        >
          See More Articles
        </button>
      </div>
    </section>
  );
});

BlogShowcase.displayName = "BlogShowcase";

export default BlogShowcase;
