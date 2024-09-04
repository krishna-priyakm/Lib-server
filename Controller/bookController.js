const books = require('../Models/bookSchema')

exports.bookdetails=async(req,res)=>{
    console.log("Iside the function")
    console.log(req.file.filename)
   const cover=req.file.filename
    const {title,author,description,category,number,adminid}=req.body
    console.log(`title:${title},author:${author},description:${description},category:${category},number:${number},cover:${cover},adminid${adminid}`)

    try{
        const existingbook=await books.findOne({title})
        if(existingbook){
            res.status(400).json("Book exists")
        }
        else{
            const newBook=books({title,author,description,category,number,cover,adminid})
            await newBook.save()
            res.status(200).json(newBook)
        }
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.viewbook=async(req,res)=>{
    console.log("Inside the view function")
    console.log(req.query)
    const searchkey=req.query.search
    const query={
        title:{$regex:searchkey,$options:"i"}
    }

    try{
        const view=await books.find(query)
        res.status(200).json(view)
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.deletebook=async(req,res)=>{
    console.log("Inside delete function")
    const {id}=req.params
    console.log(id)
    try{
        const result=await books.findByIdAndDelete({_id:id})
        res.status(200).json(result)
    }
    catch(err){
        res.status(406).json("Book deletion failed")
    }
}

exports.editbook=async(req,res)=>{
    console.log("Inside edit function")
    const {id}=req.params
    console.log(id)
    const {title,author,description,category,number}=req.body
    const uploadCover=req.file?req.file.filename:req.body.cover
    try{
        const edit=await books.findByIdAndUpdate({_id:id},{title,author,description,category,number,cover:uploadCover})
        res.status(200).json(edit)
    }
    catch(err){
        res.status(406).json("Book details editing failed")
    }
}


exports.bookview=async(req,res)=>{
    console.log("Inside the book view function")
    try{
        const bookview=await books.find()
        res.status(200).json(bookview)
    }
    catch(err){
        res.status(405).json(err)
    }
}

