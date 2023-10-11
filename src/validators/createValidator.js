const {
    body,
    validationResult
} = require('express-validator');
const {
    containsBannedPhrase
} = require('./bannedWordsSearch.js');

const respondWithError = (res, errorMessage) => {
    return res.status(400).json({
        error: errorMessage,
    });
};

const createValidator = [
    // Validate 'idea'
    body('idea')
    .isString().withMessage('Prompt must be a string.')
    .isLength({
        min: 3,
        max: 300
    }).withMessage('Prompt must be between 3 and 300 characters.')
    .custom((value) => {
        if (value.trim().split(/\s+/).length > 50) {
            throw new Error('Prompt exceeds the word limit of 50.');
        }
        return true;
    })
    .custom((value) => {
        if (/[^a-zA-Z0-9 ,\.\!\?\-:;"']/.test(value)) {
            throw new Error('Prompt contains special characters.');
        }
        return true;
    })
    .custom(async (value) => {
        if (await containsBannedPhrase(value)) {
            throw new Error('Prompt contains banned words.');
        }
        return true;
    }),

    // Validate 'size'
    body('size')
    .isIn(['1x1', '3x2', '2x3']).withMessage('Size must be 1x1, 3x2, or 2x3.'),

    // Check for errors and respond
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return respondWithError(res, errors.array()[0].msg);
        }
        next();
    }
];

module.exports = createValidator;