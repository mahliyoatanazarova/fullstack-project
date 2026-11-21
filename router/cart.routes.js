const { Router } = require("express")
const { protect, adminOnly } = require("../middleware/auth")
const { sendCart, addCart, updateCart, removeFromCart, clearCart } = require("../controller/cart.controller")

const router = Router()

router.use(protect)

router.get("/send_cart", sendCart)
router.post("/add", addCart)
router.put("/update/:productId", updateCart)
router.delete("/remove/:productId", removeFromCart)
router.delete("/clear", clearCart)
module.exports = router