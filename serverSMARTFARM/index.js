const express = require("express")
const app = express()
const mongoose =require("mongoose")
const bodyparser = require("body-parser")
const Request = require('request');
const fetch = require('node-fetch')
const DataSoilmoisturetRoute = require("./routes/DataSoilmoistures")
const DatalightRoute = require("./routes/Datalights")
const DataTemperutareRoute = require("./routes/DataTemperatures")
const DataHumidityRoute = require("./routes/DataHumiditys")
const path=require('path')
const publicpath=path.join(__dirname,'../')

const connectDB = async () => {
        const ketnoi = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")
        console.log("Da ket noi")

}

app.use(bodyparser.json())

app.use('/Datalights',DatalightRoute)
app.use('/DataTemperatures',DataTemperutareRoute)
app.use('/DataHumiditys',DataHumidityRoute)
app.use('/DataSoilmoistures',DataSoilmoisturetRoute)


//connect mongo
app.use(express.static(publicpath))
app.listen(3000,()=>{
       connectDB()
});

