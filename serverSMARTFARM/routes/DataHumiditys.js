const express = require('express');
const res = require("express/lib/response")
const router = express.Router();
const fetch = require('node-fetch')
const DataHumidity = require("../model/DataHumidity")
const app = express()
const mongoose =require("mongoose")
const delay = require('delay');


// async function getText(url) {
                
//     let x = await fetch(url);
//     y = await x.json();
//     return y

// }
// router.get("/",async (req,res)=>{
//     // const DataHumiditys = await DataHumidity.find()
//     // res.json(DataHumiditys)
    
//     getText("https://io.adafruit.com/api/v2/tringuyennek/feeds/led").then(obj => res.json(obj))


// })

async function getDataHumidity(){
    while(true){
        try{
            const myDataHumidity = await fetch("https://io.adafruit.com/api/v2/tringuyennek/feeds/do-am-khong-khi")
            //const myDataHumidity = await fetch("https://www.facebook.com/")
            const res = await myDataHumidity.json()
            const DataHumiditys = await DataHumidity.find()
            lengthDataHumidity = DataHumiditys.length
            if(lengthDataHumidity==0){

                console.log(res['updated_at'])
                console.log(res['last_value'])
                const dataHumidity = new DataHumidity({
                    ID_Humidity_senser: "HSS1",
                    Name_Humidity_sensor: "Humidity_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                dataHumidity.save()
            }
            else if((DataHumiditys[lengthDataHumidity-1]['End_time'] != res['updated_at'])  ){
                if(lengthDataHumidity != 0){
                    console.log(DataHumiditys[lengthDataHumidity-1]['End_time'])
                }
                
                console.log(res['updated_at'])
                console.log(res['last_value'])
                const dataHumidity = new DataHumidity({
                    ID_Humidity_senser: "HSS1",
                    Name_Humidity_sensor: "Humidity_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                dataHumidity.save()
                console.log("Do dai cua data DataHumidity:" ,lengthDataHumidity)
            }
        }
        catch (e) { }
    }
    
}

getDataHumidity()

module.exports = router;