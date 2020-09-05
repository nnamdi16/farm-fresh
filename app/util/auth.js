const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/**
 * @name authenticationToken    to verify token
 * @param {Request} req         Header info - Token
 * @param {Response} res        Response 
 * @param {Next} next           Middleware to call the next function
 */
exports.authenticateToken = (req,res,next) => {
    //Fetch the jwt access token from the request header

 try {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token == null) {
        return res.status(403).json(
            {
                auth:false,
                message: 'No token provided'
            }
        );
    }

    jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
        console.log(err);
        if (err) {
            return res.status(401).json(
                {
                    auth:false,
                    message:'Failed to authenticate token'
                }
            );
        }
        console.log(decoded);
        req.decoded = decoded;
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

/**
 * @name generateAccessToken - For Generating access token
 * @param {String} userId User's Id
 */

exports.generateAccessToken =(userId)=> {
    return jwt.sign({userId},process.env.TOKEN_SECRET, {expiresIn:'60s'});
}

/**
 * @name authCode           - Generates verification code
 * @param {Number} length  - Determines the verification length
 */
exports.authCode = (length=5) => {
    return Math.random().toString(36).substring(2,length);
}

// console.log(this.authCode());
/**
 * @name hasSameBrowser     Checks whether the user is logging with a different browser by comparing the 'User-Agent' header of the incoming request with the string saved in the user's profile array
 * @param {Object} request request object
 * @param {Object} browser browser object
 */
exports.hasSameBrowser = (request,browser) => {
    return browser.includes(request.header('User-Agent'))
}