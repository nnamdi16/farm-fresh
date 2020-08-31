const {createProduct,updateProduct,getAllProducts} = require('./product.service');


exports.createProduct = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        
        const productDetails = await createProduct(requestParameters);
        const {
            error,
            message
        } = productDetails;
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

exports.getAllProducts = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        
        const productList = await getAllProducts(requestParameters);
        const {
            error,
            message
        } = productList;
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
                message:error.message
            }
        )
    }
}

exports.updateProduct = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        
        const productUpdate = await updateProduct(requestParameters);
        const {
            error,
            message
        } = productUpdate;
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
                message:error.message
            }
        )
    }
}