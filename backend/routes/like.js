const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like')

router.get('/:idPost/:idUser',likeCtrl.getLikesByUserAndPost)

module.exports = router;