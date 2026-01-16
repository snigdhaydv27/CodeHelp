/**
 * AI Service using OpenRouter API
 * This file contains the AI service functions for the application
 */

const axios = require('axios');
const systemInstructions = require("../config/config");

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const MODEL = 'mistralai/devstral-2512:free'; // Free model

// Create axios instance for OpenRouter
const openRouterClient = axios.create({
  baseURL: OPENROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'CodeHelp',
    'Content-Type': 'application/json'
  }
});

/**
 * Make a request to OpenRouter API
 */
async function makeOpenRouterRequest(systemPrompt, userPrompt) {
  try {
    const response = await openRouterClient.post('/chat/completions', {
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    if (response.data && response.data.choices && response.data.choices[0]) {
      return response.data.choices[0].message.content;
    }
    throw new Error('Invalid response structure from OpenRouter');
  } catch (error) {
    console.error('OpenRouter API Error:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message
    });
    throw error;
  }
}

/**
 * Retry utility with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3, initialDelayMs = 1000) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt}/${maxRetries} failed:`, {
        status: error.response?.status,
        message: error.message
      });
      
      if (error.response?.status === 429 && attempt < maxRetries) {
        const delayMs = initialDelayMs * Math.pow(2, attempt - 1);
        console.log(`Rate limited. Retrying in ${delayMs}ms (attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        throw error;
      }
    }
  }
  throw lastError;
}

/**
 * Clean AI response
 */
function cleanAIResponse(text) {
  let cleaned = text.replace(/```[\s\S]*?```/g, match => {
    return match.replace(/^```.*\n/, '').replace(/\n```$/, '');
  });
  return cleaned.trim();
}

// Service functions
async function generateReview(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeOptimiser, prompt)
  );
  return cleanAIResponse(result);
}

async function generateCode(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeGenerator, prompt)
  );
  return cleanAIResponse(result);
}

async function generateComplexity(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeComplexity, prompt)
  );
  return cleanAIResponse(result);
}

async function compareCode(code1, code2) {
  const prompt = `Compare these two code snippets:\n\nCode 1:\n${code1}\n\nCode 2:\n${code2}`;
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeCompare, prompt)
  );
  return cleanAIResponse(result);
}

async function generateTestCases(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.testCaseBuilder, prompt)
  );
  return cleanAIResponse(result);
}

async function beautifyCode(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeBeautifier, prompt)
  );
  return cleanAIResponse(result);
}

async function debugCode(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.errorDebugger, prompt)
  );
  return cleanAIResponse(result);
}

async function analyzePerformance(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeOptimiser, prompt)
  );
  return cleanAIResponse(result);
}

async function analyzeSecurity(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.securityScanner, prompt)
  );
  return cleanAIResponse(result);
}

async function scanDependencies(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.libraryScanner, prompt)
  );
  return cleanAIResponse(result);
}

async function codeMetricsAnalyzer(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeComplexity, prompt)
  );
  return cleanAIResponse(result);
}

async function generateExplanation(code, language) {
  const prompt = `Explain this ${language} code in detail:\n\n${code}`;
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.codeExplainer || 'Explain the following code:', prompt)
  );
  return cleanAIResponse(result);
}

async function summarizeContent(prompt) {
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest(systemInstructions.contentSummarizer, prompt)
  );
  return cleanAIResponse(result);
}

async function summarizeText(text, summaryLength = 'medium', summaryType = 'general') {
  const lengthGuide = {
    short: '2-3 sentences',
    medium: '3-5 sentences',
    long: '5-8 sentences'
  };
  
  const prompt = `Please provide a ${summaryType} summary of the following text in approximately ${lengthGuide[summaryLength] || lengthGuide.medium}:\n\n${text}`;
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest('You are an expert summarizer. Create concise, accurate summaries that capture the key information.', prompt)
  );
  return { summary: cleanAIResponse(result), type: summaryType, length: summaryLength };
}

async function summarizeYoutube(youtubeUrl, summaryLength = 'medium', summaryType = 'general') {
  // This would typically extract transcript from YouTube video
  // For now, return a placeholder message
  const prompt = `Extract and summarize the content from this YouTube video: ${youtubeUrl}. Summary length: ${summaryLength}, Summary type: ${summaryType}`;
  const result = await retryWithBackoff(() =>
    makeOpenRouterRequest('You are an expert summarizer. Create concise, accurate summaries of video content.', prompt)
  );
  return { summary: cleanAIResponse(result), type: summaryType, length: summaryLength, source: 'youtube' };
}

module.exports = {
  generateReview,
  generateCode,
  generateComplexity,
  compareCode,
  generateTestCases,
  beautifyCode,
  debugCode,
  analyzePerformance,
  analyzeSecurity,
  scanDependencies,
  codeMetricsAnalyzer,
  generateExplanation,
  summarizeContent,
  summarizeText,
  summarizeYoutube
};
