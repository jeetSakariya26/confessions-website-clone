import jwt from "jsonwebtoken";

export const createToken = (dev)=>{
    const token = jwt.sign({username : dev.username},process.env.SECRET_KEY);
    return token;
}

export const devAuthMiddleware = async (req,res,next)=>{
    let token = req.header.token;
    if(!token){
        return res.status(404).json({message : "Token not found"});
    }
    try {
        let {username} = jwt.verify(token,process.env.SECRET_KEY);
        req.username = username;
        next();
    } catch(err) {
        console.log("Invalid or Expired token");
    }
}