export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 sunset-gradient rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">WordNest</h3>
                <p className="text-gray-400 text-sm">Professional Blog Platform</p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Empowering writers and readers to share knowledge, inspire creativity, and build
              meaningful connections through the power of storytelling.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  platform: 'Twitter',
                  path: 'M24 4.557c-.883.392-1.832.656-2.828.775...',
                },
                {
                  platform: 'Facebook',
                  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373...',
                },
                {
                  platform: 'LinkedIn',
                  path: 'M20.447 20.452h-3.554v-5.569c0-1.328...',
                },
                {
                  platform: 'Pinterest',
                  path: 'M12.017 0C5.396 0 .029 5.367.029 11.987...',
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Explore</h4>
            <ul className="space-y-3">
              {['Latest Articles', 'Popular Posts', 'Featured Writers', 'Categories', 'Newsletter'].map(
                (item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Topics</h4>
            <ul className="space-y-3">
              {['Technology', 'Design & UX', 'Business', 'Lifestyle', 'Innovation'].map(
                (item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:hello@wordnest.com" className="text-gray-400 hover:text-white transition-colors">
                  hello@wordnest.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-orange-400 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-gray-400">
                  <div>123 Creative Street</div>
                  <div>San Francisco, CA 94102</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2025 WordNest Blog Platform. Crafted with ❤️ for writers and readers.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Support'].map((item, index) => (
              <a key={index} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}