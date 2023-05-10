
const DataUser = require("../model/DataUser")
const path=require('path')
const formpath = path.resolve(__dirname,'../../')
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const router = express.Router();
const mongoose =require("mongoose")

const dbConn = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")
app.get("/",async (req,res)=>{
        const DataUsers = await DataUser.find()
        res.json(DataUsers)
    })
    
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));

app.post('/',function (req, res){

        dbConn.then(function(db) {
                const datauser = new DataUser({
                    Name: req.body.name,
                    Username: req.body.username,
                    Password: req.body.password,
                    Email: "",
                    Description: "",
                })
                if((datauser.Name) && (datauser.Username)&&(datauser.Password)){
                        if((datauser.Name !="") && (datauser.Username !="")&&(datauser.Password !="")){
                                // popupS.alert({
                                //         content: 'Chua nhap day du'
                                //     });
                                datauser.save()
                                res.redirect('../../pages/login.html');
                        }
                }


                
        });    
                
  
            //res.send('Data received:\n' + JSON.stringify(req.body));
})

app.post("/update", async function (req, res){
        const username = req.body.username
        const nameUser = req.body.nameUser
        const emailUser = req.body.emailUser
        const des = req.body.description
        try {
                const updatedUser = await DataUser.findOneAndUpdate(
                  { Username: username },
                  { Name: nameUser,
                    Email: emailUser,
                    Description: des,
                  },
                  { new: true }
                );
            
                if (!updatedUser) {
                  res.status(404).send('User not found');
                  return;
                }
            
                res.redirect('../../pages/profile.html');
              } catch (err) {
                console.error(err);
                res.status(500).send('Internal server error');
              }
})

app.use(express.static(formpath))
module.exports = app;