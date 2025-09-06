export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 sunset-gradient rounded-2xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">WordNest</h3>
                <p className="text-gray-400 text-sm">
                  Professional Blog Platform
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Empowering writers and readers to share knowledge, inspire
              creativity, and build meaningful connections through the power of
              storytelling.
            </p>

            {/* Social icons */}
            <div className="flex space-x-4">
              {[
                {
                  platform: "Twitter",
                  href: "#",
                  icon: (
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.53 0-4.58 2.05-4.58 4.58 0 .36.04.72.12 1.06A12.84 12.84 0 013 1.64a4.57 4.57 0 001.41 6.11 4.51 4.51 0 01-2.07-.57v.06c0 2.24 1.59 4.1 3.7 4.52a4.55 4.55 0 01-2.06.08 4.58 4.58 0 004.27 3.17A9.06 9.06 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84l-.01-.58A9.18 9.18 0 0023 3z" />
                  ),
                },
                {
                  platform: "Facebook",
                  href: "#",
                  icon: (
                    <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.579v-7.745H8.077V9.312h2.606V7.076c0-2.583 1.578-3.988 3.884-3.988 1.104 0 2.052.082 2.327.119v2.7l-1.598.001c-1.254 0-1.496.596-1.496 1.47v1.932h2.991l-.39 2.943h-2.601V20h5.102c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0z" />
                  ),
                },
                {
                  platform: "LinkedIn",
                  href: "#",
                  icon: (
                    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11 17H5v-9h3v9zm-1.5-10.29c-.966 0-1.75-.79-1.75-1.76S5.534 3.19 6.5 3.19c.97 0 1.75.79 1.75 1.76s-.78 1.75-1.75 1.75zM17 17h-3v-4.5c0-1.07-.93-2-2-2s-2 .93-2 2V17h-3v-9h3v1.31c.54-.78 1.53-1.31 2.5-1.31 1.93 0 3.5 1.57 3.5 3.5V17z" />
                  ),
                },
                {
                  platform: "Pinterest",
                  href: "#",
                  icon: (
                    <path d="M10 0C4.48 0 0 4.48 0 10c0 4.09 2.48 7.58 6 9.16-.08-.78-.15-1.98.03-2.83.16-.8 1.06-5.09 1.06-5.09s-.27-.54-.27-1.34c0-1.26.73-2.21 1.64-2.21.77 0 1.14.58 1.14 1.27 0 .77-.49 1.93-.74 3-.21.9.45 1.64 1.34 1.64 1.61 0 2.84-1.7 2.84-4.14 0-2.16-1.55-3.67-3.76-3.67-2.56 0-4.07 1.92-4.07 3.91 0 .77.3 1.6.68 2.05.07.08.08.15.06.23-.06.25-.2.8-.23.91-.04.16-.13.2-.3.12-1.1-.52-1.8-2.16-1.8-3.47 0-2.83 2.06-5.43 5.94-5.43 3.12 0 5.55 2.22 5.55 5.18 0 3.1-1.95 5.59-4.65 5.59-.91 0-1.76-.47-2.05-1.03l-.56 2.12c-.2.74-.75 1.67-1.12 2.24.84.26 1.73.4 2.65.4 5.52 0 10-4.48 10-10S15.52 0 10 0z" />
                  ),
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                "Latest Articles",
                "Popular Posts",
                "Featured Writers",
                "Categories",
                "Newsletter",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              Topics
            </h4>
            <ul className="space-y-3">
              {[
                "Technology",
                "Design & UX",
                "Business",
                "Lifestyle",
                "Innovation",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">
              Contact Us
            </h4>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-orange-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a
                  href="mailto:hello@wordnest.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  hello@wordnest.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-orange-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +1 (234) 567-8900
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-orange-400">
                  <svg
                    className="w-5 h-5"
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
                <div className="text-gray-400">
                  <div>123 Creative Street</div>
                  <div>San Francisco, CA 94102</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2025 WordNest Blog Platform. Crafted with ❤️ for writers and
            readers.
          </p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Support"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
