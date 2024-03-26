const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    console.log(authHeader);
    if(!authHeader.startsWith("Bearer")){
        return res.status(403).json({});
    }

    try{
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
    }catch(err){
        console.log(err);
        return res.json("error");
    }

}

module.exports = authMiddleware