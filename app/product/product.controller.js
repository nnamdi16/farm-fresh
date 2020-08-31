const {createProduct,updateProduct,getSellerProducts} = require('./product.service');


/**
 *This function creates a new product .
 * @name createProduct
 * 
 * @path {POST} /product/create
 * 
 * 
 * @function
 * 
 * @param {Object}  req                      request parameters
 * @param {String}  req.productTitle         Phone number of the User
 * @param {String}  req.quantityAvailable    Quantity of the product available
 * @param {String}  req.photoUpload          Password of the User
 * @param {String}  req.quantityAvailable    Password of the User
 * 
 * @param {Object}   res             response parameters
 * @param {Boolean}  res.success     The state of the response, either true or false
 * @param {Boolean}  res.auth        The state of the authentication
 * @param {String}   res.message     A short message giving more information about the response.
 * 
 * @chain {@link https://kisankranti.herokuapp.com/}
 * 
 * 
 */
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

exports.getSellerProducts = async(req,res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const requestParameters = req.body;
        
        const productList = await getSellerProducts(requestParameters);
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