const mongoose =require("mongoose")

const DataUserschema =mongoose.Schema({
    Name: String,
    Username: String,
    Password: String,
})

module.exports = mongoose.model("DataUsers",DataUserschema)