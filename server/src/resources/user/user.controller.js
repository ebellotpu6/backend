const User = require("./user.model");

const findMany = async (request, response) => {
    try {
        const documents = await User.find().lean().exec();
        response.status(200).json({result: documents});
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
}

const createOne = async (request, response) => {
    try {
        const newUser = request.body;
        newUser.birthday = new Date(newUser.birthday);
        if(newUser.email_verified_at) newUser.email_verified_at = new Date(newUser.email_verified_at);
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

module.exports = {
    findMany,
    createOne,
    findOne,
    updateOne,
    deleteOne,
}