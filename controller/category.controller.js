const Category = require("../model/category.model");



const getAllCategory = async (req, res) => {
    const categories = await Category.find()

    res.status(200).json(categories)
}

const addCategory = async (req, res) => {
    const category = await Category.create({
        name: req.body.name
    });

    res.status(201).json({
        message: "Category yaratildi"
    })
};
    
  


const updateCategory = async (req, res) => {
    const { title } = req.body
    const { id } = req.params

    const foundedCategory = await Category.findById(id)

    if(!foundedCategory) {
        return res.status(404).json({
            message: "Category topilmadi"
        })
    }

    await Category.findByIdAndUpdate(id, {title})

    
        return res.status(404).json({
            message: "Category o'zgartirildi"
        })
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    const foundedCategory = await Category.findById(id)

    if(!foundedCategory) {
        return res.status(404).json({
            message: "Category topilmadi"
        })
    }

    await Category.findByIdAndDelete(id)

    
        return res.status(404).json({
            message: "Category o'chirildi"
        })
    
}


module.exports = {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory
}