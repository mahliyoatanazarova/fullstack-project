
// const jwt = require("jsonwebtoken")

// const authorization = (req, res, next) => {
//     try {
//         const token = req.headers.authorization



//         if (!token) {
//             return res.status(401).json({
//                 message: "Token mavjud emas"
//             })
//         }

//         const accessToken = token.split(" ")[1]

//         if (!accessToken) {
//             return res.status(401).json({
//                 message: "Token noto'g'ri formatda"
//             })
//         }

//         const decoded = jwt.verify(
//             accessToken,
//             process.env.SECRET_KEY
//         )

//         req.user = decoded

//         next()

//     } catch (error) {
//         return res.status(401).json({
//             message: "Token yaroqsiz yoki muddati tugagan"
//         })
//     }
// }

// module.exports = authorization

const jwt = require("jsonwebtoken")

const protect = async(req,res,next)=>{
    const authorization = req.headers.authorization


    if (!authorization){
        return res.status(400).json({
            message:" Token topilmadi "
        })
    }


          const token = authorization.split(" ")[1]

    if (authorization.split(" ")[0] !== "Bearer"||!token){
        return res.status(400).json({
            message:"Bearer yoki token topilmadi "
        })
    }

try {
    
} catch (error) {
    const decode= jwt.verify(token,  process.env.SECRET_KEY)
    req.user = decode
    res.status(500).json({
        message:error.message
    })
}
   next()
}
////////////////////////////////////////////


const adminOnly = async(req,res,next)=>{

    if (req.user.role !== "admin"){
        return res.status(403).json({
            message:"Siz admin emassiz!"
        })
    }
   next()
}


module.exports={
    protect,
    adminOnly
}