const mongoose=require("mongoose");
const validator=require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        minLength:5,
        maxLength:45
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value)
        {
            if(!validator.isEmail(value))
                {
                    throw new Error("Email is not valid");
                }
        }
        
       
    },
    password:{
        type:String
    },
    age:{
        type:String,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://namastedev.com/?_aff=946684882216",
        validate(value)
        {
            if(!validator.isURL(value))
                {
                    throw new Error("URL is not valid");
                }
        }
    },
    about:{
        type:String,
        default:"This is a default value"
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true
});
const User=mongoose.model("User",userSchema);
module.exports=User;
//module.exports=mongoose.model("User",userSchema)