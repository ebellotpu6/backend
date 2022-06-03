const { Router } = require('express');

const userController = require('./order.controller');

const userExtractor = require("../../middleware/userExtractor");

const router = Router();

router.route("/")
    .get(userController.findMany)
    .post(userExtractor, userController.createOne);

router.route("/:order_id")
    .get(userController.findOne)
    .put(userExtractor, userController.updateOne)
    .delete(userExtractor, userController.deleteOne);

module.exports = router;