import React, { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Home", "Notes", "About", "Contact"];

  return (
    <>
      <header className="w-full h-16 bg-purple-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">NoteBhandar</h1>

          <button
            type="button"
            className="flex flex-col justify-center items-center gap-1.5 p-2"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-white rounded" />
            <span className="w-6 h-0.5 bg-white rounded" />
            <span className="w-6 h-0.5 bg-white rounded" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white text-gray-800 z-50 shadow-xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 px-5 border-b flex items-center justify-between">
          <p className="font-semibold text-lg text-purple-600">NoteBhandar</p>
          <button
            type="button"
            className="text-2xl leading-none"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <nav className="flex flex-col p-5 gap-4 text-base font-medium">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="border-b border-gray-100 pb-2 hover:text-purple-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default NavBar;
