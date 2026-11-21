const { Router } = require("express")
const { protect, adminOnly } = require("../middleware/auth")
const { addOrder } = require("../controller/order.controller")

const router = Router()

router.post("/add", protect, addOrder)

module.exports = router
