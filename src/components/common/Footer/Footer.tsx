"use client";

import Link from "next/link";
import { ChevronUp, Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#1C2D37] text-white py-12 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-8">
          {/* Brand and Info */}
          <div className="flex flex-col">
            <div>
              {/* Logo/Brand */}
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold mb-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-white">Task Track</span>
              </Link>
            </div>

            <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">
              Stay organized and excel in your studies with our comprehensive
              assignment tracking system. Never miss a deadline again.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <p className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                support@tasktrack.com
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 text-white/60">
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="hover:text-white transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Back to Top */}
            <div className="mt-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition-all duration-200 rounded-lg"
              >
                <ChevronUp className="w-4 h-4 mr-2" />
                Back to Top
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/assignments"
                  className="hover:text-white transition-colors duration-200"
                >
                  My Assignments
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AssignTracker. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
