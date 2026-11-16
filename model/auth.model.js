const mongoose = require("mongoose");

const authModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username kiritilishi kerak"],
        trim: true,
        minLength: [3, "Kamida 3 ta xarf bolishi kerak"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 12,
        unique: true
    },
     password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "{VALUES} bunday qiymat qabul qilinmaydi"
        },
        default: "user"
    },
    otp: {
        type: String,
        minLength: 6,
    },
    otpTime: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true,
    versionKey: false
},)

module.exports = mongoose.model("user", authModel)