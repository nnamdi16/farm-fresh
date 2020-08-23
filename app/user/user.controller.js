const {registerUser,authenticateUser} = require("./user.service");

/**
 *This function creates a new user.
 * @name registerUser
 * 
 * @path {POST} /apiv1/register
 * 
 * 
 * @function
 * 
 * @param {Object}  req             request parameters
 * @param {String}  req.firstName   Firstname of the User
 * @param {String}  req.lastName    Lastname of the User
 * @param {String}  req.phoneNumber Phone number of the User
 * @param {String}  req.password    Password of the User
 * 
 * @param {Object}  res             response parameters
 * @param {String}  res.success     The state of the response, either true or false
 * @param {String}  res.message     A short message giving more information about the response.
 * 
 * @chain {@link https://kisankranti.herokuapp.com/}
 * 
 * 
 */

exports.registerUser = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        const userDetails = await registerUser(requestParameters);
        if (userDetails.error) {
            return res.status(200).json(
                {
                    success: false,
                    message: userDetails.message
                }
            )
            
        }
        const {
            error,
            message
        } = userDetails;
        res.status(200).send({
            error,
            message
        });


    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}


/**
 *This function authenticate and allows auser to be logged in .
 * @name authenticateUser
 * 
 * @path {POST} /apiv1/login
 * 
 * 
 * @function
 * 
 * @param {Object}  req             request parameters
 * @param {String}  req.phoneNumber Phone number of the User
 * @param {String}  req.password    Password of the User
 * 
 * @param {Object}  res             response parameters
 * @param {String}  res.success     The state of the response, either true or false
 * @param {String}  res.message     A short message giving more information about the response.
 * 
 * @chain {@link https://kisankranti.herokuapp.com/}
 * 
 * 
 */
exports.authenticateUser = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        const authInfo = await authenticateUser(requestParameters);
        if (authInfo.error) {
            return res.status(200).json(
                {
                    success: false,
                    message: authInfo.message
                }
            )
            
        }
        const {
            error,
            message
        } = authInfo;
        res.status(200).send({
            error,
            message
        });


    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}