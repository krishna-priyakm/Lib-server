const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    cover:{
        type:String,
        required:true
    },
    adminid:{
        type:String,
        required:true
    }
})

const books=mongoose.model("books",bookSchema)
module.exports=books