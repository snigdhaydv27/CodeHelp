'use client';

import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import "./css/Loader.css";

const Loader = ({ 
  size = "medium", 
  color = "red", 
  centered = true, 
  text = "Loading...", 
  fullscreen = false 
}) => {
  const { isDark } = useTheme();

  // Size configurations for HTML tag elements
  const sizeConfig = {
    small: { scale: 0.7, fontSize: "text-2xl", textSize: "text-xs" },
    medium: { scale: 1, fontSize: "text-4xl", textSize: "text-sm" },
    large: { scale: 1.3, fontSize: "text-5xl", textSize: "text-base" },
    xl: { scale: 1.6, fontSize: "text-6xl", textSize: "text-lg" },
  };

  // Color system for HTML tag theme
  const colorSystem = {
    // blue: {
    //   tag: isDark ? "#3b82f6" : "#2563eb",
    //   bracket: isDark ? "#60a5fa" : "#3b82f6",
    //   slash: isDark ? "#93c5fd" : "#60a5fa",
    //   glow: isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(37, 99, 235, 0.3)",
    // },
    // green: {
    //   tag: isDark ? "#10b981" : "#059669",
    //   bracket: isDark ? "#34d399" : "#10b981",
    //   slash: isDark ? "#6ee7b7" : "#34d399",
    //   glow: isDark ? "rgba(16, 185, 129, 0.5)" : "rgba(5, 150, 105, 0.3)",
    // },
    purple: {
      tag: isDark ? "#8b5cf6" : "#7c3aed",
      bracket: isDark ? "#a78bfa" : "#8b5cf6",
      slash: isDark ? "#c4b5fd" : "#a78bfa",
      glow: isDark ? "rgba(139, 92, 246, 0.5)" : "rgba(124, 58, 237, 0.3)",
    },
    red: {
      tag: isDark ? "#ef4444" : "#dc2626",
      bracket: isDark ? "#f87171" : "#ef4444",
      slash: isDark ? "#fca5a5" : "#f87171",
      glow: isDark ? "rgba(239, 68, 68, 0.5)" : "rgba(220, 38, 38, 0.3)",
    },
    yellow: {
      tag: isDark ? "#f59e0b" : "#d97706",
      bracket: isDark ? "#fbbf24" : "#f59e0b",
      slash: isDark ? "#fde68a" : "#fbbf24",
      glow: isDark ? "rgba(245, 158, 11, 0.5)" : "rgba(217, 119, 6, 0.3)",
    },
  };

  const colors = colorSystem[color] || colorSystem.red;
  const sizing = sizeConfig[size] || sizeConfig.medium;

  const containerClasses = centered
    ? "flex flex-col items-center justify-center"
    : "inline-flex flex-col items-center";

  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [fullscreen]);

  return (
    <div
      role="status"
      className={`${containerClasses} 
        ${fullscreen ? `w-full h-screen` : ""}
      `}
      style={{
        background: fullscreen ? (isDark 
          ? `radial-gradient(circle at center, #0a0a0f 0%, #1a1a2e 100%)`
          : `radial-gradient(circle at center, #ffffff 0%, #f0f9ff 100%)`
        ) : 'transparent'
      }}
    >
      {/* Floating code snippets background */}
      {fullscreen && (
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="floating-code">
            {['<div>', '</div>', '<html>', '<body>', '<head>', '</>'].map((tag, i) => (
              <span 
                key={i}
                className="float-tag"
                style={{
                  left: `${(i * 15) + 5}%`,
                  top: `${(i * 12) % 80}%`,
                  animationDelay: `${i * 0.5}s`,
                  color: colors.tag,
                  fontSize: sizing.fontSize
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main HTML tag loader */}
      <div 
        className="html-tag-loader"
        style={{ transform: `scale(${sizing.scale})` }}
      >
        {/* Opening tag - left side */}
        <div className="tag-part opening-tag">
          <span 
            className="bracket left-bracket"
            style={{ 
              color: colors.bracket,
              filter: `drop-shadow(0 0 10px ${colors.glow})`
            }}
          >
            &lt;
          </span>
          <span 
            className="tag-name"
            style={{ 
              color: colors.tag,
              filter: `drop-shadow(0 0 8px ${colors.glow})`
            }}
          >
            loading
          </span>
          <span 
            className="bracket right-bracket"
            style={{ 
              color: colors.bracket,
              filter: `drop-shadow(0 0 10px ${colors.glow})`
            }}
          >
            &gt;
          </span>
        </div>

        {/* Center content - spinning dots */}
        <div className="tag-content">
          <div className="spinner-dots">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="spinner-dot"
                style={{
                  background: colors.tag,
                  boxShadow: `0 0 15px ${colors.glow}`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Closing tag - right side */}
        <div className="tag-part closing-tag">
          <span 
            className="bracket left-bracket"
            style={{ 
              color: colors.bracket,
              filter: `drop-shadow(0 0 10px ${colors.glow})`
            }}
          >
            &lt;
          </span>
          <span 
            className="slash"
            style={{ 
              color: colors.slash,
              filter: `drop-shadow(0 0 12px ${colors.glow})`
            }}
          >
            /
          </span>
          <span 
            className="tag-name"
            style={{ 
              color: colors.tag,
              filter: `drop-shadow(0 0 8px ${colors.glow})`
            }}
          >
            loading
          </span>
          <span 
            className="bracket right-bracket"
            style={{ 
              color: colors.bracket,
              filter: `drop-shadow(0 0 10px ${colors.glow})`
            }}
          >
            &gt;
          </span>
        </div>

        {/* Decorative brackets orbiting */}
        <div className="orbiting-brackets">
          {['<', '>', '</', '/>'].map((bracket, i) => (
            <span
              key={i}
              className="orbit-bracket"
              style={{
                color: colors.bracket,
                filter: `drop-shadow(0 0 6px ${colors.glow})`,
                animationDelay: `${i * 0.25}s`
              }}
            >
              {bracket}
            </span>
          ))}
        </div>
      </div>

      {/* Text with HTML tag styling */}
      {text && (
        <div className="mt-12 text-center">
          <div className="relative inline-block">
            <span 
              className={`${sizing.textSize} font-mono font-semibold ${
                text === "Loading..." ? "sr-only" : ""
              }`}
            >
              <span style={{ color: colors.bracket, marginRight: '2px' }}>&lt;</span>
              {text.includes(' ') ? (
                <>
                  <span style={{ 
                    color: colors.tag,
                    textShadow: `0 0 15px ${colors.glow}`
                  }}>
                    {text.split(' ')[0]}
                  </span>
                  <span style={{ 
                    color: isDark ? '#06b6d4' : '#0891b2',
                    textShadow: `0 0 15px ${isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(8, 145, 178, 0.5)'}`,
                    marginLeft: '0.5rem'
                  }}>
                    {text.split(' ').slice(1).join(' ')}
                  </span>
                </>
              ) : (
                <span style={{ 
                  color: colors.tag,
                  textShadow: `0 0 15px ${colors.glow}`
                }}>
                  {text}
                </span>
              )}
              <span style={{ color: colors.bracket, marginLeft: '2px' }}>/&gt;</span>
            </span>
          </div>
          
          {/* Code-style progress bar */}
          <div className="mt-4 font-mono text-xs" style={{ color: colors.tag, opacity: 0.6 }}>
            <div className="flex items-center justify-center gap-1">
              <span style={{ color: colors.bracket }}>[</span>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <span
                  key={i}
                  className="progress-bar"
                  style={{ 
                    color: colors.tag,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  =
                </span>
              ))}
              <span style={{ color: colors.bracket }}>]</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
