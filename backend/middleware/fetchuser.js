var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy";

const fetchUser=(req,res,next)=>{
    
   const token=req.header('auth-token');
   if(!token){
    return res.status(401).json({error:"authenciate token"})
   }
   try {
    const data = jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
   } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
   }

}

module.exports = fetchUser ;
