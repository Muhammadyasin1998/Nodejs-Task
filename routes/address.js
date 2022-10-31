const express = require('express');
const router = express.Router();
const addressController = require('./../controllers/address');

router.get('/I/want/title/', addressController);

module.exports = router;