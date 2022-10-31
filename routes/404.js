const express = require('express');
const router = express.Router();
const notFoundController = require('./../controllers/404');

router.use(notFoundController);

module.exports = router;