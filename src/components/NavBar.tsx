'use client'
import Link from "next/link";
import React, { useState } from "react";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-950 shadow-lg text-white sticky top-0 z-50">
      <div className="flex justify-between items-center px-5 md:px-10 py-3">
        <Link href={"/"} className="text-3xl font-semibold">
          Sandeep
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          {/* Hamburger icon when menu is closed */}
          {!isMobileMenuOpen ? (
            <svg
              onClick={toggleMobileMenu} // Toggle mobile menu
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
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
          ) : (
            // "X" icon when menu is open
            <svg
              onClick={toggleMobileMenu} // Close the mobile menu
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
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
          )}

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="bg-[#2b2f33] absolute top-16 right-0 w-44 z-50 py-2 rounded-md shadow-lg">
              <div className="flex flex-col items-center space-y-4 px-2 py-2">
                <Link
                  className="hover:bg-blue-600 hover:w-full text-center px-4 py-2 rounded-md"
                  href="#profile"
                >
                  Home
                </Link>
                <Link
                  className="hover:bg-blue-600 hover:w-full text-center px-4 py-2 rounded-md"
                  href="#about"
                >
                  About
                </Link>
                <Link
                  className="hover:bg-blue-600 hover:w-full text-center px-4 py-2 rounded-md"
                  href="#skill"
                >
                  Skills
                </Link>
                <Link
                  className="hover:bg-blue-600 hover:w-full text-center px-4 py-2 rounded-md"
                  href="#project"
                >
                  Projects
                </Link>
                <Link
                  className="hover:bg-blue-600 hover:w-full text-center px-4 py-2 rounded-md"
                  href="#contact"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="space-x-5 sm:space-x-3 hidden md:flex justify-center items-center">
          <Link className="hover:bg-blue-600 px-2 rounded-md py-2" href="#profile">
            Home
          </Link>
          <Link
            className="hover:bg-blue-600 px-2 rounded-md py-2"
            href="#about"
          >
            About
          </Link>
          <Link
            className="hover:bg-blue-600 px-2 rounded-md py-2"
            href="#skill"
          >
            Skills
          </Link>
          <Link
            className="hover:bg-blue-600 px-2 rounded-md py-2"
            href="#project"
          >
            Projects
          </Link>
          <Link className="hover:bg-blue-600 px-2 rounded-md py-2" href="#contact">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
