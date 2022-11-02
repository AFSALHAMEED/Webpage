const mongoose = require("mongoose")

const webpageModel = new mongoose.Schema({
     domainName:{
        type:String,
     },
     wordCount:{
        type:Number,
     },
     weblink:{
        type:[String],
     },
     isFavourite:{
        type:Boolean,
        default:false
     },
     mediaLink:{
        type:[String]
     }
},
{
    timestamps:true
})
module.exports= mongoose.model("users",webpageModel)