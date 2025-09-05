'use client';

import React, { useEffect } from 'react';

const Timeline = () => {
  useEffect(() => {
    // Timeline animation on scroll
    const animateTimeline = () => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateX(0)';
            }, index * 200);
          }
        });
      }, { threshold: 0.1 });
      
      timelineItems.forEach(item => {
        observer.observe(item);
      });
    };

    animateTimeline();
  }, []);

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-gray-800 mb-6">Our Journey</h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From a simple idea to a thriving community - here are the key milestones in our story.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-blue-400 rounded-full"></div>
          <div className="space-y-12">
            <div className="timeline-item flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">The Idea</h4>
                  <p className="text-gray-600 mb-2">January 2023</p>
                  <p className="text-gray-600">Sarah and Marcus identify the need for a quality-focused professional blogging platform.</p>
                </div>
              </div>
              <div className="w-8 h-8 sunset-gradient rounded-full flex items-center justify-center relative z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="w-1/2 pl-8"></div>
            </div>
            <div className="timeline-item flex items-center">
              <div className="w-1/2 pr-8"></div>
              <div className="w-8 h-8 tech-gradient rounded-full flex items-center justify-center relative z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="w-1/2 pl-8">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">MVP Launch</h4>
                  <p className="text-gray-600 mb-2">March 2023</p>
                  <p className="text-gray-600">WordNest beta launches with 5 founding writers and 50 articles across technology and design.</p>
                </div>
              </div>
            </div>
            <div className="timeline-item flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">First 1K Readers</h4>
                  <p className="text-gray-600 mb-2">June 2023</p>
                  <p className="text-gray-600">Community grows to 1,000 monthly readers. We expand to include business and lifestyle categories.</p>
                </div>
              </div>
              <div className="w-8 h-8 green-gradient rounded-full flex items-center justify-center relative z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div className="w-1/2 pl-8"></div>
            </div>
            <div className="timeline-item flex items-center">
              <div className="w-1/2 pr-8"></div>
              <div className="w-8 h-8 design-gradient rounded-full flex items-center justify-center relative z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="w-1/2 pl-8">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Platform Redesign</h4>
                  <p className="text-gray-600 mb-2">September 2023</p>
                  <p className="text-gray-600">Major platform update with improved search, categories, and mobile experience. 20+ expert writers join.</p>
                </div>
              </div>
            </div>
            <div className="timeline-item flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">10K Community</h4>
                  <p className="text-gray-600 mb-2">December 2023</p>
                  <p className="text-gray-600">Reach 10,000 monthly readers. Launch newsletter and community features. Add productivity and innovation categories.</p>
                </div>
              </div>
              <div className="w-8 h-8 purple-gradient rounded-full flex items-center justify-center relative z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.414l.707-.707zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="w-1/2 pl-8"></div>
            </div>
            <div className="timeline-item flex items-center">
              <div className="w-1/2 pr-8"></div>
              <div className="w-8 h-8 innovation-gradient rounded-full flex items-center justify-center relative z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="w-1/2 pl-8">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">50K Milestone</h4>
                  <p className="text-gray-600 mb-2">January 2025</p>
                  <p className="text-gray-600">Celebrate 50,000+ monthly readers, 45 expert writers, and 247 high-quality articles. The journey continues!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;