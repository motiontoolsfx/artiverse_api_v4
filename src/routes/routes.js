const express = require('express');
const create = require('../utils/create');
const createValidator = require('../validators/createValidator');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// 2 requests every 45 seconds
const limiter45s = rateLimit({
    windowMs: 45 * 1000, // 45 seconds
    max: 2
});

// 35 requests per 24 hours
const limiter24h = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 35
});

router.post('/create', createValidator, limiter45s, limiter24h, create);

module.exports = router;