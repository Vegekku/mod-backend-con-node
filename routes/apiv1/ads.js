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
        // TODO Lista de anuncios paginada. Con filtros por tag, tipo de anuncio (venta o búsqueda),rango de precio (precio min. y precio max.) y nombre de artículo (que empiece por eldato buscado)
        const tag = req.query.tag;
        const sale = req.query.sale;
        const price = req.query.price;
        const name = req.query.name;

        const ads = await Ad.find().exec();

        res.json({
            success: true,
            results: ads
        });
    } catch (error) {
        next(error);
        return;
    }
});

module.exports = router;