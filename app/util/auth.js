const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authenticateToken = (req,res,next) => {
    //Fetch the jwt access token from the request header

 try {
    const token = req.headers['x-access-token'];
    if (token == null) {
        return res.status(401).send(
            {
                auth:false,
                message: 'No token provided'
            }
        );
    }

    jwt.verify(token,process.env.TOKEN_SECRET,(err,user)=>{
        console.log(err);
        if (err) {
            return res.status(403).send(
                {
                    auth:false,
                    message:'Failed to authenticate token'
                }
            );
        }
        req.user = user;
        next();
    });
 } catch (error) {
    res.status(500).json(
        {
            auth:false,
            message: error.message
        }
    )
 }
}



exports.generateAccessToken =(userId)=> {
    return jwt.sign({userId},process.env.TOKEN_SECRET, {expiresIn:'60s'})
}
