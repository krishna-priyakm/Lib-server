const jwt=require('jsonwebtoken')

const jwtMiddleware=async(req,res,next)=>{
    console.log("inside jwtmiddleware")
    console.log(req.headers)
    try{
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        const result=jwt.verify(token,"secretId")
        console.log(result)
        req.payload=result.adminid
        next()
        
    }
    catch(err){
        res.status(406).json("Authorization failed..Login first!!" +err)
    }

}

module.exports=jwtMiddleware