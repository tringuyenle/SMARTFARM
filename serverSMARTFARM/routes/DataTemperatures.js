const express = require('express');
const res = require("express/lib/response")
const router = express.Router();
const fetch = require('node-fetch')
const DataTemperature = require("../model/DataTemperature")
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
    const DataTemperatures = await DataTemperature.find()
    res.json(DataTemperatures)
})

async function getDataTemperature(){
        try{
            const myDataTemperature = await fetch("https://io.adafruit.com/api/v2/tringuyennek/feeds/nhiet-do")
            const res = await myDataTemperature.json()
            const DataTemperatures = await DataTemperature.find()
            lengthDataTemperature = DataTemperatures.length
            if(lengthDataTemperature==0){

                console.log(res['updated_at'])
                console.log(res['last_value'])
                const dataTemperature = new DataTemperature({
                    ID_Temperature_senser: "TSS1",
                    Name_Temperature_sensor: "Tempurature_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                dataTemperature.save()
            }
            else if((DataTemperatures[lengthDataTemperature-1]['End_time'] != res['updated_at'])  ){
                if(lengthDataTemperature != 0){
                    console.log(DataTemperatures[lengthDataTemperature-1]['End_time'])
                }
                
                console.log(res['updated_at'])
                console.log(res['last_value'])
                const dataTemperature = new DataTemperature({
                    ID_Temperature_senser: "TSS1",
                    Name_Temperature_sensor: "Tempurature_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                dataTemperature.save()
                console.log("Do dai cua data DataTemperature:" ,lengthDataTemperature)
            }
        }
        catch (e) { }
    
    
}
setInterval(function () {getDataTemperature()}, 10000);


module.exports = router;