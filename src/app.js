const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
app.use(express.json());


app.post("/signup",async(req,res)=>{
//creating a instane of new user model
  const userObj={
    firstName:"Dhoni",
    lastName:"MS",
    emailId:"dhoni@900",
    password:"12345",
  }
  const user=new User(userObj);

await user.save();



res.send("User signed up succesfully");
/*  
 const user=new User({
    firstName:"Rohit",
    lastName:"R",
    emailId:"rohit@900",
    password:"1234",
  });


*/




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

 