import React, { useEffect, useState } from 'react';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Écouter l'événement de scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Fonction de retour en haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Si non visible, on cache le bouton
  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-4 h-[50px] w-[50px] p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer md:right-10 z-20"
    >
      <span className="text-xl">^</span>
    </button>
  );
};

export default BackToTopButton;