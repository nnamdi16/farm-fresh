const ProductSchema = require('./product.model');

exports.createProduct = async function (data) {
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
         * If no, add a new product.
         * @todo
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

exports.updateProduct = async function (data) {
    try {
        const entries = Object.keys(data);
        const productUpdate = {};
        /**
         * Constructing dynamic query
         */
        for (let index = 0; index < entries.length; index++) {
            productUpdate[entries[index]] = Object.values(data)[index];   
        }
        // const {
        //     _id,
        //     productTitle,
        //     quantityAvailable,
        //     photoUpload,
        //     description,
        //     price,
        //     quantityPerPrice,
        //     location,
        //     currency,
        //     productType,
        //     sizes,
        //     additionalProperty,
        //     minimumOrderQuantity
        // } = data;
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