const mongoose = require("mongoose");

const cartModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        required: true,
        unique: true
    },
    items:[
        {
            product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
            },
            quantity:{
            type:Number,
            req:true,
            min:1
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

const Category = mongoose.model("cart", cartModel);

module.exports = cartModel;