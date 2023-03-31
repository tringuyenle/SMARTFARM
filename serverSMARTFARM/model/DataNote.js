const mongoose =require("mongoose")

const DataNoteschema =mongoose.Schema({
    Title: String,
    Summary: String,
    Content: String
})

module.exports = mongoose.model("DataNotes",DataNoteschema)