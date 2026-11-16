
const jwt = require("jsonwebtoken")

const authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({
                message: "Token mavjud emas"
            })
        }

        const accessToken = token.split(" ")[1]

        if (!accessToken) {
            return res.status(401).json({
                message: "Token noto'g'ri formatda"
            })
        }

        const decoded = jwt.verify(
            accessToken,
            process.env.SECRET_KEY
        )

        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Token yaroqsiz yoki muddati tugagan"
        })
    }
}

module.exports = authorization
