// const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// router.get('/add-exp', expController.getAddUser);

router.post('/signup', userController.signup);

// router.delete('/delete-exp/:expId', expController.postDeleteUser)

// router.post('/edit-exp/:expId', expController.postEditUser)

module.exports = router;