'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../supabase';

export default function LoginModal({ isOpen, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      setError(loginError.message);
      setIsSubmitting(false);
      return;
    }

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();
      if (userError) {
        setError('Error fetching user role');
        setIsSubmitting(false);
        return;
      }
      router.push(userData.role === 'admin' || userData.role === 'editor' ? '/admin' : '/dashboard');
      closeModal();
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    alert('Password reset email sent! Check your inbox.');
    setShowForgotPassword(false);
    setIsSubmitting(false);
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
      id="loginModal"
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) => e.target.id === 'loginModal' && closeModal()}
    >
      <div className="modal-content bg-white rounded-3xl p-8 max-w-md w-full max-h-[95vh] overflow-auto custom-scrollbar mx-4 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 sunset-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h3>
          <p className="text-gray-600">Log in to your WordNest account</p>
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {!showForgotPassword ? (
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-orange-500 hover:underline text-sm"
              >
                Forgot Password?
              </button>
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
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.485,0,2.806,0.539,3.849,1.599l2.879-2.879C17.194,2.986,14.872,2,12.545,2C7.561,2,3.545,6.016,3.545,11s4.016,9,9,9c4.984,0,9-4.016,9-9c0-0.346-0.019-0.688-0.056-1.027H12.545z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800">Reset Password</h4>
            <p className="text-gray-600">Enter your email to receive a password reset link.</p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isSubmitting}
                className="flex-1 sunset-gradient text-white px-6 py-3 rounded-2xl font-semibold button-hover"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}