const express = require('express');
const router = express.Router();
const { addAd, addValidator } = require('./addAd');
const deleteAd = require('./deleteAd');
const commentAd = require('./commentAd');
const getAds = require('./getAds');
const getComments = require('./getComments');

router.post('/', addValidator, addAd);
router.delete('/', deleteAd);
router.post('/comments', commentAd);
router.get('/:user_uuid', getAds);
router.get('/comments', getComments);

module.exports = router;