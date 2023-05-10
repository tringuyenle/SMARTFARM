const mongoose =require("mongoose")

const DataServerschema =mongoose.Schema({
    Address: String,
    ListAPI: [Object],
})

module.exports = mongoose.model("DataServers",DataServerschema)