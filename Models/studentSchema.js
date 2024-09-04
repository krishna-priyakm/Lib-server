const mongoose = require('mongoose')

const validate = require('validator')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validator:[validate.isEmail,"Invalid email"]
    },
    password:{
        type:String,
        required:true,
        validator:[validate.isStrongPassword,"Invalid password"]
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
})

const students=mongoose.model("students",studentSchema)
module.exports=students