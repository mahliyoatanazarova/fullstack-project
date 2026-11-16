const { Router } = require("express")
const { register, verify, login } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")

const router = Router()

router.post("/register", register)
router.post("/verify", verify)
router.post("/login", login)

router.get("/profile", authorization, (req, res) => {
    res.status(200).json({
        message: "Siz tizimga muvaffaqiyatli kirdingiz",
        user: req.user
    })
})

module.exports = router