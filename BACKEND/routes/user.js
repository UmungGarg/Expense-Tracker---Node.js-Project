// const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/sendmail', userController.mail);

// router.delete('/delete-exp/:expId', expController.postDeleteUser)

// router.post('/edit-exp/:expId', expController.postEditUser)

module.exports = router;