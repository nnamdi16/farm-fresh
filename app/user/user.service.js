const UserSchema = require('./user.model');
const sendSMS = require('../sms/twilio.service');
const {generateAccessToken,authenticateToken,authCode} = require('../util/auth');
const { jwt } = require('twilio');


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
        createUser.setPassword(password);
        const verificationCode = authCode();
        await createUser.save();
        const verificationMessage = `Welcome to Kisankranti, Your verification code is ${verificationCode}`;
        sendSMS(phoneNumber,verificationMessage);
        return {
            error: false,
            message: `${firstName} successfully created`
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