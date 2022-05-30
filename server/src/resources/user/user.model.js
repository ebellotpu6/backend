const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        dni:  {
            type: String,
            required: true,
            unique: true,
            maxlength: 9,
        },
        status:  {
            type: Number,
            required: true,
            default: 0,
        },
        role:  {
            type: Number,
            required: true,
            default: 0,
        },
        name:  {
            type: String,
            required: true,
            maxlength: 50,
        },
        surname:  {
            type: String,
            required: true,
            maxlength: 50,
        },
        email:  {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
        },
        phone:  {
            type: Number,
            required: true,
            maxlength: 9,
        },
        birthday:  {
            type: Date,
            required: true,
        },
        password:  {
            type: String,
            required: true,
            maxlength: 50,
        },
        email_verified_at:  {
            type: Date,
            default: null,
        }
    },
    { timestamps: true }
);


const User = mongoose.model('user', userSchema);

module.exports = User;