const express = require('express');
const zappController = require('../controllers/zappController');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests, please try again later.'
    }
});

// Apply rate limiting to all routes
router.use(limiter);

// Zapp code generation
router.post('/generate-zapp-code', zappController.generateZappCode);

// Zapp verification
router.post('/verify-zapp', zappController.verifyZapp);

// Token redemption
router.post('/redeem-tokens', zappController.redeemTokens);

// User history
router.get('/user-history/:address', zappController.getUserHistory);

// Contract information
router.get('/contract-info', zappController.getContractInfo);

// Manual verification (for testing)
router.post('/manual-verify', zappController.manualVerify);

// Statistics
router.get('/stats', zappController.getStats);

module.exports = router;
