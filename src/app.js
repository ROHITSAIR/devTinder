// console.log("Starting a new file");

const express=require("express");

const app=express();


//this will match all the http methods(get,post,put,delete,patch etc)
app.use("/test",(req,res)=>{
    res.send("test");
});

//post
app.post("/user",(req,res)=>{
res.send("Post mtd succesfully fetched");


//put
app.put("/user",(req,res)=>{
    res.send("Put mtd is used here");
})
//delete
app.delete("/user",(req,res)=>{
    res.send("Delete mtd is used here");
})
})
//this will match only get /user
app.get("/user",(req,res)=>{
    res.send({firstName : "Rohit",laastName : "R",age:22}); 
})
app.use("/user",(req,res)=>{
    res.send("used app.use mtd not app.patch");
})


// app.use("/hello/run",(req,res)=>{
//     res.send("Hello,run!!!!!");
// })
// app.use("/hello",(req,res)=>{
//     res.send("Hello,hello,hello");
// });
// app.use("/",(req,res)=>
// {
//     res.send("Hello from the first point")
// })


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});