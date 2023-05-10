
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
app.post("/", async function (req, res){

    try {
            list=[
                {Name: "Máy bơm",
                LinkAPI: req.body.api0
                },
                {Name: "Ánh sáng",
                LinkAPI: req.body.api1
                },
                {Name: "Nhiệt Độ",
                LinkAPI: req.body.api2
                },
                {Name: "Độ ẩm không khí",
                LinkAPI: req.body.api3
                },
                {Name: "Độ ẩm đất",
                LinkAPI: req.body.api4
                },
                {Name: "Bóng đèn",
                LinkAPI: req.body.api5
                },
                {Name: "Tình trạng",
                LinkAPI: req.body.api6
                },
                {Name: "Quạt 1",
                LinkAPI: req.body.api7
                },
                {Name: "Quạt 2",
                LinkAPI: req.body.api8
                },
                {Name: "Quạt 3",
                LinkAPI: req.body.api9
                },
            ]
        
            const updatedserver = await DataServer.findOneAndUpdate(
              { ID: "tringuyennek" },
              { Address: req.body.mainapi,
                ID: req.body.username,
                Key: req.body.key,
                ListAPI: list
              }, 
              { new: true }
            );
         
            if (!updatedserver) {
              res.status(404).send('User not found');
              return;
            }
        
            res.redirect('../../pages/editSetting.html');
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
          }
})

app.use(express.static(formpath))
module.exports = app;