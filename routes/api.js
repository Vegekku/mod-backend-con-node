'use strict';

const express = require('express');
const authController = require('./apiv1/authController');

const router = express.Router();

router.post('/authenticate', authController.post);
router.use(`/ads`, require('./apiv1/ads'));
router.use(`/tags`, require('./apiv1/tags'));

module.exports = router;
