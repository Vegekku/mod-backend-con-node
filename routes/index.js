var express = require('express');
const axios = require('axios');
var router = express.Router();

const apiRoute = 'http://localhost:3001/api/v1/';

/* GET home page. */
router.get('/', function(req, res, next) {
  const search = req._parsedUrl.search ? req._parsedUrl.search : '';

  axios.get(apiRoute+'ads'+search).then( httpResponse => {
    const data = httpResponse.data;
    if (data.success === true) {
      renderResponse(res, 'index', {
        ads: data.results
      });
    } else {
      renderResponse(res, 'index', {
        ads: null
      });
    }
  }).catch(err => {
    console.log('There was an error', err);
    renderResponse(res, 'index', {
      ads: null
    });
  });
});

module.exports = router;

function renderResponse(res, view, data) {
  res.render(view, data);
}