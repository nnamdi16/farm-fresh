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
        const {
            error,
            message,
        } = userDetails;
        if (error) {
            return res.status(200).json(
                {
                    success: error,
                    message
                }
            )
            
        }
    
        res.status(200).send({
            error,
            message
        });

    } catch (error) {
        res.status(500).json(
            {
                success: error,
                message
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
        const {
            error,
            message,
            token
        } = authInfo;

        if (error) {
            return res.status(404).json(
                {
                    auth: false,
                    success: error,
                    message
                }
            )
            
        }
        res.status(200).send({
            auth:true,
            error,
            message,
            token
        });


    } catch (error) {
        res.status(500).json(
            {
                auth:false,
                success: false,
                message: error.message
            }
        )
    }
}


exports.logoutUser = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        res.status(200).send({
            auth:false,
            token:null
        });


    } catch (error) {
        res.status(500).json(
            {
                auth:false,
                success: false,
                message: error.message
            }
        )
    }
}
