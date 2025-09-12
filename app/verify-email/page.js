'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../supabase';

export default function VerifyEmail() {
  const router = useRouter();
  const [resendStatus, setResendStatus] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Handle verification callback from URL params (runs in new tab)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');

    if (token && type === 'email') {
      supabase.auth.verifyOtp({ token, type })
        .then(({ data, error }) => {
          if (!error) {
            setIsVerified(true);
            router.push('/dashboard'); // Redirect to dashboard in the new tab
          } else {
            setResendStatus('Verification failed. Please try again or contact support.');
          }
        });
    }
  }, [router]);

  // Listen for close message from dashboard (for original tab)
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'closeTab') {
        window.close(); // Close the original /verify-email tab
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const resendEmail = async () => {
    const button = document.querySelector('button:first-of-type');
    if (!button) return;

    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    button.classList.add('opacity-75');

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: supabase.auth.user()?.email || '',
    });

    if (error) {
      setResendStatus('Failed to resend. Try again.');
    } else {
      button.textContent = 'Email Sent! ✓';
      button.classList.remove('opacity-75');
      button.classList.add('bg-green-500');
      setResendStatus('Verification email resent. Check your inbox.');
    }

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.classList.remove('bg-green-500');
      setResendStatus('');
    }, 2000);
  };

  const goToLogin = () => {
    router.push('/login');
  };

  const contactSupport = () => {
    alert('Opening support contact...'); // Replace with actual support logic
  };

  // Rest of the useEffect for sparkle and click effects remains unchanged
  useEffect(() => {
    const interval = setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'fixed w-2 h-2 bg-yellow-400 rounded-full pointer-events-none animate-ping';
      sparkle.style.left = `${Math.random() * window.innerWidth}px`;
      sparkle.style.top = `${Math.random() * window.innerHeight}px`;
      sparkle.style.zIndex = '-1';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const card = document.querySelector('.glass-card');
    if (!card) return;

    const handleClick = (e) => {
      if (e.target.tagName !== 'BUTTON') {
        const ripple = document.createElement('div');
        ripple.className = 'absolute bg-white opacity-30 rounded-full animate-ping pointer-events-none';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.left = `${e.clientX - card.getBoundingClientRect().left - 10}px`;
        ripple.style.top = `${e.clientY - card.getBoundingClientRect().top - 10}px`;
        card.style.position = 'relative';
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    };

    card.addEventListener('click', handleClick);
    return () => card.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 min-h-screen flex items-center justify-center p-6">
      <div className="glass-card rounded-3xl shadow-soft max-w-md w-full p-8 text-center fade-in">
        <div className="relative mb-8 stagger-1 fade-in">
          <div className="w-24 h-24 sunset-gradient rounded-full flex items-center justify-center mx-auto pulse-glow floating-animation">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path className="check-animation" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center email-bounce">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </div>
        </div>
        <div className="mb-8 stagger-2 fade-in">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thanks for Signing Up! 🎉</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isVerified ? 'Your email is verified! Redirecting...' : 'We\'ve sent a verification link to your email address. Please check your inbox and click the link to activate your WordNest account.'}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 stagger-3 fade-in">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your email inbox (and spam folder)</li>
                <li>• Click the verification link</li>
                <li>• Start exploring amazing articles!</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-4 stagger-4 fade-in">
          <button onClick={resendEmail} className="w-full sunset-gradient text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Resend Verification Email
          </button>
          <button onClick={goToLogin} className="w-full bg-white text-gray-700 py-3 px-6 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
            Back to Login
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 stagger-4 fade-in">
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button onClick={contactSupport} className="text-orange-500 hover:text-orange-600 font-medium underline">
              contact support
            </button>
          </p>
        </div>
        {resendStatus && <p className="text-sm text-green-600 mt-2">{resendStatus}</p>}
        {resendStatus && resendStatus.includes('Failed') && <p className="text-sm text-red-600 mt-2">{resendStatus}</p>}
      </div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 floating-animation"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-300 to-green-300 rounded-full opacity-20 floating-animation" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 floating-animation" style={{ animationDelay: '-4s' }}></div>
      </div>
    </div>
  );
}