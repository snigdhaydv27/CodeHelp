"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import {
  FaChartLine,
  FaChevronDown,
  FaCode,
  FaExchangeAlt,
  FaRocket,
  FaMoon,
  FaMagic,
  FaShieldAlt,
  FaSun,
  FaTools,
  FaVial,
  FaPaintBrush,
  FaBug,
  FaTachometerAlt,
  FaAlignLeft,
  FaRegBuilding,
  FaBars,
  FaTimes,
  FaHome,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { GoPackageDependencies } from "react-icons/go";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return pathname === path;
  };

  const isToolsActive = () => {
    const toolsPaths = [
      "/code-tools",
      "/test-case-generator",
      "/code-beautifier",
      "/error-debugger",
      "/performance-analyzer",
      "/content-summarizer",
      "/security-scanner",
    ];
    return toolsPaths.some((path) => pathname === path);
  };

  const isCompanyActive = () => {
    const companyPaths = ["/about", "/contact", "/feedback", "/privacy-policy"];
    return companyPaths.some((path) => pathname === path);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 lg:hidden p-3 rounded-xl ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800 border border-gray-200"
        } shadow-lg`}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen transition-all duration-300 z-40 overflow-y-auto overflow-x-hidden
        ${isSidebarOpen ? "w-48" : "w-0 lg:w-48"} border-r
        ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}
        `}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <FaCode className={`text-2xl ${
                isDark ? "text-blue-500" : "text-gray-900"
              }`} />
              <span className={`font-bold text-xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}>CodeHelp</span>
            </Link>
          </div>

          {/* Main content (theme + navigation) */}
          <div className="flex-1 space-y-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-full p-3 rounded-xl flex items-center justify-start space-x-3 ${
                isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-indigo-600" />
              )}
              <span>Theme</span>
            </button>

            {/* Navigation */}
            <nav className="space-y-2">
            {/* Home */}
            <Link
              href="/"
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                isActive("/")
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <FaHome/>
              <span>Home</span>
            </Link>

            {/* Optimize */}
            <Link
              href="/codeOptimiser"
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                isActive("/codeOptimiser")
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <FaRocket />
              <span>Optimize</span>
            </Link>

            {/* Generate */}
            <Link
              href="/codeGenerator"
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                isActive("/codeGenerator")
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <FaMagic />
              <span>Generate</span>
            </Link>

            {/* Complexity */}
            <Link
              href="/codeComplexity"
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                isActive("/codeComplexity")
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <FaChartLine />
              <span>Complexity</span>
            </Link>

            {/* Compare */}
            <Link
              href="/codeCompare"
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                isActive("/codeCompare")
                  ? isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                  : isDark
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <FaExchangeAlt />
              <span>Compare</span>
            </Link>

            {/* Tools Dropdown */}
            <div>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  isToolsActive()
                    ? isDark
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                    : isDark
                    ? "hover:bg-gray-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FaTools />
                  <span>Tools</span>
                </div>
                <FaChevronDown
                  className={`transform transition-transform ${
                    isToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isToolsOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {[
                    {
                      href: "/complete-suites",
                      icon: FaTools,
                      label: "Complete Suite",
                    },
                    {
                      href: "/test-case-builder",
                      icon: FaVial,
                      label: "Test Case Builder",
                    },
                    {
                      href: "/codeBeautifier",
                      icon: FaPaintBrush,
                      label: "Code Beautifier",
                    },
                    {
                      href: "/error-debugger",
                      icon: FaBug,
                      label: "Bug Detective",
                    },
                    {
                      href: "/code-analyzer",
                      icon: FaTachometerAlt,
                      label: "Code Analyzer",
                    },
                    {
                      href: "/content-summarizer",
                      icon: FaAlignLeft,
                      label: "Content Summarizer",
                    },
                    {
                      href: "/security-scanner",
                      icon: FaShieldAlt,
                      label: "Security Scanner",
                    },
                    {
                      href: "/dependency-scanner",
                      icon: GoPackageDependencies,
                      label: "Library Scanner",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 p-2 rounded-lg text-sm ${
                        isActive(item.href)
                          ? isDark
                            ? "bg-gray-800 text-blue-400"
                            : "bg-gray-100 text-blue-600"
                          : isDark
                          ? "hover:bg-gray-800 text-gray-400"
                          : "hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <item.icon className="text-sm" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

              {/* Company Dropdown */}
              <div>
                <button
                  onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    isCompanyActive()
                      ? isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDark
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FaRegBuilding />
                    <span>Company</span>
                  </div>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      isCompanyOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCompanyOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    {[
                      { href: "/about", label: "About Us" },
                      { href: "/contact", label: "Contact" },
                      { href: "/feedback", label: "Feedback" },
                      { href: "/privacy-policy", label: "Privacy Policy" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block p-2 rounded-lg text-sm ${
                          isActive(item.href)
                            ? isDark
                              ? "bg-gray-800 text-blue-400"
                              : "bg-gray-100 text-blue-600"
                            : isDark
                            ? "hover:bg-gray-800 text-gray-400"
                            : "hover:bg-gray-100 text-gray-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Footer pinned to bottom */}
          <div
            className={`mt-6 pt-4 border-t text-[10px] flex flex-col gap-2 items-center text-center ${
              isDark
                ? "border-gray-700 text-gray-400"
                : "border-gray-200 text-gray-500"
            }`}
          >
            <div className="flex items-center justify-center gap-3 text-lg">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={isDark ? "hover:text-gray-200" : "hover:text-gray-800"}
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={isDark ? "hover:text-gray-200" : "hover:text-gray-800"}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className={isDark ? "hover:text-gray-200" : "hover:text-gray-800"}
              >
                <FaTwitter/>
              </a>
            </div>
            <span className="truncate">
              © {new Date().getFullYear()} CodeHelp. All rights reserved.
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
