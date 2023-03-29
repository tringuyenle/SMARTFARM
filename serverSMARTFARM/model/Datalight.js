const mongoose =require("mongoose")

const Datalightschema =mongoose.Schema({
    ID_Light_senser: String,
    Name_Light_sensor: String,
    Status : String,
    Value : String,
    Start_time: String,
    End_time: String
})

module.exports = mongoose.model("Datalights",Datalightschema)