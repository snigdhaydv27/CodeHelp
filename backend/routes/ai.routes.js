const express = require('express');
const multer = require('multer');
const aiController = require("../controllers/ai.controllers")

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post("/get-review", aiController.getReview)
router.post("/get-code", aiController.getCode)
router.post("/get-complexity", aiController.getComplexity)
router.post("/compare-code", aiController.compareCode)

// New routes for code tools
router.post("/generate-test-cases", aiController.getTestCases)
router.post("/beautify-code", aiController.beautifyCode)
router.post("/debug-code", aiController.debugCode)
router.post("/analyze-performance", aiController.analyzePerformance)
router.post("/analyze-security", aiController.analyzeSecurity);
router.post("/dependency-scanner", aiController.scanDependencies);
router.post("/code-metrics-analyzer", aiController.codeMetricsAnalyzer);
router.post("/explain-code", aiController.explainCode);

// Content summarizer routes
router.post("/summarize-content", upload.single('file'), aiController.summarizeContent);
router.post("/summarize-text", aiController.summarizeText);
router.post("/summarize-youtube", aiController.summarizeYoutube);

module.exports = router;