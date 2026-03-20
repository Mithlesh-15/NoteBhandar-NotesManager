import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full border-t border-purple-200 bg-[#f6e7d8]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-sm text-purple-700 sm:px-6">
        <span className="font-semibold tracking-wide">NoteBhandar</span>
        <nav className="flex items-center gap-4">
          <Link
            to="/about"
            className="font-medium transition-colors duration-150 hover:text-purple-900"
          >
            About
          </Link>
          <Link
            to="/privacy-policy"
            className="font-medium transition-colors duration-150 hover:text-purple-900"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
