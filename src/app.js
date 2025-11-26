const express=require('express');
const app=express();
const connectDB=require("./config/database");
const User=require("./models/user");
app.use(express.json());


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
res.status(404).send("Error in saving user",err);
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

 