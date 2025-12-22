const jwt=require("jsonwebtoken");
const User=require("../models/user");
// const adminAuth=(req,res,next)=>
// {
//     console.log("Admin is checking");
//     const token="xyz";
//     const isAdmin=token==="xyz";
//     if(!isAdmin)
//     {
//      res.status(401).send("Unauthorized access");

//     }
//     else{
//                      next();


//     }

// }
// const userAuth=(req,res,next)=>
// {
//     console.log("User is checking");
//     const token="xyz";
//     const isAdmin=token==="xyz";
//     if(!isAdmin)
//     {
//      res.status(401).send("Unauthorized access");

//     }
//     else{
    
//     next();
//     }}

// module.exports={adminAuth,userAuth};

const userAuth=async(req,res,next)=>{
   try
    {
        const {token}=req.cookies;
        if(!token)
        {
          throw new Error("Token is not valid!!!");
        }
        const decodedObj= await jwt.verify(token,"DEV@Tinder$790");

        const{_id}=decodedObj;
        const user=await User.findById(_id);
        if(!user)
        {
            throw new Error("User not found");
        }
        next();
    }     

catch(err)
{
res.status(400).send("Error bot token",+err.message);
}
}
    
    module.exports={userAuth};