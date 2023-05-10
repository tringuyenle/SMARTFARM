const mongoose =require("mongoose")

const DataUserschema =mongoose.Schema({
    Name: String,
    Username: String,
    Password: String,
    Email: String,
    Description: String,
}) 

module.exports = mongoose.model("DataUsers",DataUserschema)