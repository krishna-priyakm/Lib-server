const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({
    book_id:{
        type:String,
        required:true,
      
    },
    student_id:{
        type:String,
        required:true,
    },
    booking_date:{
        type:String,
        required:true
    },
    return_date:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    book_name:{
        type:String,
        required:true
    }

})

const bookings=mongoose.model("bookings",bookingSchema)
module.exports=bookings