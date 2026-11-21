const { Router } = require("express")
const { protect, adminOnly } = require("../middleware/auth")
const { sendCart, addCart } = require("../controller/cart.controller")

const router = Router()

router.use(protect)

router.get("/send_cart", sendCart)
router.post("/add", addCart)
module.exports = router