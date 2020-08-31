const {createProcessType} = require('./processType.service');

/**
 *This function creates a new Process type
 * @name createProcessType
 * 
 * @path {POST} /processType/create
 * 
 * 
 * @function
 * 
 * @param {Object}  req                 request parameters
 * @param {String}  req.processTypeId   Process Type name
 * @param {String}  req.description     Description of the process type
 * 
 * @param {Object}  res                 response parameters
 * @param {Boolean}  res.success         The state of the response, either true or false
 * @param {String}  res.message         A short message giving more information about the response.
 * 
 * @chain {@link https://kisankranti.herokuapp.com/}
 * 
 * 
 */
exports.createProcessType = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        const proecssDetails = await registerUser(requestParameters);
        if (proecssDetails.error) {
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
        } = proecssDetails;
        res.status(200).send({
            error,
            message
        });
    } catch (error) {
        
    }
}