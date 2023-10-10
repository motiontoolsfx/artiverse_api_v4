const shopify = require('../config/shopify');
const products = require('../data/product'); // Replace with the actual path

const createProduct = async (imageBuffer, title, aspectRatio) => {
    const productInfo = products[aspectRatio];
    if (!productInfo) {
        console.log('Invalid aspect ratio');
        return;
    }

    const variants = [];
    const sizes = productInfo.sizes;

    for (const printType in productInfo) {
        if (printType !== 'sizes') {
            const prices = productInfo[printType];
            sizes.forEach((size, index) => {
                const price = prices[index];
                if (price !== 0) {
                    variants.push({
                        option1: printType,
                        option2: size,
                        price: price.toFixed(2) // Convert to string with 2 decimal places
                    });
                }
            });
        }
    }

    const newProduct = {
        title,
        body_html: `Your AI image can be purchased in these print types and sizes`,
        vendor: "Artiverse",
        product_type: "Wall Art",
        options: [{
                name: "Print Type"
            },
            {
                name: "Size"
            }
        ],
        variants: variants
    };

    const product = await shopify.product.create(newProduct);
    const productId = product.id;
    const productHandle = product.handle;

    await shopify.productImage.create(productId, {
        attachment: imageBuffer.toString('base64'),
        filename: `image_${productId}.jpg`
    });

    console.log('Product was successfully created');

    return {
        productId,
        productHandle
    };
};

module.exports = createProduct;