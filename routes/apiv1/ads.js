'use strict';

const express = require('express');
const Ad = require('mongoose').model('Ad');
const { query, body, validationResult } = require('express-validator/check');
const upload = require('../../lib/multerConfigure');
const jwtAuth = require('../../lib/jwtAuth');

const router = express.Router();

/**
 * GET /ads
 * Get list of ads
 *
 * https://localhost/api/v1/ads?start=1&limit=3&sort=name&tag=lifestyle
 * https://localhost/api/v1/ads?tag=mobile&sale=false&name=ip&price=50-&start=0&limit=2&sort=price
 */
router.get(
  '/',
  [
    query('name')
      .optional()
      .isAlphanumeric()
      .withMessage('Must be alphanumeric'),
    query('sale')
      .optional()
      .isBoolean()
      .withMessage('Must be boolean'),
    query('sort')
      .optional()
      .isIn(['name', 'sale', 'price'])
      .withMessage('Must be name, sale or price'),
    query('start')
      .optional()
      .isNumeric()
      .withMessage('Must be numeric'),
    query('limit')
      .optional()
      .isNumeric()
      .withMessage('Must be numeric'),
    // query('price').optional().isNumeric().withMessage('Must be numeric'),
    query('tag')
      .optional()
      .isIn(Ad.allowedTags())
      .withMessage('Must be one of allow values. GET /tags to check them.')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const start = parseInt(req.query.start) || 0;
      const limit = parseInt(req.query.limit) || 100;
      const sort = req.query.sort || '_id';
      const filters = {};

      const tags = req.query.tag;
      const { sale, name } = req.query;
      let { price } = req.query;

      if (name) {
        filters.name = new RegExp(`^${name}`, 'i');
      }

      if (sale) {
        filters.sale = sale;
      }

      if (tags) {
        filters.tags = { $in: tags };
      }

      if (price) {
        const index = price.indexOf('-');
        const lastIndex = price.lastIndexOf('-');
        const priceLength = price.length - 1;

        if (index === -1) {
          // Equal to price: 50
          filters.price = price;
        } else if (index === 0) {
          // Less than price: -50
          filters.price = { $lte: price.substring(1) };
        } else if (index === priceLength) {
          // More than price: 10-
          filters.price = { $gte: price.substring(0, priceLength) };
        } else if (index === lastIndex) {
          // Between price: 10-50
          price = price.split('-');
          // Order range price, it always must be smaller-bigger
          if (price[0] < price[1]) {
            filters.price = { $gte: price[0], $lte: price[1] };
          } else {
            filters.price = { $gte: price[1], $lte: price[0] };
          }
        }
      }

      const ads = await Ad.list(filters, start, limit, sort);

      return res.status(200).json({
        success: true,
        results: ads
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * POST /ads
 * Post a new ad
 *
 * https://localhost/api/v1/ads
 *  tag=mobile
 *  tags=lifestyle
 *  name=example
 *  price=1
 *  sale=true
 *  picture=file
 */
router.post(
  '/',
  [
    jwtAuth(),
    upload.single('picture'),
    // body('name').isAlphanumeric().withMessage('Must be alphanumeric'),
    body('sale')
      .isBoolean()
      .withMessage('Must be boolean'),
    body('price')
      .isNumeric()
      .withMessage('Must be numeric'),
    body('tags')
      .isIn(['work', 'lifestyle', 'motor', 'mobile'])
      .withMessage('Must be one of allow values. GET /tags to check them.')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const data = { ...req.body, picture: req.file.filename };
      const saveAd = await Ad.createRecord(data);

      res.status(201).json({ success: true, result: saveAd });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
