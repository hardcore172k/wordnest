'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../supabase';

export default function SignupModal({ isOpen, closeModal, modalType }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setIsSubmitting(true);

  if (!firstName || !lastName || !email || !password || !termsAgreed) {
    setError('All required fields must be filled, and terms must be agreed.');
    setIsSubmitting(false);
    return;
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { 
      data: { first_name: firstName, last_name: lastName },
      redirectTo: `${window.location.origin}/verify-email` // Custom verification callback
    }
  });

  if (signUpError) {
    if (signUpError.message.includes('Error sending confirmation email')) {
      setError('Failed to send verification email. Please try again later or contact support.');
    } else if (signUpError.message.includes('Database error saving new user')) {
      setError('An error occurred while creating your account. Please try again later or contact support.');
    } else {
      setError(signUpError.message);
    }
    setIsSubmitting(false);
    return;
  }

  if (data.user) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      window.location.href = '/dashboard';
      closeModal();
    } else {
      setError('Please check your email to verify your account.');
      setIsSubmitting(false);
      setTimeout(() => {
        window.location.href = '/verify-email';
        closeModal();
      }, 3000);
    }
  }
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
      <div className="modal-content bg-white rounded-3xl p-8 max-w-md w-full min-h-[100vh] overflow-auto custom-scrollbar mx-4 shadow-2xl">
        <div className="text-center mb-8 relative">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
            />
          </div>
          {modalType === 'writer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  required
                  className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  required
                  className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                  placeholder="Enter your last name"
                />
              </div>
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
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}