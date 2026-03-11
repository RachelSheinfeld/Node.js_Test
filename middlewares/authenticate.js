const jwt = require('jsonwebtoken');
const isAdmin = (req, res, next) => {
    
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (req.user.role != "admin") {
            return res.status(403).json({ message: "Forbidden" })
        }
        next()
    }


const authenticate = (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Unauthorized"})
    }
    const token=authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Forbidden"})
        }
        req.user=user;
        next();
    })
}
module.exports={authenticate,isAdmin};