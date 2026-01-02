"use client";

import { useState, useEffect } from "react";
import {
  FaLightbulb,
  FaRobot,
  FaChartLine,
  FaExchangeAlt,
  FaCode,
  FaTools,
  FaShieldAlt,
  FaArrowRight,
  FaFileAlt,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../components/Loader";
import BackToTopButton from "../../components/BackToTopButton";

const About = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loader
        fullscreen
        size="xl"
        color="blue"
        text="Loading About..."
      />
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <div
        className={`py-20 px-4 ${
          isDark ? "bg-gray-900" : "bg-blue-50"
        } relative overflow-hidden`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div
            className={`${
              isDark ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-70"
            } rounded-3xl py-12 px-6 max-w-4xl mx-auto backdrop-blur-sm border ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="mb-8 inline-block p-3 bg-blue-600 bg-opacity-20 rounded-full">
              <FaCode className="text-blue-400 text-3xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-blue-400">CodeHelp</span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto mb-6`}
            >
              An AI-powered platform revolutionizing how developers write,
              optimize, and understand code.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`p-3 rounded-full ${
                isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
              } mr-4`}
            >
              <FaLightbulb className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>

          <div
            className={`${
              isDark ? "bg-gray-700 bg-opacity-50" : "bg-white"
            } rounded-xl p-8 mb-8 border ${
              isDark ? "border-gray-600" : "border-gray-200"
            } backdrop-blur-sm`}
          >
            <div className="relative z-10">
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } leading-relaxed mb-6`}
              >
                At CodeHelp, we believe that every developer deserves access to
                tools that can help them improve their coding skills and produce
                high-quality software. Our mission is to leverage the power of
                artificial intelligence to provide developers with insights,
                suggestions, and optimizations that make their code more
                efficient, readable, and maintainable.
              </p>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } leading-relaxed`}
              >
                We're committed to democratizing access to advanced code
                analysis and optimization techniques, making them available to
                developers of all skill levels and backgrounds. By combining
                cutting-edge AI with a deep understanding of software
                development practices, we aim to elevate the quality of code
                across the industry.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20 relative">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div
                className={`p-3 rounded-full ${
                  isDark ? "bg-purple-500 bg-opacity-20" : "bg-purple-100"
                } mr-4`}
              >
                <FaTools className="text-purple-500 text-xl" />
              </div>
              <h2 className="text-3xl font-bold">Our Core Features</h2>
            </div>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto text-center mb-10`}
            >
              Comprehensive tools designed to enhance every aspect of your
              development workflow
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className={`${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border backdrop-blur-sm hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDark ? "bg-yellow-500 bg-opacity-20" : "bg-yellow-100"
                    }`}
                  >
                    <FaLightbulb className="text-yellow-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">Code Optimization</h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Analyze your code and receive suggestions for improving
                  performance, readability, and maintainability.
                </p>
              </div>

              <div
                className={`${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border backdrop-blur-sm hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                    }`}
                  >
                    <FaRobot className="text-green-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">Code Generation</h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Generate code snippets and solutions based on your
                  requirements and specifications.
                </p>
              </div>

              <div
                className={`${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border backdrop-blur-sm hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDark ? "bg-purple-500 bg-opacity-20" : "bg-purple-100"
                    }`}
                  >
                    <FaChartLine className="text-purple-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">
                    Complexity Analysis
                  </h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Understand the time and space complexity of your algorithms
                  and identify potential bottlenecks.
                </p>
              </div>

              <div
                className={`${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border backdrop-blur-sm hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      isDark ? "bg-red-500 bg-opacity-20" : "bg-red-100"
                    }`}
                  >
                    <FaExchangeAlt className="text-red-400 text-xl" />
                  </div>
                  <h3 className="ml-3 text-lg font-bold">Code Comparison</h3>
                </div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Compare different versions of your code to identify changes,
                  improvements, and potential issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div
                className={`p-3 rounded-full ${
                  isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                } mr-4`}
              >
                <FaTools className="text-green-500 text-xl" />
              </div>
              <h2 className="text-3xl font-bold">Why Choose CodeHelp?</h2>
            </div>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto text-center mb-10`}
            >
              What sets us apart from other development tools
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border backdrop-blur-sm`}
              >
                <div className="relative z-10">
                  <div
                    className={`p-3 rounded-full ${
                      isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
                    } mb-4 inline-block`}
                  >
                    <FaCode className="text-blue-400 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Advanced AI</h3>
                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    Powered by state-of-the-art AI models (Google Gemini)
                    specifically trained on code analysis and optimization.
                  </p>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border backdrop-blur-sm`}
              >
                <div className="relative z-10">
                  <div
                    className={`p-3 rounded-full ${
                      isDark
                        ? "bg-purple-500 bg-opacity-20"
                        : "bg-purple-100"
                    } mb-4 inline-block`}
                  >
                    <FaFileAlt className="text-purple-400 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Developer-Focused</h3>
                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    Built by developers, for developers, with a focus on
                    practical, actionable insights and real-world use cases.
                  </p>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border backdrop-blur-sm`}
              >
                <div className="relative z-10">
                  <div
                    className={`p-3 rounded-full ${
                      isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                    } mb-4 inline-block`}
                  >
                    <FaShieldAlt className="text-green-400 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Comprehensive Tools
                  </h3>
                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    A complete suite of tools covering optimization, analysis,
                    comparison, beautification, and much more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div
                className={`p-3 rounded-full ${
                  isDark ? "bg-red-500 bg-opacity-20" : "bg-red-100"
                } mr-4`}
              >
                <FaShieldAlt className="text-red-500 text-xl" />
              </div>
              <h2 className="text-3xl font-bold">Our Core Values</h2>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <div
                className={`p-6 rounded-lg ${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } border backdrop-blur-sm`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${
                        isDark ? "bg-red-500 bg-opacity-20" : "bg-red-100"
                      } mr-3`}
                    >
                      ✓
                    </span>
                    Quality First
                  </h3>
                  <p>
                    We believe that code quality is non-negotiable. Every
                    feature we build is designed to help developers write
                    cleaner, more efficient, and more maintainable code.
                  </p>
                </div>
              </div>

              <div
                className={`p-6 rounded-lg ${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } border backdrop-blur-sm`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${
                        isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
                      } mr-3`}
                    >
                      ⚡
                    </span>
                    Continuous Innovation
                  </h3>
                  <p>
                    The field of AI and software development is constantly
                    evolving, and so are we. We're committed to staying at the
                    forefront of technology, continuously improving our tools.
                  </p>
                </div>
              </div>

              <div
                className={`p-6 rounded-lg ${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } border backdrop-blur-sm`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${
                        isDark
                          ? "bg-purple-500 bg-opacity-20"
                          : "bg-purple-100"
                      } mr-3`}
                    >
                      👥
                    </span>
                    Developer Empowerment
                  </h3>
                  <p>
                    We believe in empowering developers of all skill levels.
                    Our tools are designed to be accessible to beginners while
                    providing depth for experienced developers.
                  </p>
                </div>
              </div>

              <div
                className={`p-6 rounded-lg ${
                  isDark
                    ? "bg-gray-700 bg-opacity-50 border-gray-600"
                    : "bg-white border-gray-200"
                } border backdrop-blur-sm`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span
                      className={`inline-block p-2 rounded-full ${
                        isDark ? "bg-green-500 bg-opacity-20" : "bg-green-100"
                      } mr-3`}
                    >
                      🔒
                    </span>
                    Ethical AI
                  </h3>
                  <p>
                    We're committed to developing and using AI responsibly.
                    We prioritize transparency, fairness, and privacy in all
                    our implementations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div
              className={`p-3 rounded-full ${
                isDark ? "bg-blue-500 bg-opacity-20" : "bg-blue-100"
              } mr-4`}
            >
              <FaCode className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-bold">Our Technology Stack</h2>
          </div>
          <p
            className={`text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            } max-w-3xl mx-auto text-center mb-10`}
          >
            Built with modern technologies for performance, scalability, and
            excellent developer experience
          </p>

          <div
            className={`rounded-lg p-8 ${
              isDark ? "bg-gray-700 bg-opacity-50" : "bg-white"
            } border ${isDark ? "border-gray-600" : "border-gray-200"} backdrop-blur-sm`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <TechItem name="Next.js" icon="⚡" />
              <TechItem name="React" icon="⚛" />
              <TechItem name="Node.js" icon="🟢" />
              <TechItem name="Express.js" icon="🚀" />
              <TechItem name="Tailwind CSS" icon="🎨" />
              <TechItem name="Google Gemini AI" icon="🤖" />
              <TechItem name="Prism.js" icon="🌈" />
              <TechItem name="Axios" icon="📡" />
              <TechItem name="React Icons" icon="✨" />
              <TechItem name="React Hot Toast" icon="🔥" />
              <TechItem name="Markdown" icon="📝" />
              <TechItem name="React Markdown" icon="📖" />
            </div>
          </div>
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
};

// Helper Component
const TechItem = ({ name, icon }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`${
        isDark
          ? "bg-gray-800 hover:bg-gray-600"
          : "bg-gray-100 hover:bg-gray-200"
      } rounded-lg p-4 shadow-md transition-colors duration-200`}
    >
      {icon && <div className="mb-2 text-2xl">{icon}</div>}
      <p className="font-medium text-sm">{name}</p>
    </div>
  );
};

export default About;
