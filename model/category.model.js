const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;