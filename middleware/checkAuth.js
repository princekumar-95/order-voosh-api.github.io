const jwt = require('jsonwebtoken');
const SECRET_KEY = "Task"


module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
         jwt.verify(token,SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json("Invalid Token");
    }
   
}