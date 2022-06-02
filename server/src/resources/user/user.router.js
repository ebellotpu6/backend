const { Router } = require('express');

const userController = require('./user.controller');

const router = Router();

router.route("/")
    .get(userController.findMany)
    .post(userController.createOne);

router.route("/:user_id")
    .get(userController.findOne)
    .put(userController.updateOne)
    .delete(userController.deleteOne);

router.route("/:user_id/orders")
    .get(userController.findOrders);

module.exports = router;