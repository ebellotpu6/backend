const { Router } = require('express');

const loginController = require('./login.controller');

const router = Router();

router.route("/")
    .post(loginController.login);



module.exports = router;