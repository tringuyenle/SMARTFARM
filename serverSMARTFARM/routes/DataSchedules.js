
const DataSchedule = require("../model/DataSchedule")
const path=require('path')
const formpath = path.resolve(__dirname,'../../')
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const router = express.Router();
const mongoose =require("mongoose")

const dbConn = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")
app.get("/",async (req,res)=>{
        const DataSchedules = await DataSchedule.find()
        res.json(DataSchedules)
    })
    
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));

app.post('/Light',function (req, res){

        dbConn.then(function(db) {
            
            const dataschedule = new DataSchedule({
                Type: "Den",
                StartDay: req.body.startday,
                None: req.body.setendday === "none", // convert string to boolean
                Minute: req.body.setendday === "minute" ? req.body.minute : null, // assign minute if selected, null otherwise
                EndDay: req.body.setendday === "datetime" ? req.body.endday : null
            })
            if(dataschedule.StartDay){
                if(!(dataschedule.None == false && dataschedule.Minute == null && dataschedule.EndDay == null)){
                    dataschedule.save()
                    res.redirect('../../pages/index.html');
                }
            }
            
                
        });    
                

})
app.post('/maybom',function (req, res){

    dbConn.then(function(db) {
        
        const dataschedule = new DataSchedule({
            Type: "Maybom",
            StartDay: req.body.startday,
            None: req.body.setendday === "none", // convert string to boolean
            Minute: req.body.setendday === "minute" ? req.body.minute : null, // assign minute if selected, null otherwise
            EndDay: req.body.setendday === "datetime" ? req.body.endday : null
        })
        if(dataschedule.StartDay){
            if(!(dataschedule.None == false && dataschedule.Minute == null && dataschedule.EndDay == null)){
                dataschedule.save()
                res.redirect('../../pages/index.html');
            }
        }
            
    });    
            

})
app.post('/quat',function (req, res){

    dbConn.then(function(db) {
        
        const dataschedule = new DataSchedule({
            Type: "Quat",
            StartDay: req.body.startday,
            None: req.body.setendday === "none", // convert string to boolean
            Minute: req.body.setendday === "minute" ? req.body.minute : null, // assign minute if selected, null otherwise
            EndDay: req.body.setendday === "datetime" ? req.body.endday : null
        })
        if(dataschedule.StartDay){
            if(!(dataschedule.None == false && dataschedule.Minute == null && dataschedule.EndDay == null)){
                dataschedule.save()
                res.redirect('../../pages/index.html');
            }
        }
            
    });    
            

})
app.post('/dieuhoa',function (req, res){

    dbConn.then(function(db) {
        
        const dataschedule = new DataSchedule({
            Type: "DieuHoa",
            StartDay: req.body.startday,
            None: req.body.setendday === "none", // convert string to boolean
            Minute: req.body.setendday === "minute" ? req.body.minute : null, // assign minute if selected, null otherwise
            EndDay: req.body.setendday === "datetime" ? req.body.endday : null
        })
        if(dataschedule.StartDay){
            if(!(dataschedule.None == false && dataschedule.Minute == null && dataschedule.EndDay == null)){
                dataschedule.save()
                res.redirect('../../pages/index.html');
            }
        }
            
    });    
            

})

app.use(express.static(formpath))
module.exports = app;