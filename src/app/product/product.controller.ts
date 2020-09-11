import {Request,Response} from 'express';
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
 * @param {String}  req.productTitle         Title of the product
 * @param {String}  req.quantityAvailable    Quantity of the product available
 * @param {String}  req.photoUpload          Picture upload of the product- base64 string
 * @param {String}  req.description          Description of the product
 * @param {String}  req.price                Price of the product
 * @param {String}  req.quantityPerPrice     Quantity per price of the product
 * @param {String}  req.location             Location of the seller
 * @param {String}  req.currency             Currency
 * @param {String}  req.productType          Type of product
 * @param {String}  req.sizes                Sizes of the product
 * @param {String}  req.additionalProperty   Further description of the product
 * @param {String}  req.minimumOrderQuantity Minimum Quantity per order
 * @param {String}  req.sellerId             Seller's UserId
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
exports.createProduct = async(req:Request,res:Response) => {
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

exports.getSellerProducts = async(req:Request,res:Response) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("Accept", "application/json");
        const{sellerId} = req.params
        const productList = await getSellerProducts(sellerId);
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

exports.updateProduct = async(req:Request,res:Response) => {
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