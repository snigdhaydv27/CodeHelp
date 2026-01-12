'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { FaCode, FaLightbulb } from 'react-icons/fa';
import CodeEditor from '../../components/CodeEditor';
import Loader from '../../components/Loader';
import { useTheme } from '../../context/ThemeContext';
import BackToTopButton from '../../components/BackToTopButton';

function CodeGenerator() {
  const { isDark } = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState(`write a c++ code to find factorial of a given number`);
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/get-code`;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader size="xl" color="red" text="Loading Code Generator Tool..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <FaCode className="text-green-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                CodeHelp Code Generator
              </h1>
            </div>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Generate code from your natural language descriptions.
          </p>
        </div>

        {/* Code Editor */}
        <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden">
          <CodeEditor URL={URL} prompt={prompt} />
        </div>
      </div>
      <BackToTopButton />
    </div>
  );
}

export default CodeGenerator;
