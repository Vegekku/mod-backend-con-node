'use strict';

const express = require('express');
const router = express.Router();
const Ad = require('mongoose').model('Ad');

/**
 * GET /tags
 * Get list of tags
 * 
 * http://localhost:3001/api/v1/tags
 */
router.get('/', async (req, res, next) => {
    try {
        res.json({
            success: true,
            results: Ad.allowedTags()
        });
    } catch(error) {
        next(error);
        return;
    }
});

module.exports = router;