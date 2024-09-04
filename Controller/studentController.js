const students = require('../Models/studentSchema')
const jwt=require('jsonwebtoken')

exports.studentsreg = async (req, res) => {
    console.log("Inside the function")
    const { name, age, phone, gender, address, email, password } = req.body
    console.log(`name:${name},age:${age},phone${phone},gender:${gender},address:${address},email:${email},password:${password}`)
    try {
        const excistingstud = await students.findOne({ email })
        if (excistingstud) {
            res.status(400).json("Excisting  Student")
        }
        else {
            const newStud = students({ name, age, phone, gender, address, email, password })
            await newStud.save()
            res.status(200).json(newStud)
        }
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.studlogin=async(req,res)=>{
    console.log("Inside function")
    const {email,password}=req.body
    console.log(`email:${email},password:${password}`)
    try{
        const excistingstud=await students.findOne({email,password})
        console.log(excistingstud)
        if(excistingstud && excistingstud.isAdmin==true){
            const token=jwt.sign({adminid:excistingstud._id},"secretId")
            res.status(200).json({
                excistingstud,
                role:"admin",
                token
            })
        }
        else if(excistingstud){
            const token=jwt.sign({adminid:excistingstud._id},"secretId")
            res.status(200).json({
                excistingstud,
                role:"student",
                token
            })
        }
        else{
            res.status(406).json("Invalid email or password")
        }
    }
    catch(err){
        res.status(400).json("Something went wrong" +err)

    }
}

exports.studentlist=async(req,res)=>{
    console.log("Inside the list")
    try{
        const list=await students.find({isAdmin:false})
        res.status(200).json(list)
    }
    catch(err){
        res.status(405).json("Invalid student list")
    }
}

exports.deletestudent=async(req,res)=>{
    console.log("Inside delete function")
    const {id}=req.params
    console.log(id)
    try{
        const deletestud=await students.findByIdAndDelete({_id:id})
        res.status(200).json(deletestud)
    }
    catch(err){
        res.status(405).json("Student deletion failed.....")
    }
}