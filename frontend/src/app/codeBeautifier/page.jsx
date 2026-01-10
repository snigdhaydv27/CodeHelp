'use client';

import { useState, useEffect } from 'react';
import { FaMagic, FaCode, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Loader from '../../components/Loader';
// import FeedbackButton from '../../components/FeedbackButton';
import { useTheme } from '../../context/ThemeContext';
import BackToTopButton from '../../components/BackToTopButton';

function CodeBeautifier() {
  const exampleCodes = {
    "JavaScript": `function calculateTotal(items,tax){
let total=0;for(let i=0;i<items.length;i++){
total+=items[i].price;}
return total+(total*tax);}`,
    "Python": `def calculate_total(items, tax):
total = 0
for item in items:
total += item['price']
return total + (total * tax)`,
    "Java": `public double calculateTotal(List<Item> items, double tax) {
double total = 0;
for (Item item : items) {
total += item.getPrice();
}
return total + (total * tax);
}`,
    "C++": `double calculateTotal(const std::vector<Item>& items, double tax) {
double total = 0;
for (const auto& item : items) {
total += item.price;
}
return total + (total * tax);
}`,
    "C#": `public double CalculateTotal(List<Item> items, double tax) {
double total = 0;
foreach (var item in items) {
total += item.Price;
}
return total + (total * tax);
}`,
    "PHP": '<?php\nfunction calculateTotal($items, $tax) {\n$total = 0;\nforeach ($items as $item) {\n$total += $item["price"];\n}\nreturn $total + ($total * $tax);\n}\n?>',
    "Go": `func calculateTotal(items []Item, tax float64) float64 {
  total := 0.0
  for _, item := range items {
    total += item.Price
  }
  return total + (total * tax)
}`,
    "Ruby": `def calculate_total(items, tax)
total = 0
items.each { |item| total += item[:price] }
total + (total * tax)
end`,
    "HTML": `<!-- Example messy HTML code -->
<div><span>Item</span><span>Price</span></div><div><span>Apple</span><span>1.00</span></div>`,
    "CSS": `/* Example messy CSS code */
.item{color:red;font-size:14px;}.price{color:blue;font-weight:bold;}`,
  };

  const [code, setCode] = useState(exampleCodes["JavaScript"]);
  const [language, setLanguage] = useState('JavaScript');
  const [beautifiedCode, setBeautifiedCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isDark } = useTheme();

  const languages = ["JavaScript", "Python", "Java", "C++", "C#", "PHP", "Go", "Ruby", "HTML", "CSS"];

  // Clean beautified code by removing ALL explanations - extract ONLY code
  const cleanBeautifiedCode = (code) => {
    // First, try to extract code from markdown blocks if they exist
    const markdownMatch = code.match(/```[\w]*\n([\s\S]*?)\n```/);
    if (markdownMatch) {
      return markdownMatch[1].trim();
    }

    // Remove everything before the first line of actual code
    const lines = code.split('\n');
    let codeStart = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Skip empty lines and common explanation starters
      if (line && 
          !line.match(/^(Here|The|This|I|Your|Before|After|Explanation|Improvements?|Changes?|Fixed|Now|As|For|To|Note|Example)/i) &&
          !line.match(/^[-•*#`]/)) {
        codeStart = i;
        break;
      }
    }

    // Find where code ends (before explanations start)
    let codeEnd = lines.length;
    for (let i = codeStart; i < lines.length; i++) {
      const line = lines[i].trim();
      // If we hit explanation patterns, code has ended
      if (i > codeStart && line.match(/^(This|The|These|Here|Improvement|Explanation|What|Note|Example|As you can|You can|I've|Your code|The code)/i)) {
        codeEnd = i;
        break;
      }
    }

    const extractedCode = lines.slice(codeStart, codeEnd)
      .join('\n')
      .trim()
      // Remove markdown code block markers if present
      .replace(/^```[\w]*\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    return extractedCode;
  };

  const beautifyCode = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code first');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/beautify-code`, {
        code,
        language
      });

      // Store the beautified code directly and clean it
      const cleanedCode = cleanBeautifiedCode(response.data);
      setBeautifiedCode(cleanedCode);
      toast.success('Code beautified successfully!');
    } catch (error) {
      console.error('Error beautifying code:', error);
      toast.error('Failed to beautify code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyBeautifiedCode = () => {
    navigator.clipboard.writeText(beautifiedCode);
    toast.success('Beautified code copied to clipboard!');
  };

  const handleClearAll = (e) => {
    // Prevent event bubbling and default behavior for better mobile compatibility
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setCode('');
    setBeautifiedCode('');
    toast.success('All cleared!');
  };

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
        <Loader size="xl" color="red" text="Loading Code Beautifier Tool..." />
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
              <FaMagic className="text-purple-400 text-2xl mr-2" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Code Beautifier
              </h1>
            </div>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Transform messy, inconsistent code into clean, well-structured code that follows best practices.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input Section */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <FaCode className="inline mr-2" /> Your Code
              </h2>
              <div className="flex space-x-2">
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(exampleCodes[e.target.value] || "");
                  }}
                  className={`px-3 py-1 rounded ${
                    isDark
                      ? 'bg-gray-800 text-white border-gray-600'
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                  } border`}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden mb-4`}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-64 p-4 font-mono text-sm ${
                  isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'
                }`}
                placeholder="Paste your messy code here..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleClearAll}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  if (e.type === 'touchend') {
                    e.preventDefault();
                    handleClearAll(e);
                  }
                }}
                className={`px-4 py-3 min-h-[44px] rounded flex items-center justify-center ${
                  isDark
                    ? 'bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800'
                } transition-all duration-150 touch-manipulation`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  touchAction: 'manipulation'
                }}
                aria-label="Clear All"
              >
                Clear All
              </button>
              <button
                onClick={beautifyCode}
                disabled={isGenerating}
                className="px-4 py-3 min-h-[44px] w-40 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded transition-colors flex items-center justify-center"
              >
                Beautify Code
              </button>
            </div>
          </div>

          {/* Beautified Code Output Section */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <FaLightbulb className="inline mr-2" /> Beautified Code
              </h2>
              {beautifiedCode && (
                <button
                  onClick={handleCopyBeautifiedCode}
                  className={`px-3 py-1 rounded ${
                    isDark
                      ? 'bg-gray-600 hover:bg-gray-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  } transition-colors text-sm`}
                >
                  Copy to Clipboard
                </button>
              )}
            </div>

            <div className={`border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg overflow-hidden`} style={{ height: '500px' }}>
              {isGenerating ? (
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : beautifiedCode ? (
                <div className={`h-full overflow-y-auto p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                  <pre className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
                    <code>
                      {beautifiedCode}
                    </code>
                  </pre>
                </div>
              ) : (
                <div className={`flex flex-col justify-center items-center h-full ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaMagic className="text-4xl mb-4 opacity-50" />
                  <p className="text-center">
                    Enter your messy code and click "Beautify Code" to transform it into clean, well-structured code.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Button */}
      {/* <FeedbackButton toolName="Code Beautifier" /> */}
      <BackToTopButton />
    </div>
  );
}

export default CodeBeautifier;
