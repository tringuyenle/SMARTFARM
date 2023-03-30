const express = require('express');
const res = require("express/lib/response")
const router = express.Router();
const fetch = require('node-fetch')
const Datalight = require("../model/Datalight")
const app = express()
const mongoose =require("mongoose")
const delay = require('delay');

// async function getText(url) {
                
//     let x = await fetch(url);
//     y = await x.json();
//     return y

// }
router.get("/",async (req,res)=>{
     const Datalights = await Datalight.find()
     res.json(Datalights)
})

async function getDatalight(){
    while(true){
        try{
            const myDatalight = await fetch("https://io.adafruit.com/api/v2/tringuyennek/feeds/anh-sang")
            const res = await myDatalight.json()
            const Datalights = await Datalight.find()
            lengthDatalight = Datalights.length
            if(lengthDatalight==0){

                console.log(res['updated_at'])
                console.log(res['last_value'])
                const datalight = new Datalight({
                    ID_Light_senser: "LSS1",
                    Name_Light_sensor: "Light_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                datalight.save()
            }
            else if((Datalights[lengthDatalight-1]['End_time'] != res['updated_at'])  ){
                if(lengthDatalight != 0){
                    console.log(Datalights[lengthDatalight-1]['End_time'])
                }
                
                console.log(res['updated_at'])
                console.log(res['last_value'])
                const datalight = new Datalight({
                    ID_Light_senser: "LSS1",
                    Name_Light_sensor: "Light_sensor1",
                    Status : "",
                    Value : res['last_value'],
                    Start_time: res['created_at'],
                    End_time: res['updated_at']
                })

                datalight.save()
                console.log("Do dai cua data Datalight:" ,lengthDatalight)
            }
        }
        catch (e) { }
    }
    
}

getDatalight()

module.exports = router;