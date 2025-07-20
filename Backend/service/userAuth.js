import jwt from "jsonwebtoken";

export const createToken = (user)=>{
    const token = jwt.sign({username : user.username},process.env.SECRET_KEY_USER);
    return token;
}

export const userAuthMiddleware = async (req,res,next)=>{
    console.log("checking user token");
    let token = req.header.token;
    if(!token){
        return res.status(404).json({message : "Token not found"});
    }
    try {
        let {username} = jwt.verify(token,process.env.SECRET_KEY_USER);
        req.username = username;
        next();
    } catch(err) {
        return res.status(404).json({message : "Invalid token"});
    }
}