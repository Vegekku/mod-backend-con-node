const express = require('express');

const router = express.Router();

router.get('/:locale', (req, res, next) => {
  const { locale } = req.params;
  const backTo = req.get('referer');

  // establish cookie to 20 days
  res.cookie('nodepop-lang', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  res.redirect(backTo);
});

module.exports = router;
