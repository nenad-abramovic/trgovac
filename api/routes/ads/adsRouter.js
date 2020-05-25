const express = require('express');
const router = express.Router();
const { addAd, addValidator } = require('./addAd');
const deleteAd = require('./deleteAd');
const commentAd = require('./commentAd');
const getAds = require('./getAds');
const getComments = require('./getComments');
const authenticateUser = require('./auth');

router.use(authenticateUser);

router.post('/', addValidator, addAd);
router.delete('/', deleteAd);
router.post('/comments', commentAd);
router.get('/', getAds);
router.get('/comments', getComments);

module.exports = router;