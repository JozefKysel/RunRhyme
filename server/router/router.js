const express = require('express');
const router = express.Router();
const auth = require('../authorization/authorization');
const api = require('../api-client');
const controller = require('../controllers/controller');

router.get('/playlist/:id', controller.getPlaylist);
router.delete('/delete', controller.deleteSong);
router.post('/save', controller.saveSong);
router.get('/refresh_token', auth.refreshTokens);
router.get('/tokens', auth.getTokens);
router.get('/login', auth.getAccess);
router.put('/setplay/:playlist', api.setPlay);
router.get('/userdata', api.getUserData);
router.put('/transfer/:deviceId', api.transferPlayback);

// THESE TWO ARE USED FOR DATABASE SEEDING
// router.get('/spotify/:id',api.getPlaylist);
// router.post('/seed', controller.saveSongs);

module.exports = router;
