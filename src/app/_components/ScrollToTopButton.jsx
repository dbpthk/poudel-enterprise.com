const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-16 right-6 text-3xl bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
