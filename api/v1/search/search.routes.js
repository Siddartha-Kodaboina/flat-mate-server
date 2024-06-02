const express = require('express');
const router = express.Router();
const searchController = require('./search.controller');

router.get('/', searchController.searchCommunities);

module.exports = router;
