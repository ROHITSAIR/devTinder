const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middleware/auth.js");
app.use(express.json());
app.use(cookieParser());



// app.get("/user",async(req,res)=>{

//   const userEmail=req.body.emailId;
//   try{
//     const user=await User.find({emailId: userEmail});
//     if(user.length===0){
//       res.status(404).send("User not found");
//     }
//     else
// {
//     res.send(user);
// }
//   }
//   catch(err){
//     res.status(404).send("Something went wrong",err);
//   }

// })
//delete a user
// app.delete("/user",async(req,res)=>{
//   const userId=req.body.userId;
// try{
//   const user= await User.findByIdAndDelete({_id:userId});
// res.send("User deleted succesully");
// }
// catch(err){
//   res.status(404).send("User not found");
// }
// })

// app.get("/feed",async (req,res)=>{
//  const Users= await User.find({});
//  res.send(Users);
// })

//signup
app.post("/signup",async(req,res)=>{
// console.log(req.body);
//creating a instane of new user model
// const userObj={
//   firstName:"Dhoni",
//   lastName:"MS",
//   emailId:"dhoni@900",
//   password:"12345",
// 
try{
//validation

validateSignUpData(req);

//encryption
const{firstName,lastName,emailId,password}=req.body;

//encrypt the password
const passwordHash= await bcrypt.hash(password,10)
console.log(passwordHash);


//creating a new instance for the user model
 
//const user=new User(req.body);

//another way like in 70
const user=new User({
  firstName,
  lastName,
  emailId,
  password:passwordHash
})
await user.save();
res.send("User signed up succesfully");
}
catch(err)
{
res.status(404).send("Error:"+err.message);
}



/*  
 const user=new User({
    firstName:"Rohit",
    lastName:"R",
    emailId:"rohit@900",
    password:"1234",
  });


*/




})

//login
app.post("/login",async (req,res)=>
  {
    try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user)
    {
      throw new Error("invalid credentials")
    }
    // const isPasswordValid= bcrypt.compare(password,user.password)

        const isPasswordValid= await user.validatePassword(password);

    if(isPasswordValid)
      {

        //Create a JWT token
           //below line now used in models with the hepl of helper functions  
        //const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn :"1d"});
        const token=await user.getJWT();
        console.log(token);

        //Add token to cookie and send response back to the user

         res.cookie("token",token,
          {
            expires:new Date(Date.now()+8*3600000),
          });
        res.send("Login successfull")
      }
      else
        {
          throw new Error("Invalid credentials")
        }

  }
  catch(err)
  {
    res.status(400).send("Error:"+err.message)
  }

  })

app.get("/profile",async(req,res)=>{
  try{
  const cookies=req.cookies;
  const {token}=cookies;
  if(!token)
  {
    throw new Error("Invalid Token");
  }

  //validate my token


  const decodedMessage= await jwt.verify(token,"DEV@Tinder$790");
  // console.log(decodedMessage);

  const {_id}=decodedMessage;
 
  console.log(cookies); 

  const user=await User.findById(_id);
  if(!user)
  {
    throw new Error("User does not exist");
  }
  
  res.send(user) 
  }
  catch(err)
  {
res.status(400).send("Token not found",err.message);
  }
})


app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  try
  {
    
    const user=req.body.firstName;

    console.log("Sending a connection request")
    res.send(user,"sent a connection Request");

  }
  catch(err)
  {
    res.status(400).send("ERROR:"+err.message);
  }
})


// update data of the user
// app.patch("/user/:userId", async(req,res)=>{
//   //const userId=req.body.userId;
//   const userId=req.params?.userId;
//   const data=req.body;
 
//  //93 to 101 line is for allowing only specific fields to be updated 
// try{
//    const ALLOWED_UPDATES=["photoUrl","about","gender","skills"];

//   const isUpdateAllowed=Object.keys(data).every((k)=>
//   ALLOWED_UPDATES.includes(k)
//   );
//   if(!isUpdateAllowed)
//   {
//     res.status(400).send("Update not allowed")
//   }
//   if(data?.skills.length>10)
//   {
//    res.status(401).send("Skills cannot be more than 10");
//   }
// await User.findByIdAndUpdate({_id:userId},data,{
//   returnDocument:"after",
//   runValidators:true
// });
// res.send("user updated successfully");  
// console.log(data)
// }
//   catch(err)
//   {
// res.status(404).send("Error in updating",err.message);
//   }
// })



connectDB()
.then(()=>{
    console.log("Database connected successfully !!!!")

app.listen(3000,()=>{
   console.log("Server is running on port 3000");
})
})

  .catch((err)=>{
    console.log("Database connection failed !!!!",err)
})

 