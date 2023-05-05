const express = require('express');
const res = require("express/lib/response")
const router = express.Router();
const fetch = require('node-fetch')
const DataUser = require("../model/DataUser")
const app = express()
const mongoose =require("mongoose")


// async function getText(url) {
                
//     let x = await fetch(url);
//     y = await x.json();
//     return y

// }
// router.get("/",async (req,res)=>{
//     // const DataTemperatures = await DataTemperature.find()
//     // res.json(DataTemperatures)
    
//     getText("https://io.adafruit.com/api/v2/tringuyennek/feeds/led").then(obj => res.json(obj))


// })
router.get("/",async (req,res)=>{
    const DataUsers = await DataUser.find()
    res.json(DataUsers)
})


module.exports = router;