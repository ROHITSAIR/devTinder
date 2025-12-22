const validator=require("validator");
const validateSignUpData=(req)=>{
const{firstName,lastName,emailId,password}=req.body;
if(!firstName||!lastName)
    {
      throw new Error("Name error")
    }
else if(lastName.length<3||lastName.length>50)
    {
        throw new Error("lastName should be define in limit")
    }
else if(!validator.isEmail(emailId))
    {
        throw new Error("not valid  mail")
    } 
      

}

module.exports={validateSignUpData};