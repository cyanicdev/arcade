const express = require('express');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');

const router = express.Router();

router.get('/status', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
});

router.post('/createuser', asyncMiddleware(async (req, res, next) => {
    await UserModel.create(req.query);
    res.status(200).json({ 'status': 'ok' });
}));

router.post('/connect', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
});

router.post('/token', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
});

module.exports = router;