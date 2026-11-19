const express = require("express");
const router = express.Router();

const { addProduct, getAllProducts, updateProduct, deleteProduct } = require("../controller/products.controller");
const uploads = require("../middleware/upload");



router.get("/get_all", getAllProducts)
router.post("/add", uploads.single("image") ,addProduct);
router.put("/update/:id", uploads.single("image"),updateProduct)
router.delete("/deleted/:id",  deleteProduct)


module.exports = router;