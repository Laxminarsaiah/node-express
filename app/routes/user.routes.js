module.exports = app => {
    var router = require("express").Router();
    const { check } = require('express-validator');
    const user = require("../controllers/user.controller.js");
    router.post('/', [
        check('username').exists().withMessage('Username cannot be empty!!!'),
        check('password').exists().withMessage('Password cannot be empty!!!'),
        check('firstname').exists().withMessage('firstname cannot be empty!!!'),
        check('lastname').exists().withMessage('lastname cannot be empty!!!'),
        check('email').exists().withMessage('email cannot be empty!!!'),
        check('phone').exists().withMessage('phone cannot be empty!!!')
    ], user.createUser);

    // Get user by username
    router.post("/login", [
        check('username').exists().withMessage('Username cannot be empty!!!'),
        check('password').exists().withMessage('Password cannot be empty!!!')],user.login);

    // Get user by username
    router.get("/", user.findUser);

    // update user
    router.put("/:id", user.updateUser);

    // delete user
    router.delete("/:id", user.deleteUser);

    app.use('/api/user', router);
}