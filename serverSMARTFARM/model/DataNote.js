const mongoose =require("mongoose")

const DataNoteschema =mongoose.Schema({
    Title: String,
    Summary: String,
    Content: String,
    Tag: Number,
    Time: String,
})

module.exports = mongoose.model("DataNotes",DataNoteschema)