const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
import {Request,Response, NextFunction} from 'express'

/**
 * Token verification
 */
exports.authenticateToken = (req:Request,res:Response,next:NextFunction) => {
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
 *  For Generating access token
 */

exports.generateAccessToken =(userId)=> {
    return jwt.sign({userId},process.env.TOKEN_SECRET, {expiresIn:'60s'});
}

/**
 * OTP code generation
 */
exports.authCode = (length=5) => {
    return Math.random().toString(36).substring(2,length);
}

// console.log(this.authCode());
/**
 * Checks whether the user is logging with a different browser by comparing the 'User-Agent' header of the incoming request with the string saved in the user's profile array
 */
exports.hasSameBrowser = (request,browser) => {
    return browser.includes(request.header('User-Agent'))
}