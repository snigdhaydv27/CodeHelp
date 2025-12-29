'use client';

import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import Loader from "../../components/Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaTools,
  FaVial,
  FaMagic,
  FaBug,
  FaTachometerAlt,
  FaArrowRight,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { GoPackageDependencies } from "react-icons/go";
import { GrAnalytics } from "react-icons/gr"; 
import { MdOutlineCleaningServices } from 'react-icons/md';
import { useTheme } from "../../context/ThemeContext";
import BackToTopButton from "../../components/BackToTopButton";

gsap.registerPlugin(ScrollTrigger);

export default function CodeTools() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardRefs = useRef([]);

  const tools = [
    {
      icon: <FaVial className="text-blue-400 text-2xl" />,
      title: "Test Case Builder",
      description:
        "Automatically generate comprehensive test cases for your code to ensure it works correctly in all scenarios.",
      link: "/testCaseGenerator",
    },
    {
      icon: <FaMagic className="text-purple-400 text-2xl" />,
      title: "Code Beautifier",
      description:
        "Transform messy, inconsistent code into clean, well-structured code that follows best practices.",
      link: "/codeBeautifier",
    },
    {
      icon: <FaBug className="text-red-400 text-2xl" />,
      title: "Bug & Error Debugger",
      description:
        "Identify and fix bugs, syntax errors, and logical issues in your code with detailed explanations.",
      link: "/error-debugger",
    },
    {
      icon: <FaTachometerAlt className="text-green-400 text-2xl" />,
      title: "Code Performance Analyzer",
      description:
        "Analyze execution time and memory usage of your code and get optimization recommendations.",
      link: "/code-analyzer",
    },
    {
      icon: <FaFileAlt className="text-orange-400 text-2xl" />,
      title: "Content Summarizer",
      description:
        "Upload media files (images, PDFs, videos, text) and get AI-generated summaries of their content.",
      link: "/contentSummarizer",
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      title: "Security Scanner",
      description:
        "Scan your code for security flaws like SQL injection, XSS, and hardcoded secrets with remediation suggestions.",
      link: "/securityScanner",
    },
    {
      icon: <GoPackageDependencies className="text-orange-500 text-2xl" />,
      title: "Library Scanner",
      description:
        "Scan your dependencies for vulnerabilities and deprecation.",
      link: "/libraryScanner",
    },
    {
      icon: <GrAnalytics className="text-orange-500 text-2xl" />,
      title: "Metrics Analyzer",
      description:
        "Analyze your codebase for various metrics like complexity, maintainability, and more.",
      link: "/metricsAnalyzer",
    },
    {
      icon: <MdOutlineCleaningServices className="text-pink-400 text-2xl mr-2" />,
      title: "Unused Code Cleaner",
      description:
        "The Unused Code Cleaner helps you keep your projects clean and maintainable by detecting unused code.",
      link: "/unusedCodeCleaner",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        clearProps: "all",
        ease: "power3.out",
      });

      gsap.to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        clearProps: "all",
        ease: "power3.out",
      });

      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.5 + index * 0.2,
            clearProps: "all",
            ease: "expo.out",
          });
        }
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <Loader
          size="xl"
          color="red"
          text="Loading Code Tools..."
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block p-3 rounded-full bg-blue-500 bg-opacity-20 mb-4">
            <FaTools className="text-blue-400 text-3xl" />
          </div>
          <h1
            ref={headerRef}
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            CodeHelp Code Tools
          </h1>
          <p
            ref={paragraphRef}
            className={`text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Powerful tools to enhance your coding experience and improve code
            quality
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.link}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group relative p-6 rounded-2xl border 
                 transition-all duration-300 
                ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                } 
                 hover:-translate-y-2 hover:scale-[1.02] 
                 hover:shadow-2xl`}
            >
              {/* Icon */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl 
                   ${isDark ? 'bg-gray-800' : 'bg-gray-100'}
                   transform transition-transform duration-300 
                   group-hover:scale-110 group-hover:rotate-6`}
              >
                {tool.icon}
              </div>

              {/* Title */}
              <h3
                className={`mt-6 text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} 
                   transition-colors duration-300 
                   group-hover:text-indigo-400`}
              >
                {tool.title}
              </h3>

              {/* Description */}
              <p
                className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}
                   transition-colors duration-300 
                   group-hover:text-gray-300`}
              >
                {tool.description}
              </p>

              {/* CTA */}
              <div
                className={`mt-6 inline-flex items-center text-sm font-medium 
                   ${isDark ? 'text-indigo-400' : 'text-indigo-600'}
                   transition-colors duration-300 
                   group-hover:text-indigo-300`}
              >
                Try it now
                <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BackToTopButton />
    </div>
  );
}
