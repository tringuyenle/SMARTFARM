
const DataServer = require("../model/DataServer")
const path=require('path')
const formpath = path.resolve(__dirname,'../../')
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const router = express.Router();
const mongoose =require("mongoose")

const dbConn = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")
app.get("/",async (req,res)=>{
        const DataServers = await DataServer.find()
        res.json(DataServers)
    })
    
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));


app.use(express.static(formpath))
module.exports = app;