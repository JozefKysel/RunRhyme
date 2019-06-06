const express = require('express');
const router = express.Router();
const auth = require('../authorization/authorization');
const api = require('../api-client');

router.get('/login', auth.getAccess);
router.get('/playlist', api.getPlaylist);
router.get('/tokens', auth.getTokens);

module.exports = router;
