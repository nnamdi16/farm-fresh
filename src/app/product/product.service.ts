import { IProduct } from "./product.interface";

const ProductSchema = require('./product.model');

exports.createProduct = async function (data:IProduct) {
    try {
        const {productTitle,
            quantityAvailable,
            photoUpload,
            description,
            price,
            quantityPerPrice,
            location,
            currency,
            productType,
            sizes,
            additionalProperty,
            minimumOrderQuantity, 
            sellerId
        } = data;
        const createProduct = new ProductSchema({
            productTitle,
            quantityAvailable,
            photoUpload,
            description,
            price,
            quantityPerPrice,
            location,
            currency,
            productType,
            sizes,
            additionalProperty,
            minimumOrderQuantity,
            sellerId
        });


        /**
         * Check trhe list of product registered by the user
         * Check if the product to be added already exist. If yes, update the product
         * @todo If no, add a new product.
         */
        // const checkexistingProduct = await ProductSchema.find({sellerId,productTitle:productTitle.toLowerCase()}).exec();
        await createProduct.save();
        return {
            error: false,
            message:`${productTitle} successfully created`
        }

    } catch (error) {
        throw new Error(error);
    }
}

interface IProductObject {
    [key:string] : string 
}

exports.updateProduct = async function (data:IProduct) {
    try {
        const {sellerId, _id} = data;
        const updateObject = Object.keys(data).reduce((object:IProductObject,key) => {
            console.log(key !== "_id" || "sellerId");
            if (key !== "_id" || "sellerId") {
                console.log(key);
                object[key] = (<IProduct>data)[key];
            }
            return object;
        }, {});
        console.log(updateObject);
        const entries = Object.keys(updateObject);
        const productUpdate = {};
        /**
         * Constructing dynamic query
         */
        for (let index = 0; index < entries.length; index++) {
            (<IProduct>productUpdate)[entries[index]] = Object.values(updateObject)[index];   
        }
        const updateProduct =  await ProductSchema.update(
            {
                _id,
                sellerId
            },
            {
                $set:productUpdate,
                $currentDate: { lastModified: true }
            }
        );

        if (updateProduct) {
            return {
                error: false,
                message: `Product successfully updated`
            }
        }

        return {
            error: true,
            message:`Product not updated`
        }

    } catch (error) {
        throw new Error(error);
    }
}

exports.getSellerProducts = async function (data:IProduct) {
 try {
     const sellerId = data
    const fetchAllProducts = await ProductSchema.find({sellerId}).exec();
    if (fetchAllProducts) {
        return {
            error: false,
            message: fetchAllProducts
        }
    }

    return {
        error: true,
        message: `Error fetching all products`
    }
 } catch (error) {
     throw new Error(error);
 }
}


