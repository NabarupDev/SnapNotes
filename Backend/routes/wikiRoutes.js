const express = require('express');
const { getWikipediaContent } = require('../controllers/wikiController');

const router = express.Router();

router.get('/:topic', getWikipediaContent);

module.exports = router;
