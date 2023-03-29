const mongoose =require("mongoose")

const DataTemperatureschema =mongoose.Schema({
    ID_Temperature_senser: String,
    Name_Temperature_sensor: String,
    Status : String,
    Value : String,
    Start_time: String,
    End_time: String
})

module.exports = mongoose.model("DataTemperatures",DataTemperatureschema)