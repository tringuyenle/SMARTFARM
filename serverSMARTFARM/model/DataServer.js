const mongoose =require("mongoose")

const DataServerschema =mongoose.Schema({
    Address: String,
    ID: String,
    Key: String,
    ListAPI: [Object],
})

module.exports = mongoose.model("DataServers",DataServerschema)