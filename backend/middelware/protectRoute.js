import jwt from 'jsonwebtoken'
import User from '../model/userModel.js';


export  const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        //console.log("Cookies:", req.cookies);

        //console.log("token",token)
        if (!token) {
            return res.status(401).json({ error: "Unauthorize: No Token Provided!" });
        }
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(403).json({ error: "Forbidden: Invalid Token!" });
        }

        if (!decoded || !decoded.userId) {
            return res.status(403).json({ error: "Forbidden: Invalid Token Format!" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(403).json({ error: "Forbidden: User Not Found!" });
        }

        req.user = user; // Set user
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const protectAdminRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
       // console.log("token",token)
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Token Provided!" });
        }
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(403).json({ error: "Forbidden: Invalid Token!" });
        }

        if (!decoded || !decoded.userId) {
            return res.status(403).json({ error: "Forbidden: Invalid Token Format!" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(403).json({ error: "Forbidden: User Not Found!" });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ error: "You are not authorised to acces this route!" });
        }

        req.user = user; // Set user
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
