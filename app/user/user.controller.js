const {registerUser} = require("./user.service");

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