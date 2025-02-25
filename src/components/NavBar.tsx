"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skill", label: "Skills" },
    { href: "#project", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="bg-gray-950 shadow-lg text-white sticky top-0 z-50 transition-all duration-300">
      <div className="flex justify-between items-center px-5 md:px-10 py-3">
        <Link href="/" className="text-3xl font-semibold">
          Sandeep
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 bg-opacity-90 absolute top-16 right-0 w-44 z-50 py-2 rounded-md shadow-lg backdrop-blur-lg"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-3 px-2 py-2"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className="hover:bg-blue-600 w-full text-center px-4 py-2 rounded-md transition-colors duration-300"
                      onClick={toggleMobileMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-3">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="hover:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
