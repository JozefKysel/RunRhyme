const express = require('express');
const router = express.Router();
const auth = require('../authorization/authorization');
const api = require('../api-client');
const controller = require('../controllers/controller');

const verifyToken = (req, res, next) => {
  req.token = req.headers.authorization.split(' ')[1];
  next();
}

router.get('/playlist/:id', controller.getPlaylist);
router.get('/tokens', auth.getTokens);
router.get('/login', auth.getAccess);
router.get('/refresh_token', verifyToken, auth.refreshTokens);
router.put('/setplay/:playlist', verifyToken, api.setPlay);
router.get('/userdata', verifyToken, api.getUserData);
router.put('/transfer/:deviceId', verifyToken, api.transferPlayback);

// THIS IS NOT NEEDED
// router.delete('/delete', controller.deleteSong);
// router.post('/save', controller.saveSong);
// THESE TWO ARE USED FOR DATABASE SEEDING
// router.get('/spotify/:id',api.getPlaylist);
// router.post('/seed', controller.saveSongs);

module.exports = router;
