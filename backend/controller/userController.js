import User from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import generateTokenandSetCookie from "../utils/generateJwtToken.js";

export const registerUser = async(req,res)=>{
    try {
        const {username, password, email, role} = req.body;
        


    const user = await User.findOne({username});

    if(user){
        return res.status(400).json({error:'Username Already Exist'});
    }
    

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
username,
password : hashPassword,
email,
role,
    })

if(newUser){
    generateTokenandSetCookie(newUser._id,res)
    await newUser.save();
    return res.status(201).json({message:'user Created Succesfully',newUser})
}else{
    return res.status(501).json({message:'Invalid User Data'}) 
}
        
    } catch (error) {
        return res.status(501).json({message:'user not created',error:error.message})
    }
   
}

export const login = async(req,res)=>{

    try {
const {email,password}=req.body;
const user = await User.findOne({email})
const isPasswordCorrect = await bcrypt.compare(password, user?.password || "" );

if(!user || !isPasswordCorrect){
    return res.status(400).json({error:'invalid Email of Password'});
}

generateTokenandSetCookie(user._id,res);

res.status(200).json({message:'Login Succesfully',user});

        
    } catch (error) {
        res.status(501).json({message:'internal server error',error:error.message});
    }


}
export const logout = (req,res)=>{
    try {
       res.cookie("jwt","",{maxAge:0});
       
       return res.status(200).json({message:"Logout Succesfully"});
    } catch (error) {
        res.status(501).json({message:'internal server error',error:error.message}); 
    }
}