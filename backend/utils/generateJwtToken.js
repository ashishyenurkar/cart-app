import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv'
// dotenv.config();

const generateTokenandSetCookie=(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'})
//console.log(process.env.JWT_SECRET);

res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none', // Allow cross-origin requests
    secure: true, // Requires HTTPS
  });
  
}

export default generateTokenandSetCookie;