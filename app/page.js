"use client";

import { useState, useRef } from "react";
import Header from "../components/Header";
import Hero from "../components/hero";
import Stats from "../components/Stats";
import BlogShowcase from "../components/BlogShowcase";
import FeaturedArticles from "../components/FeaturedArticles";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";
import SignupModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("community");
  const blogShowcaseRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openSignupModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSignupModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const scrollToBlogShowcase = () => {
    blogShowcaseRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Header
        openSignupModal={openSignupModal}
        setIsLoginOpen={setIsLoginOpen}
      />
      <main className="container mx-auto px-6 py-16">
        <Hero
          scrollToBlogShowcase={scrollToBlogShowcase}
          openSignupModal={openSignupModal}
        />
        <Stats />
        <BlogShowcase ref={blogShowcaseRef} />
        <FeaturedArticles />
        <Newsletter />
      </main>
      <Footer />
      <SignupModal
        isOpen={isModalOpen}
        closeModal={closeSignupModal}
        modalType={modalType}
      />
      <LoginModal
        isOpen={isLoginOpen}
        closeModal={() => setIsLoginOpen(false)}
      />
    </>
  );
}
