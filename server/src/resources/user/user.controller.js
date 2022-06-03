const bcrypt = require("bcrypt");
const User = require("./user.model");
const Order = require("../order/order.model");

const findMany = async (request, response) => {
    try {
        const documents = await User.find().lean().exec();
        response.status(200).json({result: documents});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const validateInput = ({ dni, status, role, name, surname, email, phone, birthday, username, passwordHash }) => {
    let response = [];
    if(!dni) response.push("Missing or wrong 'dni' field.");
    if(!status) response.push("Missing or wrong 'status' field.");
    if(!role) response.push("Missing or wrong 'role' field.");
    if(!name) response.push("Missing or wrong 'name' field.");
    if(!surname) response.push("Missing or wrong 'surname' field.");
    if(!email) response.push("Missing or wrong 'email' field.");
    if(!phone) response.push("Missing or wrong 'phone' field.");
    if(!birthday) response.push("Missing or wrong 'birthday' field.");
    if(!birthday) response.push("Missing or wrong 'birthday' field.");
    if(!username) response.push("Missing or wrong 'username' field.");
    if(!passwordHash) response.push("Missing or wrong 'password' field.");
    return response;
}

const createOne = async (request, response) => {
    try {
        const newUser = request.body;

        //Validate input
        const validateResponse = validateInput(newUser);
        if(validateResponse.length) return response.status(400).json({ error: validateResponse });
        
        newUser.passwordHash = await bcrypt.hash(newUser.passwordHash, 10);
        const document = await User.create(newUser);
        response.status(200).json({result: document});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const findOne = async (request, response) => {
    const { user_id } = request.params;
    try {
        const document = await User.findById(user_id).lean().exec();
        if(!document) return response.status(404).json({error: "Not found"});
        response.status(200).json({result: [document]});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const updateOne = async (request, response) => {
    const { user_id } = request.params;
    const updatedUser = request.body;
    updatedUser.birthday = new Date(updatedUser.birthday);
    if(updatedUser.email_verified_at) updatedUser.email_verified_at = new Date(updatedUser.email_verified_at);
    console.log(updatedUser);
    try {
        const document = await User.findOneAndUpdate({ _id: user_id }, updatedUser, { new: true });
        if(!document) return response.status(404).json({error: "Not found"});
        response.status(200).json({result: [document]});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const deleteOne = async (request, response) => {
    const { user_id } = request.params;
    try {
        const document = await User.findOneAndDelete({ _id: user_id }, { new: true });
        if(!document) return response.status(404).json({error: "Not found"});
        response.status(200).json({result: document});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const findOrders = async (request, response) => {
    const { user_id } = request.params;
    try {
        const document = await User.findById(user_id).populate("orders", {_id: 0});
        if(!document) return response.status(404).json({error: "Not found"});
        response.status(200).json({result: [document]});
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
    findOrders,
}