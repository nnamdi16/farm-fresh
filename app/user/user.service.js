const UserSchema = require('./user.model');


exports.registerUser = async function (data) {
    try {
        const {firstName,lastName,phoneNumber,password} = data;
        const createUser = new UserSchema({
            firstName,
            lastName,
            phoneNumber
        })
        const checkExistingUser = await UserSchema.exists({
            phoneNumber
        })

        if (checkExistingUser) {
            return {
                error: true,
                message:'Customer already exist'
            };
        }
        createUser.setPassword(password);
        console.log(createUser);
        await createUser.save();
        return {
            error: false,
            message: `${firstName} successfully created`
        }
    } catch (error) {
        throw  new Error(error)
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
        const {password:dbPassword} = userInfo;
        const comparePassword = userInfo.comparePassword(
            password,dbPassword
        );
        if (!comparePassword) {
            return {
                error: true,
                message: `Invalid username or password`
            }
        }
        return {
            error: false,
            message:`Successfully logged in`
        }
        
    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
    
}