const DataNote = require("../model/DataNote")
const path=require('path')
const formpath = path.resolve(__dirname,'../../')
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const router = express.Router();
const mongoose =require("mongoose")
// var popupS = require('popups');

const dbConn = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")


app.get("/DataNotes",async (req,res)=>{
        const DataNotes = await DataNote.find()
        res.json(DataNotes)
    })
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));
app.post('/',function (req, res){
        dbConn.then(function(db) {
                const datanote= new DataNote({
                Title:req.body.title_note,
                Summary: req.body.summary_note,
                Content: req.body.content_note
                })
                if((datanote.Title !="") && (datanote.Summary !="")&&(datanote.Content !="")){
                        // popupS.alert({
                        //         content: 'Chua nhap day du'
                        //     });
                        datanote.save()
                }
        });    
                
  
            //res.send('Data received:\n' + JSON.stringify(req.body));
})
app.use(express.static(formpath))
module.exports = app;