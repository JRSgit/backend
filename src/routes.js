'use strict'
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const router = express.Router();

const _boxCtrl = require('./controlers/BoxControle');
const _fileCtrl = require('./controlers/FileControle');

router.get('/boxes/:id', _boxCtrl.show);
router.post('/boxes', _boxCtrl.store);
router.post('/boxes/:id/files', multer(multerConfig).single('file'), _fileCtrl.store);


module.exports = router;