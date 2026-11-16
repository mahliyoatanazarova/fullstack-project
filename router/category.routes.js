const { Router } = require("express")
const { getAllCategory, addCategory, updateCategory, deleteCategory } = require("../controller/category.controller")

const router = Router()

router.get("/get_all", getAllCategory)
router.post("/add", addCategory)
router.put("/update/:id", updateCategory)
router.delete("delete/:id", deleteCategory)

module.exports = router