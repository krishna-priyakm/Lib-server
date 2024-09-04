const bookings=require ('../Models/bookingSchema')
const books=require('../Models/bookSchema')

exports.addbooking=async(req,res)=>{
    console.log("Inside booking")
    const {book_id,student_id,booking_date,book_name}=req.body
    console.log(req.body)
    try{
        const existingbook= await bookings.findOne({book_id,student_id})
        console.log(existingbook)
        if(existingbook){
            res.status(400).json("Existing book....already booked")
        }
        else{
            const newbooking=new bookings({book_id,student_id,booking_date,return_date:"",status:"pending",book_name})
            await newbooking.save()
            res.status(200).json(newbooking)
            }
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.decrcount=async(req,res)=>{
    console.log("inside decrcount")
    const {bookid}=req.params
    console.log(bookid)
    try{
        const excistingbook=await books.findOne({_id:bookid})
        console.log(excistingbook.number)
        excistingbook.number--
      
        if(excistingbook.number > 0){
            console.log(excistingbook.number)
            await excistingbook.save()
            const data=await books.findById({_id:excistingbook._id})
            console.log(data)
            res.status(201).json(data)
        }
        else{
            await excistingbook.save()
            res.status(200).json("Book outoff stock...")
        }

    }
    catch(err){
        res.status(406).json("Something went wrong")
    }
}

exports.viewbooking=async(req,res)=>{
    console.log("Inside view booking")
    try{
        const view=await bookings.find()
        res.status(200).json(view)
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.history=async(req,res)=>{
    console.log("Inside history function")
    const{id}=req.params
    console.log(id)
    try{
        const result=await bookings.find({student_id:id})
        console.log(result)
        
        res.status(200).json(result)
        
    }
    catch(err){
        res.status(405).json(err)
    }
}

exports.return=async(req,res)=>{
    console.log("Inside return fuction")
    const {id}=req.params
    console.log(id)
    const {return_date,status}=req.body
    try{
        const returnbook=await bookings.updateMany({_id:id},{return_date,status})
        console.log(returnbook)
        res.status(200).json(returnbook)
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.approve=async(req,res)=>{
    console.log("Inside approve function")
    const{id}=req.params
    console.log(id)
    const{status}=req.body
    try{
        const approvereturn=await bookings.findByIdAndUpdate({_id:id},{status})
        console.log(approvereturn)
        res.status(200).json(approvereturn)
    }
    catch(err){
        res.json(406).json(err)
    }
}

exports.inrcount=async(req,res)=>{
    console.log("Inside increment function")
    const {bookid}=req.params
    console.log(bookid)
    try{
        const excistingbook=await books.findOne({_id:bookid})
        console.log(excistingbook)
        excistingbook.number++
        await excistingbook.save()
        res.status(200).json(excistingbook)

    }
    catch(err){
        res.status(406).json(err)
    }
}

