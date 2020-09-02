const UserSchema = require('./user.model');
const {sendSMS} = require('../sms/twilio.service');
const {generateAccessToken,authenticateToken,authCode} = require('../util/auth');
const dotenv = require('dotenv');
const { totp } = require('otplib');
dotenv.config();
// const authy = require('authy')(process.env.AUTHY_API_KEY);



exports.registerUser = async function (data) {
    try {
        const {firstName,lastName,phoneNumber,password} = data;
        const createUser = new UserSchema({
            firstName,
            lastName,
            phoneNumber
        });
        const checkExistingUser = await UserSchema.exists({
            phoneNumber
        });

        if (checkExistingUser) {
            return {
                error: true,
                message:'Customer already exist'
            };
        }
        
        const token = totp.generate(process.env.TOKEN_SECRET);
        createUser.setPassword(password);
        await createUser.save();
        const verificationMessage = `Welcome to Kisankranti, Your verification code is ${token}`;
        sendSMS(phoneNumber,verificationMessage);
        return {
            error: false,
            message: `${firstName} successfully created ${token}`
        }
    } catch (error) {
        throw  new Error(error);
    }
}


exports.authenticateUser = async function (data) {
    try {
        const {phoneNumber,password} = data;
        const userInfo = await UserSchema.findOne({
            phoneNumber:phoneNumber
        });
        if (!userInfo) {
            return {
                error: true,
                message: `Invalid username or password`
            }
        }
        const {
            password:dbPassword,
            _id:userId
        } = userInfo;
        const comparePassword = userInfo.comparePassword(
            password,dbPassword
        );
        if (!comparePassword) {
            return {
                error: true,
                message: `Invalid username or password`
            }
        }

        const token = generateAccessToken(userId);
        console.log(token);
        return {
            error: false,
            message:`Successfully logged in`,
            token:token
        }
        
    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
    
}