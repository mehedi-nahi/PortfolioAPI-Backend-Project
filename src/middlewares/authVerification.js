const { DecodeToken } = require("../utility/tokenutility.js");

module.exports =(req,res,next)=>{
   let token= req.cookies["token"];

    let decoded = DecodeToken(token);

    if(decoded==null){
        return res.status(401).json({
            success: false,
            message: "Authentication failed. Invalid token."
        });
    }
    else {
        req.headers.email = decoded.email;
        req.header._id= decoded._id;
        next();
    }
    console.log("Decoded Token: ", decoded);
}