'use client';

import { useState, useEffect } from 'react';

export default function SignupModal({ isOpen, closeModal, modalType }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Account created successfully! Welcome to WordNest!');
      closeModal();
      setIsSubmitting(false);
    }, 2000);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      id="signupModal"
      className="fixed inset-0 signup-modal flex items-center justify-center z-50"
      onClick={(e) => e.target.id === 'signupModal' && closeModal()}
    >
      <div className="modal-content bg-white rounded-3xl p-8 max-w-md w-full max-h-[95vh] overflow-auto custom-scrollbar mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 sunset-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {modalType === 'writer' ? 'Become a Writer' : 'Join Our Community'}
          </h3>
          <p className="text-gray-600">
            {modalType === 'writer'
              ? 'Share your expertise with our community'
              : 'Start your journey with WordNest today'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
            />
          </div>
          {modalType === 'writer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Writing Experience</label>
                <select className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400">
                  <option>Beginner (0-1 years)</option>
                  <option>Intermediate (2-5 years)</option>
                  <option>Advanced (5+ years)</option>
                  <option>Professional (10+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Topics</label>
                <input
                  type="text"
                  placeholder="e.g., Technology, Design, Business"
                  className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                />
              </div>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              required
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
            />
            <label className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-orange-500 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-500 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sunset-gradient text-white px-6 py-3 rounded-2xl font-semibold button-hover"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};