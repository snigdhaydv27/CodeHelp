'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import { FaChartLine } from 'react-icons/fa';
import CodeEditor from '../../components/CodeEditor'
import {useTheme} from '../../context/ThemeContext';
import Loader from '../../components/Loader';
import BackToTopButton from '../../components/BackToTopButton';

function CodeComplexity() {
    const {isDark} = useTheme();
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
    // const URL = "http://localhost:5000/ai/get-complexity"
    const URL=`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/get-complexity`
    const prompt=
    `int fact(int n){
        if(n<=1){
            return 1;
        }else{
            return n*fact(n-1);
        } 
}`;
if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <Loader fullscreen size="xl" color="red" text="Loading Complexity Tool..." />
      </div>
    );
  }
    return (
        <div className={`w-full min-h-screen ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {/* Header Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex items-center mb-4">
                    <FaChartLine className="text-green-400 text-2xl mr-3" />
                    <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Code Complexity Analyzer
                    </h1>
                </div>
                <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Analyze the time and space complexity of your code using Big O notation.
                </p>
            </div>

            {/* Editor Section */}
            <CodeEditor URL={URL} prompt={prompt} />
            <BackToTopButton />
        </div>
    )
}

export default CodeComplexity