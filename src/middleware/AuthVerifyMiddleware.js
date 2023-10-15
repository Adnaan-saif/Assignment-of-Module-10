const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    let Token = req.headers['token'];
    jwt.verify(Token,"SecretKey457246",function (error,decoded) {
        if(error){
            console.log(Token)
            res.status(401).json({status:"unauthorized"})
        }
        else {
            let email = decoded['data'];
            console.log(email)
            req.headers.email = email
            next();
        }
    })
}
