const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
       
    },
    description:{
      type:String,
      required: true,
        trim: true,
    },
    price:{
      type:Number,
      required: true,
        min:1,
        default:1000
    },
    inStock:{
       type:Number,
      required: true,
        min:1,  
    },
    image:{
     type:String,
      required: true,
    },
    category:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"category",
      required: true,
    }
}, 
{
    timestamps: true,
    versionKey: false
},
)

module.exports = mongoose.model("product", productModel)