const express=require("express");
const app=express();
const {adminAuth,userAuth}=require('./middleware/auth')

app.use("/admin",adminAuth);
app.get("/admin/getData",(req,res)=>{
  res.send("Admin data is added");
})
app.get("/admin/deleteData",(req,res)=>{
  res.send("Admin data is deleted");
})
app.get("/admin/login",(req,res)=>{
  res.send("Admin login");
})
app.use("/user",userAuth,(req,res)=>{
  res.send("Data  is deleted");

})
app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})
