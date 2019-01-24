'use strict';

const express = require('express');
const router = express.Router();

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
            results: [
                'work',
                'lifestyle',
                'motor',
                'mobile'
            ]
        });
    } catch(error) {
        next(error);
        return;
    }
});

module.exports = router;