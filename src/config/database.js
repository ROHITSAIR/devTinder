const mongoose=require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://rohit:123412341234@rohit.bosc5rj.mongodb.net/DEVTINDER1234?appName=ROHIT");

}

module.exports=connectDB;