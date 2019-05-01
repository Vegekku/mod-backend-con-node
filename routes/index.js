const express = require('express');
const axios = require('axios');
const { renderResponse } = require('../lib/utils');

const { LOCALHOST, API_ROUTE } = process.env;

const router = express.Router();

const apiRoute = LOCALHOST + API_ROUTE || 'https://localhost:3001/api/v1/';

/* GET home page. */
router.get('/', (req, res, next) => {
  const search = req._parsedUrl.search ? req._parsedUrl.search : '';
  axios
    .get(`${apiRoute}ads${search}`)
    .then(httpResponse => {
      const { data } = httpResponse;
      if (data.success === true) {
        renderResponse(res, 'index', {
          ads: data.results
        });
      } else {
        renderResponse(res, 'index', {
          ads: null
        });
      }
    })
    .catch(err => {
      console.error('There was an error', err);
      renderResponse(res, 'index', {
        ads: null
      });
    });
});

router.get('/change-lang/:locale', (req, res, next) => {
  const { locale } = req.params;
  const backTo = req.get('referer');

  // establish cookie to 20 days
  res.cookie('nodepop-lang', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  res.redirect(backTo);
});

module.exports = router;
