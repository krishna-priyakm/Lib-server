const mongoose = require('mongoose')

const connectingString = process.env.DATABASE

mongoose.connect(connectingString).then(()=>{
    console.log("MongodB connected successfully")
}).catch(rej=>{
    console.log("MongodB connection failed")
})