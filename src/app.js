const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
app.use(express.json());



app.get("/user",async(req,res)=>{

  const userEmail=req.body.emailId;
  try{
    const user=await User.find({emailId: userEmail});
    if(user.length===0){
      res.status(404).send("User not found");
    }
    else
{
    res.send(user);
}
  }
  catch(err){
    res.status(404).send("Something went wrong",err);
  }

})
//delete a user
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
try{
  const user= await User.findByIdAndDelete({_id:userId});
res.send("User deleted succesully");
}
catch(err){
  res.status(404).send("User not found");
}
})

app.get("/feed",async (req,res)=>{
 const Users= await User.find({});
 res.send(Users);
})


app.post("/signup",async(req,res)=>{
// console.log(req.body);
//creating a instane of new user model
// const userObj={
//   firstName:"Dhoni",
//   lastName:"MS",
//   emailId:"dhoni@900",
//   password:"12345",
// }
 const user=new User(req.body);

try{
await user.save();
res.send("User signed up succesfully");
}
catch(err)
{
res.status(404).send("Error in saving user"+err.message);
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


//update data of the user

app.patch("/user/:userId", async(req,res)=>{
  //const userId=req.body.userId;
  const userId=req.params?.userId;
  const data=req.body;
 
 //93 to 101 line is for allowing only specific fields to be updated 
try{
   const ALLOWED_UPDATES=["photoUrl","about","gender","skills"];

  const isUpdateAllowed=Object.keys(data).every((k)=>
  ALLOWED_UPDATES.includes(k)
  );
  if(!isUpdateAllowed)
  {
    res.status(400).send("Update not allowed")
  }
  if(data?.skills.length>10)
  {
   res.status(401).send("Skills cannot be more than 10");
  }
await User.findByIdAndUpdate({_id:userId},data,{
  returnDocument:"after",
  runValidators:true
});
res.send("user updated successfully");  
console.log(data)
}
  catch(err)
  {
res.status(404).send("Error in updating",err.message);
  }
})
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

 