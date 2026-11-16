require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRouter = require("./router/auth.routes")
const categoryRouter = require("./router/category.routes")

const app = express()
app.use(cors())
const POST = process.env.POST || 300


// router
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/category", categoryRouter)

connectDB()

app.listen(POST, () => {
    console.log("Server is running at: " + POST);
})