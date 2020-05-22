const express = require('express');
const router = express.Router();
const addAd = require('./addAd');
const deleteAd = require('./deleteAd');
const commentAd = require('./commentAd');
const getAds = require('./getAds');
const getComments = require('./getComments');

router.post('/', addAd);
router.delete('/', deleteAd);
router.post('/comments', commentAd);
router.get('/', getAds);
router.get('/comments', getComments);

module.exports = router;