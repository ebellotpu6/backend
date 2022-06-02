const Order = require("./order.model");
const User = require("../user/user.model");

const findMany = async (request, response) => {
    try {
        const documents = await Order.find().lean().exec();
        response.status(200).json({result: documents});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const createOne = async (request, response) => {
    try {
        const newOrder = request.body;

        const document = await Order.create(newOrder);
        await User.findByIdAndUpdate({_id: newOrder.user_id}, {$push: {orders: document._id}});

        response.status(200).json({result: document});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const findOne = async (request, response) => {
    const { order_id } = request.params;
    try {
        const document = await Order.findById(order_id).lean().exec();
        if(!document) return response.status(404).json({error: "Not found"});
        response.status(200).json({result: [document]});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const updateOne = async (request, response) => {
    const { order_id } = request.params;
    const updatedOrder = request.body;
    if(updatedOrder.paid_at) updatedOrder.paid_at = new Date(updatedOrder.paid_at);
    console.log(updatedOrder);
    try {
        const document = await Order.findOneAndUpdate({ _id: order_id }, updatedOrder, { new: true });
        if(!document) return response.status(404).json({error: "Not found"});
        response.status(200).json({result: [document]});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const deleteOne = async (request, response) => {
    const { order_id } = request.params;
    try {
        const document = await Order.findOneAndDelete({ _id: order_id }, { new: true });
        
        await User.findOneAndUpdate({_id: document.user_id}, {$pull: {orders: order_id}});

        if(!document) return response.status(404).json({error: "Not found"});
        response.status(200).json({result: document});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

module.exports = {
    findMany,
    createOne,
    findOne,
    updateOne,
    deleteOne,
}