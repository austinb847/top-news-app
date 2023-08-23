"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoading } = useUser();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-3xl font-bold">Top News Today</span>
        </Link>
        <ul className="hidden md:flex space-x-6">
          {isLoading && (
            <div className="animate-spin h-6 w-6 border-t-4 border-blue-100 border-solid rounded-full"></div>
          )}
          {user && (
            <li>
              <Link href="/user/history">
                <span className="text-white hover:underline cursor-pointer">
                  History
                </span>
              </Link>
            </li>
          )}
          <li>
            <Link href={user ? "/api/auth/logout" : "/api/auth/login"}>
              <span className="text-white hover:underline cursor-pointer">
                {user ? "Logout" : "Login"}
              </span>
            </Link>
          </li>
          {user && <li className="text-white">Account: {user.name}</li>}
        </ul>
        <div className="md:hidden">
          <button
            className="text-white text-3xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <ul className="bg-white absolute top-full left-0 right-0 py-2 px-4 shadow-md">
            {user && (
              <li>
                <Link href="/user/history">
                  <span className="text-gray-800 block py-2 hover:bg-gray-200">
                    History
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link href={user ? "/api/auth/logout" : "/api/auth/login"}>
                <span className="text-gray-800 block py-2 hover:bg-gray-200">
                  {user ? "Logout" : "Login"}
                </span>
              </Link>
            </li>
            {user && (
              <li className="text-gray-800 block py-2">Account: {user.name}</li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
