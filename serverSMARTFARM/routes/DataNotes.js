const DataNote = require("../model/DataNote")
const path=require('path')
const formpath = path.resolve(__dirname,'../../')
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const router = express.Router();
const mongoose =require("mongoose")

const dbConn = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));
app.post('/',function (req, res){
        dbConn.then(function(db) {
                const datanote= new DataNote({
                Title:req.body.title_note,
                Summary: req.body.summary_note,
                Content: req.body.content_note
                })
                if((datanote.Title =="")|| (datanote.Summary =="")||(datanote.Content =="")){
                        res.send('Please enter all fields !!! ');
                }
                else {
                        datanote.save()
                        res.send('Note data has been saved. Data received:\n' + JSON.stringify(req.body));
                        //res.send('Data received:\n' + JSON.stringify(req.body));
                }
        });    
                
  
            //res.send('Data received:\n' + JSON.stringify(req.body));
})
app.use(express.static(formpath))
module.exports = app;