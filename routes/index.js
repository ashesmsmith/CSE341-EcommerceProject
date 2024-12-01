const router = require("express").Router()
const orderRoute = require("./orderRoute")

router.get("/", (req, res) =>{
    res.send("Hello World")
})

router.use("/orders", orderRoute)
module.exports = router