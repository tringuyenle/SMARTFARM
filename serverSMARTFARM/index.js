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
const DataNote = require("./routes/DataNotes")
const DataUser = require("./routes/DataUsers")
const DataSchedule = require("./routes/DataSchedules")
// const DataNote = require("./model/DataNote")
const path=require('path')
const publicpath=path.join(__dirname,'../')
// const formpath = path.resolve(__dirname,'../')


const dbConn = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")

app.use(bodyparser.json())

app.use('/Datalights',DatalightRoute)
app.use('/DataTemperatures',DataTemperutareRoute)
app.use('/DataHumiditys',DataHumidityRoute)
app.use('/DataSoilmoistures',DataSoilmoisturetRoute)
app.use('/post-note',DataNote)
app.use('/DataUsers', DataUser)
app.use('/DataSchedules', DataSchedule)
// app.use(bodyparser.urlencoded({ extended: false }));
// app.post('/post-note',function (req, res){
//         dbConn.then(function(db) {
//                  const datanote= new DataNote({
//                         Title:req.body.title_note,
//                         Summary: req.body.summary_note,
//                         Content: req.body.content_note
//                 })
//                 if((datanote.Title =="")|| (datanote.Summary =="")||(datanote.Content =="")){
//                         res.send('Please enter all fields !!! ');
//                 }
//                 else {
//                         datanote.save()
//                         res.send('Note data has been saved');
//                 }
            
                
//             });    
//             //res.send('Data received:\n' + JSON.stringify(req.body));
// })

//connect mongo
app.use(express.static(publicpath))
// app.use(express.static(formpath))
app.listen(3000);

