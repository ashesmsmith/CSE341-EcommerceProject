const router = require("express").Router()
const orderRoute = require("./orderRoute")
const userRoute = require("./userRoute")

router.get("/", (req, res) =>{
    res.send("Hello World")
})

router.use("/orders", orderRoute)

router.use("/users", userRoute)

module.exports = router