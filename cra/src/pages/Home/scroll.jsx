import React, { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-5 right-30 z-50 cursor-pointer bg-red-500 p-2 rounded-[20%] text-white text-xl border-none shadow-lg transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-110"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <UpOutlined />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;