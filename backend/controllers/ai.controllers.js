const aiService = require("../services/ai.service");

const handleRequest = async (
  req,
  res,
  serviceMethod,
  requiredFields = ["prompt"]
) => {
  try {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .send(
            `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
          );
      }
    }

    const args = requiredFields.map((field) => req.body[field]);
    const response = await serviceMethod(...args);
    res.send(response);
  } catch (error) {
    console.error(`Error in ${serviceMethod.name}:`, error.message);
    
    // Log full error details for debugging
    console.error(`Full error object:`, {
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
      code: error.code,
      errorMessage: error.errorMessage,
      name: error.name
    });
    
    // Handle rate limit errors specifically (check multiple fields)
    if (error.status === 429 || error.statusCode === 429) {
      return res.status(429).json({
        error: "API Rate Limited",
        message: "Too many requests. Please wait before trying again.",
        retryAfter: 60
      });
    }
    
    // Check for timeout errors
    if (error.code === 'ERR_HTTP_REQUEST_TIMEOUT' || error.message?.includes('timeout')) {
      return res.status(504).json({
        error: "Request Timeout",
        message: "The request took too long. Please try again."
      });
    }
    
    res
      .status(500)
      .json({
        error: "Processing Error",
        message: error.message || `An error occurred while processing ${serviceMethod.name}`
      });
  }
};

const getReview = (req, res) =>
  handleRequest(req, res, aiService.generateReview, ["prompt"]);
const getCode = (req, res) =>
  handleRequest(req, res, aiService.generateCode, ["prompt"]);
const getComplexity = (req, res) =>
  handleRequest(req, res, aiService.generateComplexity, ["prompt"]);
const compareCode = (req, res) =>
  handleRequest(req, res, aiService.compareCode, [
    "code1",
    "code2",
    "language",
  ]);
const getTestCases = (req, res) =>
  handleRequest(req, res, aiService.generateTestCases, ["code", "language"]);
const beautifyCode = (req, res) =>
  handleRequest(req, res, aiService.beautifyCode, ["code", "language"]);
const debugCode = (req, res) =>
  handleRequest(req, res, aiService.debugCode, ["code", "language"]);
const analyzePerformance = (req, res) =>
  handleRequest(req, res, aiService.analyzePerformance, ["code", "language"]);
const analyzeSecurity = (req, res) =>
  handleRequest(req, res, aiService.analyzeSecurity, ["code", "language"]);
// Dependency Scanner
const scanDependencies = async (req, res) => {
  try {
    const { fileContent } = req.body;

    if (!fileContent) {
      return res.status(400).send("Dependencies file is required");
    }

    const response = await aiService.scanDependencies(fileContent);
    res.send(response);
  } catch (error) {
    console.error("Error in scanDependencies:", error);
    res.status(500).send("An error occurred while scanning dependencies");
  }
};

const codeMetricsAnalyzer = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).send("Code is required");
  }
  try {
    const result = await aiService.codeMetricsAnalyzer(code);
    res.json({ result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const explainCode = (req, res) =>
  handleRequest(req, res, aiService.generateExplanation, ["code", "language"]);

const summarizeContent = async (req, res) => {
  try {
    // Handle both file upload (FormData) and regular JSON
    let content = req.body?.content;
    const summaryLength = req.body?.summaryLength || 'medium';
    const summaryType = req.body?.summaryType || 'general';
    
    // If it's a file upload, extract text from file
    if (req.file) {
      // For now, just use file name as placeholder
      // You can add PDF/file parsing logic here
      content = req.file.originalname;
    }
    
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    
    const result = await aiService.summarizeContent(content, summaryLength, summaryType);
    res.json(result);
  } catch (err) {
    console.error('Error in summarizeContent:', err);
    res.status(500).json({ error: err.message });
  }
};

const summarizeText = async (req, res) => {
  try {
    const { text, summaryLength = 'medium', summaryType = 'general' } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const result = await aiService.summarizeText(text, summaryLength, summaryType);
    res.json(result);
  } catch (err) {
    console.error('Error in summarizeText:', err);
    res.status(500).json({ error: err.message });
  }
};

const summarizeYoutube = async (req, res) => {
  try {
    const { youtubeUrl, summaryLength = 'medium', summaryType = 'general' } = req.body;
    if (!youtubeUrl) {
      return res.status(400).json({ error: "YouTube URL is required" });
    }
    const result = await aiService.summarizeYoutube(youtubeUrl, summaryLength, summaryType);
    res.json(result);
  } catch (err) {
    console.error('Error in summarizeYoutube:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getReview,
  getCode,
  getComplexity,
  compareCode,
  getTestCases,
  beautifyCode,
  debugCode,
  analyzePerformance,
  analyzeSecurity,
  scanDependencies, 
  codeMetricsAnalyzer, 
  explainCode,
  summarizeContent,
  summarizeText,
  summarizeYoutube,
};
