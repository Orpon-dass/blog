const adminmodel =  require("../model/admin.model");
const bcrypt =require("bcrypt");
const {isEmail,isEmpty} =require("validator");
const jwt = require("jsonwebtoken");


exports.adminRegister = async (req,res)=>{
    try{
        let password = "hellow123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const adminLogin= new adminmodel({
          email:"orponchandro@gmail.com",
          password:hashedPassword,
        });
        let admindata = await adminLogin.save();
        res.status(200).json({message:"registration successful"});
       // let token = jwt.sign({id:userdata._id},process.env.SECRET_KEY)
        //response.header("auth-token",token).json({token:token});
    }catch(err){
       res.status(500).json({message:"server problem"});
       console.log(err)
    }
}

//admin login code goes here
exports.adminlogin = async (request,response)=>{
    const {email,password}=request.body;
     
   try{
     if(isEmpty(email)){
       response.json({message:"field can not be empty"});
       return;
     }else if(!isEmail(email)){
      response.json({message:"enter a valid email"});
      return;
     }else if(isEmpty(password)){
      response.json({message:"field can not be empty"});
      return;
     }else{
       const user = await adminmodel.findOne({email:email});
       if(user!==null){
         let validPassword = await bcrypt.compare(password,user.password);
         if(validPassword){
           let token = jwt.sign({id:user._id},process.env.SECRET_KEY);
           response.header("admin-token",token).json({"admin-token":token});
         }else{
         response.json({message:"email or password is invalid"});
         }
       }else{
         response.json({message:"email or password is invalid"});
       }
     }
      
   }catch(err){
       response.status(500).json({message:"server is not responding",err:err.message});
       console.log(err)
   }
}
