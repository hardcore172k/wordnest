'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ openSignupModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 sunset-gradient rounded-2xl flex items-center justify-center shadow-lg floating-animation">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">WordNest</h1>
              <p className="text-xs text-gray-500 font-medium">
                Professional Blog
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center ml-8 mr-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-orange-500 active'
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login + CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="text-gray-700 hover:text-orange-500 px-4 py-2 rounded-full font-medium transition-colors border border-gray-200 hover:border-orange-300">
              Login
            </button>
            <button
              onClick={() => openSignupModal('community')}
              className="sunset-gradient text-white px-6 py-3 rounded-full font-semibold button-hover pulse-glow"
            >
              Join Community
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-6 py-3 font-medium ${
                    pathname === item.href
                      ? 'text-orange-500'
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                className="block w-full text-left px-6 py-3 text-gray-700 hover:text-orange-500 border-t border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </button>
              <button
                onClick={() => {
                  openSignupModal('community');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-6 py-3 sunset-gradient text-white font-semibold"
              >
                Join Community
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
