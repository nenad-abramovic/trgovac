const express = require('express');
const router = express.Router();
const { addAd, addValidator } = require('./addAd');
const deleteAd = require('./deleteAd');
const commentAd = require('./commentAd');
const { adsValidation, getAds} = require('./getAds');
const { commentsValidation, getComments } = require('./getComments');

router.post('/', addValidator, addAd);
router.delete('/', deleteAd);
router.post('/comments', commentAd);
router.get('/', adsValidation, getAds);
router.get('/comments', commentsValidation, getComments);

module.exports = router;