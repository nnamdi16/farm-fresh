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