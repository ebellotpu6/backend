const Order = require("./order.model");

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
        if(newOrder.paid_at) newOrder.paid_at = new Date(newOrder.paid_at);
        const document = await Order.create(newOrder);
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
    if(newOrder.paid_at) newOrder.paid_at = new Date(newOrder.paid_at);
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