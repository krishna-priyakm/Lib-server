const express = require('express')

const studentController = require('../Controller/studentController')
const bookController = require('../Controller/bookController')
const bookingController=require('../Controller/bookingController')


const jwtMiddleware=require('../middleware/jwtMiddleware')

const multerConfig=require('../middleware/coverMiddleware')

const route = express.Router()

route.post('/student/register',studentController.studentsreg)
route.post('/student/login',studentController.studlogin)
route.get('/student/list',studentController.studentlist)
route.delete('/student/delete/:id',jwtMiddleware,studentController.deletestudent)

route.post('/book/register',jwtMiddleware,multerConfig.single('cover'),bookController.bookdetails)
route.get('/book/view',bookController.viewbook)
route.delete('/book/delete/:id',jwtMiddleware,bookController.deletebook)
route.put('/book/edit/:id',jwtMiddleware,multerConfig.single('cover'),bookController.editbook)
route.get('/book/bookview',bookController.bookview)


route.post('/booking/add',bookingController.addbooking)
route.get('/booking/decrcount/:bookid',bookingController.decrcount)
route.get('/booking/viewbooking',bookingController.viewbooking)
route.get('/booking/history/:id',bookingController.history)
route.put('/booking/return/:id',bookingController.return)
route.put('/booking/approve/:id',bookingController.approve)
route.get('/booking/incrcount/:bookid',bookingController.inrcount)
module.exports=route