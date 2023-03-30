const express = require('express');
const res = require("express/lib/response")
const router = express.Router();
const fetch = require('node-fetch')
const DataSoilmoisture = require("../model/DataSoilmoisture")
const app = express()
const mongoose =require("mongoose")
const delay = require('delay');

// async function getText(url) {
                
//     let x = await fetch(url);
//     y = await x.json();
//     return y

// }
// router.get("/",async (req,res)=>{
//     // const DataSoilmoistures = await DataSoilmoisture.find()
//     // res.json(DataSoilmoistures)
    
//     getText("https://io.adafruit.com/api/v2/tringuyennek/feeds/led").then(obj => res.json(obj))


// })
router.get("/",async (req,res)=>{
    const DataSoilmoistures = await DataSoilmoisture.find()
    res.json(DataSoilmoistures)
})

async function getDataSoilmoisture(){
    while(true){
        try{
            const myDataSoilmoisture = await fetch("https://io.adafruit.com/api/v2/tringuyennek/feeds/do-am-dat")
            const res = await myDataSoilmoisture.json()
            const DataSoilmoistures = await DataSoilmoisture.find()
            lengthDataSoilmoisture = DataSoilmoistures.length
            if(lengthDataSoilmoisture==0){

                console.log(res['updated_at'])
                console.log(res['last_value'])
                const dataSoilmoisture = new DataSoilmoisture({
                    ID_Soilmoisture_senser: "SSS1",
                    Name_Soilmoisture_sensor: "Soilmoisturet_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                dataSoilmoisture.save()
            }
            else if((DataSoilmoistures[lengthDataSoilmoisture-1]['End_time'] != res['updated_at'])  ){
                if(lengthDataSoilmoisture != 0){
                    console.log(DataSoilmoistures[lengthDataSoilmoisture-1]['End_time'])
                }
                
                console.log(res['updated_at'])
                console.log(res['last_value'])
                const dataSoilmoisture = new DataSoilmoisture({
                    ID_Soilmoisture_senser: "LSS1",
                    Name_Soilmoisture_sensor: "Soilmoisture_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                dataSoilmoisture.save()
                console.log("Do dai cua data DataSoilmoisture:" ,lengthDataSoilmoisture)
            }
        }
        catch (e) { }
    }
    
}

getDataSoilmoisture()

module.exports = router;