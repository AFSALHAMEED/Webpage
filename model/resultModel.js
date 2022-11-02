const mongoose = require("mongoose")

const arrayModel = new mongoose.Schema(
    {
        result:{
            type:Array,
            default:[]
        }
    }
)

module.exports= mongoose.model("results",arrayModel)