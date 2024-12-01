require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const mongodbURI = process.env.MONGODB_URI
const port = process.env.PORT
const connectDB = require("./modals")
const errorHandling = require("./utils/erorrHandling")

if (!port) {
    throw new Error("Port is not defined in the env file")
}

if (!mongodbURI) {
    throw new Error("Invalid MongoDB URI")
}

connectDB(mongodbURI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use(errorHandling)

app.listen(port, () => console.log(`Server running on port ${port}`))
