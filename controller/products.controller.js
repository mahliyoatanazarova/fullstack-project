const productsModel = require("../model/product.model")
const categoryModel = require("../model/category.model")
const { getAllCategory } = require("./category.controller")
const { populate } = require("../model/auth.model")
const fs = require("fs")
const path = require("path")

const deleteImage = (image) => {
    return fs.unlink(path.join(__dirname, "..uploads", (image.split("/")[image.split("/").lenght - 1]), () => { }))
}
const getAllProducts = async (req, res) => {
    const { title } = req.query

    const products = await (await productsModel.find({ title: { $regex: title ? title:"", $options: "i" } })
    .populate("category", "title"))
    .sorte({ createAt: -1 })


    res.json(getAllProducts)
}

const addProduct = async (req, res) => {
    const { title, description, price, inStock, category } = req.body
    const image = req.file ? `http://localhost:4001/uploads/${req.file.filename}` : ""


    try {
        const foundedCategory = await categoryModel.findById(category)
        if (!foundedCategory) {
            return res.status(404).json({
                message: "Category topilmadi"
            })
        }


        await productsModel.create({
            title,
            description,
            price,
            inStock,
            category,
            image
        })

        return res.status(201).json({
            message: "Category qo'shilli"
        })
    } finally {
        if (res.statusCode !== 201) deleteImage(image)
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { title, description, price, inStock, category } = req.body
    const image = req.file ? `http://localhost:4001/uploads/${req.file.filename}` : ""


    let saved = false
    // try {
        const foundedProduct = await productsModel.findById(id)

        if (!foundedProduct) {
            return res.status(404).json({
                message: "Mahsulot topilmadi"
            })
        }

        const oldImage = foundedProduct.image
        if (title !== undefined) foundedProduct.title = title
        if (description !== undefined) foundedProduct.description = description
        if (price !== undefined) foundedProduct.price = price
        if (inStock !== undefined) foundedProduct.inStock = inStock
        if (category !== undefined) foundedProduct.category = category

        if (image) foundedProduct.image = image
              
        

        await foundedProduct.save()
         saved = true
    // } finally {
      if (saved)deleteImage(oldImage)
        res.json({
    message:"Mahsulot ozgardi"
    })
    // }
};
const deleteProduct= async(req,res)=>{
    const { id } = req.params
 const foundedProduct = await productsModel.findById(id)

        if (!foundedProduct) {
            return res.status(404).json({
                message: "Mahsulot topilmadi"
            })
        }

        await productsModel.findByIdAndDelete(id)
     deleteImage(foundedProduct.image);
     res.json({
        message:"Mahsulot ochirildi"
     })
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}