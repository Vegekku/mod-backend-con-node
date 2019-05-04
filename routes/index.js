const express = require('express');
const axios = require('axios');
const { renderResponse } = require('../lib/utils');

const router = express.Router();

const apiRoute = 'http://localhost:3000/api/v1/';

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

module.exports = router;
