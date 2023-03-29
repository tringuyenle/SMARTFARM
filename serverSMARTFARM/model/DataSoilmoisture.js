const mongoose =require("mongoose")

const DataSoilmoistureschema =mongoose.Schema({
    ID_Soilmoisture_senser: String,
    Name_Soilmoisture_sensor: String,
    Status : String,
    Value : String,
    Start_time: String,
    End_time: String
})

module.exports = mongoose.model("DataSoilmoistures",DataSoilmoistureschema)