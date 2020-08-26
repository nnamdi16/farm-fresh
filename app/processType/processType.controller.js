const {createProcessType} = require('./processType.service');

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