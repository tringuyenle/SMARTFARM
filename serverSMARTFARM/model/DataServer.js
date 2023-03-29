const mongoose =require("mongoose")

const DataServerschema =mongoose.Schema({
    ID_Server: String,
    Address: String,
})

module.exports = mongoose.model("DataServers",DataServerschema)