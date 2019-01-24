'use strict';

const express = require('express');
const router = express.Router();
const Ad = require('../../models/Ad');

/**
 * GET /ads
 * Get list of ads
 * 
 * http://localhost:3001/api/v1/ads?start=1&limit=3&sort=name&tag=lifestyle
 * http://localhost:3001/api/v1/ads?tag=mobile&sale=false&name=ip&price=50-&start=0&limit=2&sort=price
 */
router.get('/', async (req, res, next) => {
    try {
        const tags = req.query.tag;
        const sale = req.query.sale;
        let price = req.query.price;
        const name = req.query.name;

        const filters = {};

        if (name) {
            filters.name = new RegExp('^'+ name, "i");
        }

        if (sale) {
            filters.sale = sale;
        }

        if (tags) {
            filters.tags = { $in: tags};
        }

        if (price) {
            const index = price.indexOf('-');
            const lastIndex = price.lastIndexOf('-');
            const priceLength = price.length - 1;

            if (index === -1) { // Equal to price: 50
                filters.price = price;
            } else if (index === 0) { // Less than price: -50
                filters.price = { $lte: price.substring(1) };
            } else if (index === priceLength) { // More than price: 10-
                filters.price = { $gte: price.substring(0,priceLength) };
            } else if (index === lastIndex) { // Between price: 10-50
                price = price.split('-');
                // Order range price, it always must be smaller-bigger 
                if (price[0] < price[1]) {
                    filters.price = { $gte: price[0], $lte: price[1] };
                } else {
                    filters.price = { $gte: price[1], $lte: price[0] };
                }
            }
        }

        const start = parseInt(req.query.start);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;

        const ads = await Ad.list(filters, start, limit, sort)

        res.json({
            success: true,
            results: ads
        });
    } catch (error) {
        next(error);
        return;
    }
});

/**
 * POST /tags
 * Post a new tag
 * 
 * http://localhost:3001/api/v1/ads
 *  tag=mobile
 *  tag=lifestyle
 *  name=example
 *  price=1
 *  sale=true
 *  picture=file
 */
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        let ad = null;

        // TODO Crear un nuevo elemento Ad

        res.json({
            success: true,
            results: ad
        });
    } catch (error) {
        next(error);
        return;
    }
});

module.exports = router;