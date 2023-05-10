const mongoose =require("mongoose")

const DataScheduleschema =mongoose.Schema({
    Type: String,
    StartDay: String,
    EndDay: String,
    None: Boolean,
    Minute: Number
})

module.exports = mongoose.model("DataSchedules",DataScheduleschema)