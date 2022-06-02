const mongoose = require("mongoose");
const { Schema } = mongoose;

const lineItemsSchema = new Schema(
    {
        variant_id:  {
            type: Schema.Types.ObjectId,
            required: true,
        },
        quantity:  {
            type: Number,
            required: true,
            default: 0,
        },
        subtotal: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    { timestamps: true }
);

const orderSchema = new Schema(
    {
        order_number:  {
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
        user_id:  {
            type: Schema.Types.ObjectId, 
            ref: 'user',
            required: true,
        },
        user_comment:  {
            type: String,
            maxlength: 50,
            default: null,
        },
        delivery_method:  {
            type: String,
            required: true,
        },
        billing_address:  {
            type: String,
            required: true,
        },
        delivery_address:  {
            type: String,
            required: true,
        },
        line_items: {
            type: [lineItemsSchema],
            default: undefined
        },
        subtotal:  {
            type: Number,
            required: true,
            default: 0,
        },
        total:  {
            type: Number,
            required: true,
            default: 0,
        },
        payment_method:  {
            type: String,
            required: true,
        },
        payment_info:  {
            type: String,
            required: true,
        },
        paid_at:  {
            type: Date,
            default: null,
        }
    },
    { timestamps: true }
);

const Order = mongoose.model('order', orderSchema);

module.exports = Order;