require ('dotenv').config()

const express = require('express')
const cors = require('cors')

const server=express()

server.use(express.json())
server.use(cors())


require('./Connections/dbConnections')

const route=require('./Route/route')
server.use(route)


server.use('/upload',express.static('./uploads'))

const PORT =process.env.PORT || 3000



server.listen(PORT,()=>{
    console.log("Port running successfully",PORT)
})