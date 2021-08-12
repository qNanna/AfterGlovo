const orderService = require("../controllers/orderService.ts")
const express = require('express')
const router = express.Router()

router.post("/newOrder", async (req, res) => {
    try{
        let json = orderService.oneWayOrder("https://api.glovoapp.com/b2b/orders")
        console.log(JSON.stringify(json))
    }
    catch(err) {
        res.json({err})
    }
})

module.exports = router