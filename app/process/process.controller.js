const {createProcess} = require('./process.service');

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
 * @param {Object}   res                 response parameters
 * @param {Boolean}  res.success         The state of the response, either true or false
 * @param {String}   res.message         A short message giving more information about the response.
 * 
 * @chain {@link https://kisankranti.herokuapp.com/}
 * 
 * 
 */
exports.createProcess = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        const processDetails = await createProcess(requestParameters);
        const {error,message} = processDetails;
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
                success:false,
                message:error.message
            }
        )
    }
}