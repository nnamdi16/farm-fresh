const UserSchema = require('./user.model');
const {sendSMS} = require('../sms/twilio.service');
const {generateAccessToken,authenticateToken,authCode} = require('../util/auth');
const dotenv = require('dotenv');
const { totp } = require('otplib');
dotenv.config();
const ProcessSchema = require('../process/process.model');
const ProcessTypeSchema = require('../processType/processType.model');
const{registrationStatus:status} = UserSchema;
const{processStatus} =ProcessSchema;
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
        
        const otpCode = totp.generate(process.env.TOKEN_SECRET);
        const token = generateAccessToken(otpCode);
        createUser.setPassword(password);
        const findProcess = await ProcessTypeSchema.findOne(
            {processTypeId:'REGISTER_USER'}
        )
        const{_id} = findProcess;
       
        const userDetails = await createUser.save();
        const{_id:userId} = userDetails;
        const createNewProcess = new ProcessSchema(
            {
                processTypeId:_id,
                createdBy:userId,
                updatedBy:userId,
                processCode:otpCode,
                token
            }
        );
        await createNewProcess.save();
        const verificationMessage = `Welcome to Kisankranti, Your verification code is ${otpCode}`;
        sendSMS(phoneNumber,verificationMessage);
        return {
            error: false,
            userId,
            message: `${firstName} account successfully created`,
            token
        }
    } catch (error) {
        throw  new Error(error);
    }
}

const verifyUnregisteredUser = async function (data) {
try {
    const{processCode,userId} = data;
        const verifyUnregisteredUserResult = await ProcessSchema.findOneAndUpdate(
            {createdBy:userId,processCode}, 
            {processStatus:processStatus.Success}, {new:true},
            function (err,result) {
                if (err) {
                    return {
                        error:true,
                        message:err
                    }
                } 
                return {
                    error:false,
                    message:result
                }
            }
        );
       if (verifyUnregisteredUserResult == null) {
           return  {
               error: true,
               message:"Invalid Process Code"
           }
       }
        return verifyUnregisteredUserResult;
        
} catch (error) {
    return {
        error: true,
        message: error.message
    }
}
    
}

const updateCustomerStatus = async function (data) {
   try {
    const{userId,processCode} = data;
    const checkProcessStatus = await ProcessSchema.findOne({createdBy:userId,processCode});
    if (checkProcessStatus == null) {
        const checkIfUserExist = await UserSchema.exists({_id:userId});
        if (!checkIfUserExist) {
            return {
                error:true,
                message:"User not found"
            }
        }
        return {
            error:true,
            message:"Wrong process code"
        }
    }

    const {processStatus:processState} = checkProcessStatus;
    if (processState == processStatus.Success) {
        
        const customerUpdatedStatus= await UserSchema.findByIdAndUpdate(
            {_id:userId},
            {registrationStatus:status.Verified},
            {new:true},
            function (err,result) {
                if (err) {
                    return {
                        error:true,
                        message:err
                    }
                }
                return {
                    error:false,
                    message:result
                }
            }
            );

            return customerUpdatedStatus;
    }
    
    return {
        error: true,
        message:"Customer verification not completed"
    }

        // return updateCustomerStatusResult;
   } catch (error) {
       return {
           error:true,
           message:error.message
       }
   }
}

exports.completeRegistration = async function (data) {
    try {
           const [updateProcess,customerInfo] = await Promise.all([verifyUnregisteredUser(data),updateCustomerStatus(data)]) ;
            console.log(updateProcess);
            console.log(customerInfo)
          
           return {
               error: false,
          
               message:{
                updateProcess,
                customerInfo
               }
           }
     
    
    } catch (error) {
        return {
            error:true,
            message:error.message
        }
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