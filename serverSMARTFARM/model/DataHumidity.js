const mongoose =require("mongoose")

const DataHumidityschema =mongoose.Schema({
    ID_Humidity_senser: String,
    Name_Humidity_sensor: String,
    Status : String,
    Value : String,
    Start_time: String,
    End_time: String
})

module.exports = mongoose.model("DataHumiditys",DataHumidityschema)