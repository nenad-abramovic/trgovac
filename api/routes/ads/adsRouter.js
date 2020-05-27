const express = require('express');
const router = express.Router();
const { addAd, addAdValidator } = require('./addAd');
const { deleteAdValidation, deleteAd} = require('./deleteAd');
const { newCommentValidation, commentAd} = require('./commentAd');
const { adsValidation, getAds} = require('./getAds');
const { commentsValidation, getComments } = require('./getComments');

router.post('/', addAdValidator, addAd);
router.delete('/', deleteAdValidation, deleteAd);
router.post('/comments', newCommentValidation, commentAd);
router.get('/', adsValidation, getAds);
router.get('/comments', commentsValidation, getComments);

module.exports = router;