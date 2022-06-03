const jwt = require("jsonwebtoken");
const Order = require("./order.model");
const User = require("../user/user.model");
require("dotenv").config();

const findMany = async (request, response) => {
    try {
        const documents = await Order.find().lean().exec();
        response.status(200).json({result: documents});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const validateInput = ({ order_number, status, user_id, delivery_method, billing_address, delivery_address, subtotal, total, payment_method, payment_info }) => {
    let response = [];
    if(!order_number) response.push("Missing or wrong 'order_number' field.");
    if(!status) response.push("Missing or wrong 'status' field.");
    if(!delivery_method) response.push("Missing or wrong 'delivery_method' field.");
    if(!billing_address) response.push("Missing or wrong 'billing_address' field.");
    if(!delivery_address) response.push("Missing or wrong 'delivery_address' field.");
    if(!subtotal) response.push("Missing or wrong 'subtotal' field.");
    if(!total) response.push("Missing or wrong 'total' field.");
    if(!payment_method) response.push("Missing or wrong 'payment_method' field.");
    if(!payment_info) response.push("Missing or wrong 'payment_info' field.");
    return response;
}

const createOne = async (request, response, next) => {
    try {
        const newOrder = request.body;
        //Get UserExtractor
        newOrder.user_id = request.user_id;

        //Validate input
        const validateResponse = validateInput(newOrder);
        if(validateResponse.length) return response.status(400).json({ error: validateResponse });

        const document = await Order.create(newOrder);
        await User.findByIdAndUpdate({_id: newOrder.user_id}, {$push: {orders: document._id}});

        response.status(201).json({result: document});
    } catch (error) {
        next(error);
    }
}

const findOne = async (request, response, next) => {
    const { order_id } = request.params;
    try {
        const document = await Order.findById(order_id).lean().exec();
        if(!document) return response.status(404).json({error: `Not found an order with ID: ${order_id}`});
        response.status(200).json({result: [document]});
    } catch (error) {
        next(error);
    }
}

const updateOne = async (request, response, next) => {
    const { order_id } = request.params;
    const updatedOrder = request.body;
    if(updatedOrder.user_id) return response.status(404).json({error: `The field USER_ID can't be modified.`});
    try {
        const document = await Order.findOneAndUpdate({ _id: order_id }, updatedOrder, { new: true });
        if(!document) return response.status(404).json({error: `Not found an order with ID: ${order_id}`});
        response.status(200).json({result: [document]});
    } catch (error) {
        next(error);
    }
}

const deleteOne = async (request, response, next) => {
    const { order_id } = request.params;
    try {
        const document = await Order.findOneAndDelete({ _id: order_id }, { new: true });
        if(!document) return response.status(404).json({error: `Not found an order with ID: ${order_id}`});
        await User.findOneAndUpdate({_id: document.user_id}, {$pull: {orders: order_id}});
        response.status(200).json({result: document});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    findMany,
    createOne,
    findOne,
    updateOne,
    deleteOne,
}