const { Router } = require('express');

const userController = require('./order.controller');

const router = Router();

router.route("/")
    .get(userController.findMany)
    .post(userController.createOne);

router.route("/:order_id")
    .get(userController.findOne)
    .put(userController.updateOne)
    .delete(userController.deleteOne);



module.exports = router;