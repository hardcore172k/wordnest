export default function Hero({ scrollToBlogShowcase, openSignupModal }) {
  return (
    <section className="text-center mb-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Discover Amazing
          <span className="gradient-text block">Stories & Ideas</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Dive into a world of creativity, innovation, and inspiration. Join thousands of readers
          exploring the latest in technology, design, lifestyle, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToBlogShowcase}
            className="sunset-gradient text-white px-10 py-4 rounded-full font-semibold button-hover text-lg"
          >
            Start Exploring
          </button>
          <button
            onClick={() => openSignupModal('writer')}
            className="border-2 border-orange-400 text-orange-500 px-10 py-4 rounded-full font-semibold hover:bg-orange-400 hover:text-white button-hover text-lg"
          >
            Become a Writer
          </button>
        </div>
      </div>
    </section>
  );
}