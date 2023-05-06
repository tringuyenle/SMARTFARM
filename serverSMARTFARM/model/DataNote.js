const mongoose =require("mongoose")

const DataNoteschema =mongoose.Schema({
    Title: String,
    Summary: String,
    Content: String,
    Tag: Number
})

module.exports = mongoose.model("DataNotes",DataNoteschema)