const express = require('express');
const artistsController = require('../controllers/artistsController');
const loginController = require('../controllers/loginController');
const router = express.Router();


router.get('/login', loginController.login);

router.get('/logout', artistsController.logout);

router.get('/artists/', artistsController.getAll);

router.post('/artists/add', artistsController.add)

router.post('/artists/remove/:artistId', artistsController.remove);

router.post('/artists/search', artistsController.search);


module.exports = router;
