const controller = require('../controllers/controller');
const api = require('../api-client');
const express = require('express');
const router = express.Router();

const verifyToken = (req, res, next) => {
  req.token = req.headers.authorization.split(' ')[1];
  next();
}

router.get('/tokens', controller.getTokens);
router.get('/login', controller.getAccess);
router.get('/refresh_token', verifyToken, controller.refreshTokens);
router.get('/playlist/:id', controller.getPlaylist);
router.put('/setplay/:playlist', verifyToken, controller.setPlay);
router.get('/userdata', verifyToken, controller.getUserData);
router.put('/transfer/:deviceId', verifyToken, controller.transferPlayback);

// THESE TWO ARE USED FOR DATABASE SEEDING
// router.get('/spotify/:id',api.getPlaylist);
// router.post('/seed', controller.saveSongs);

module.exports = router;
