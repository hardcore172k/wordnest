export default function FeaturedArticles() {
  const articles = [
    {
      category: 'Design',
      gradient: 'warm-gradient',
      color: 'pink-600',
      title: 'The Art of Minimalist Design in 2025',
      description: 'Exploring how less can be more in modern design philosophy and user experience...',
      author: 'Anna Smith',
      role: 'Design Lead',
      initials: 'AS',
      readTime: '8 min read',
      date: 'Jan 15',
    },
    {
      category: 'Technology',
      gradient: 'cool-gradient',
      color: 'blue-600',
      title: "AI Revolution: What's Next for Developers",
      description: 'Understanding the impact of artificial intelligence on software development and coding...',
      author: 'Mike Johnson',
      role: 'Tech Writer',
      initials: 'MJ',
      readTime: '12 min read',
      date: 'Jan 12',
    },
    {
      category: 'Business',
      gradient: 'ocean-gradient',
      color: 'purple-600',
      title: 'Building Remote Teams That Actually Work',
      description: 'Proven strategies for creating productive and engaged distributed teams...',
      author: 'Sarah Lee',
      role: 'Business Coach',
      initials: 'SL',
      readTime: '6 min read',
      date: 'Jan 10',
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">Featured Stories</h3>
        <p className="text-lg text-gray-600">Handpicked articles from our talented community</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <article key={index} className="bg-white rounded-3xl overflow-hidden shadow-soft shadow-hover">
            <div className={`h-56 ${article.gradient} relative`}>
              <div className="absolute top-4 left-4">
                <span className={`bg-white/90 text-${article.color} px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm`}>
                  {article.category}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-sm font-medium text-gray-700">{article.readTime}</span>
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4 leading-tight">{article.title}</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">{article.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${article.gradient} rounded-full mr-3 flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">{article.initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{article.author}</div>
                    <div className="text-gray-500 text-xs">{article.role}</div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{article.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}