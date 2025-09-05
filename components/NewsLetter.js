export default function Newsletter() {
  return (
    <section className="sunset-gradient rounded-3xl p-12 text-center text-white mb-20 shadow-soft">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-4xl font-bold mb-4">Never Miss a Story</h3>
        <p className="text-xl mb-8 opacity-90">
          Join our community and get the best articles delivered to your inbox weekly
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 font-medium"
          />
          <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap">
            Subscribe Free
          </button>
        </div>
        <p className="text-sm opacity-75 mt-4">No spam, unsubscribe anytime</p>
      </div>
    </section>
  );
}