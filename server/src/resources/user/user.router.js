const { Router } = require('express');

const userController = require('./user.controller');

const userExtractor = require("../../middleware/userExtractor");

const router = Router();

router.route("/")
    .get(userController.findMany)
    .post(userController.createOne);

router.route("/:user_id")
    .get(userController.findOne)
    .put(userExtractor, userController.updateOne)
    .delete(userExtractor, userController.deleteOne);

router.route("/:user_id/orders")
    .get(userController.findOrders);

module.exports = router;