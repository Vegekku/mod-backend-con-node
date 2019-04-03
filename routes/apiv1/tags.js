'use strict';

const express = require('express');
const Ad = require('mongoose').model('Ad');

const router = express.Router();

/**
 * GET /tags
 * Get list of tags
 * http://localhost:3001/api/v1/tags
 */
router.get('/', async (req, res, next) => {
  try {
    res.json({
      success: true,
      results: Ad.allowedTags()
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
