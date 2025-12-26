"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { MdOutlineCleaningServices } from "react-icons/md";
import {
  FaChartLine,
  FaChevronDown,
  FaChevronRight,
  FaCode,
  FaEnvelope,
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
} from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { GoPackageDependencies } from "react-icons/go";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
      "/dependency-scanner",
      "/dead-code-finder",
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

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen transition-all duration-300 z-40 overflow-y-auto overflow-x-hidden
        ${isSidebarOpen ? "w-64 border-r" : "w-0 lg:w-20 lg:border-r"}
        ${isSidebarOpen 
          ? isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          : isDark ? "lg:bg-gray-900 lg:border-gray-700" : "lg:bg-white lg:border-gray-200"
        }`}
      >
        <div className={`${isSidebarOpen ? "p-6" : "p-4"} space-y-6`}>
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            {isSidebarOpen && (
              <Link href="/" className="flex items-center space-x-2">
                <FaCode className={`text-2xl ${
                  isDark ? "text-blue-500" : "text-gray-900"
                }`} />
                <span className={`font-bold text-xl ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>CodeHelp</span>
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className={`hidden lg:block p-2 rounded-lg ${
                isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full p-3 rounded-xl flex items-center ${
              isSidebarOpen ? "justify-start space-x-3" : "justify-center"
            } ${
              isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-900"
            }`}
          >
            {isDark ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-indigo-600" />
            )}
            {isSidebarOpen && <span>Theme</span>}
          </button>

          {/* Navigation */}
          <nav className="space-y-2">
            {/* Home */}
            <Link
              href="/"
              className={`flex items-center ${
                isSidebarOpen ? "space-x-3" : "justify-center"
              } p-3 rounded-xl transition-all ${
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
              {isSidebarOpen && <span>Home</span>}
            </Link>

            {/* Optimize */}
            <Link
              href="/codeOptimiser"
              className={`flex items-center ${
                isSidebarOpen ? "space-x-3" : "justify-center"
              } p-3 rounded-xl transition-all ${
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
              {isSidebarOpen && <span>Optimize</span>}
            </Link>

            {/* Generate */}
            <Link
              href="/codeGenerator"
              className={`flex items-center ${
                isSidebarOpen ? "space-x-3" : "justify-center"
              } p-3 rounded-xl transition-all ${
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
              {isSidebarOpen && <span>Generate</span>}
            </Link>

            {/* Complexity */}
            <Link
              href="/codeComplexity"
              className={`flex items-center ${
                isSidebarOpen ? "space-x-3" : "justify-center"
              } p-3 rounded-xl transition-all ${
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
              {isSidebarOpen && <span>Complexity</span>}
            </Link>

            {/* Compare */}
            <Link
              href="/codeCompare"
              className={`flex items-center ${
                isSidebarOpen ? "space-x-3" : "justify-center"
              } p-3 rounded-xl transition-all ${
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
              {isSidebarOpen && <span>Compare</span>}
            </Link>

            {/* Tools Dropdown */}
            <div>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`w-full flex items-center ${
                  isSidebarOpen ? "justify-between" : "justify-center"
                } p-3 rounded-xl transition-all ${
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
                  {isSidebarOpen && <span>Tools</span>}
                </div>
                {isSidebarOpen && (
                  <FaChevronDown
                    className={`transform transition-transform ${
                      isToolsOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {isToolsOpen && isSidebarOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {[
                    {
                      href: "/code-tools",
                      icon: FaTools,
                      label: "Complete Suite",
                    },
                    {
                      href: "/test-case-generator",
                      icon: FaVial,
                      label: "Unit Test Builder",
                    },
                    {
                      href: "/code-beautifier",
                      icon: FaPaintBrush,
                      label: "Format Optimizer",
                    },
                    {
                      href: "/error-debugger",
                      icon: FaBug,
                      label: "Bug Detective",
                    },
                    {
                      href: "/performance-analyzer",
                      icon: FaTachometerAlt,
                      label: "Speed Inspector",
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
                    {
                      href: "/code-metrics-analyzer",
                      icon: IoMdAnalytics,
                      label: "Metrics Analyzer",
                    },
                    {
                      href: "/dead-code-finder",
                      icon: MdOutlineCleaningServices,
                      label: "Unused Code Cleaner",
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
                className={`w-full flex items-center ${
                  isSidebarOpen ? "justify-between" : "justify-center"
                } p-3 rounded-xl transition-all ${
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
                  {isSidebarOpen && <span>Company</span>}
                </div>
                {isSidebarOpen && (
                  <FaChevronDown
                    className={`transform transition-transform ${
                      isCompanyOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {isCompanyOpen && isSidebarOpen && (
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
      </aside>
    </>
  );
}

export default Sidebar;
