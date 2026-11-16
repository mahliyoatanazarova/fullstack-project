const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        unique: true
    }
}, 
{
    timestamps: true,
    versionKey: false
},
)

module.exports = mongoose.model("category", categoryModel)