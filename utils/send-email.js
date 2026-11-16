const nodemailer = require("nodemailer")

const sendEmail = async (code, email) => {
    
const nodemailer = require("nodemailer")

const sendEmail = async (code, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'mahliyoatanazarova1@gmail.com',
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            subject: "Shopping",
            from: process.env.USER,
            to: email,
            html: `<h2>Tasdiqlash kodi ${code}</h2>`
        })
    } catch(error) {
        console.log("Email xabar yuborishda xatolik: ", error.message);
    }
}
}

module.exports = sendEmail