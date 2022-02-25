const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router 
    .route('/')
    .get(userController.getAllUsers)//because when we exports all function at once, they are imported in a object!
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;