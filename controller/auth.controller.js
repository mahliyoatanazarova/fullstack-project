
const Auth = require("../model/auth.model")
const bcrypt = require("bcryptjs")
const sendEmail = require("../utils/send-email")
const jwt = require("jsonwebtoken")


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "username, email, password are required"
            })
        }

        const user = await Auth.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "Foydalanuvchi allaqachon mavjud"
            })
        }

        const randomNumber = Array.from(
            { length: 6 },
            () => Math.floor(Math.random() * 10)
        ).join("")

        await Auth.create({
            username,
            email,
            password: await bcrypt.hash(String(password), 10),
            otp: randomNumber,
            otpTime: Date.now() + 120000
        })

        await sendEmail(randomNumber, email)

        res.status(201).json({
            message: "Emailingizni tekshiring"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const verify = async (req, res) => {
    try {
        const { email, code } = req.body

        if (!email || !code) {
            return res.status(400).json({
                message: "Email va kod kiritilishi kerak"
            })
        }

        const user = await Auth.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "Foydalanuvchi topilmadi"
            })
        }

        if (user.otp !== String(code) || user.otpTime < Date.now()) {
            return res.status(400).json({
                message: "Kod xato yoki eskirgan"
            })
        }

        user.otp = null
        user.otpTime = null
        await user.save()

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: "10d" }
        )

        res.status(200).json({
            message: "Email muvaffaqiyatli tasdiqlandi",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email va parol kiritilishi kerak"
            })
        }

        const user = await Auth.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "Foydalanuvchi topilmadi"
            })
        }

        const comparePassword = await bcrypt.compare(
            String(password),
            user.password
        )

        if (!comparePassword) {
            return res.status(400).json({
                message: "Parol noto'g'ri"
            })
        }

        const randomNumber = Array.from(
            { length: 6 },
            () => Math.floor(Math.random() * 10)
        ).join("")

        user.otp = randomNumber
        user.otpTime = Date.now() + 120000
        await user.save()

        await sendEmail(randomNumber, email)

        res.status(200).json({
            message: "Emailingizga tasdiqlash kodi yuborildi"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    register,
    verify,
    login
}
