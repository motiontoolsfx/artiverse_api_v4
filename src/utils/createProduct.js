const shopify = require('../config/shopify');
const products = require('../data/product'); // Replace with the actual path
const generateMockups = require('./generateMockups');

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

    const [product, mockups] = await Promise.all([
        shopify.product.create(newProduct),
        generateMockups(imageBuffer)
    ]);

    const productId = product.id;
    const productHandle = product.handle;

    // Sequentially upload product images to maintain order
    const uploadedImages = [];
    for (let index = 0; index < mockups.length; index++) {
        const mockup = mockups[index];
        const base64Image = mockup.toString('base64');
        const filename = `image_${productId}_${index}.jpg`;

        const uploadedImage = await shopify.productImage.create(productId, {
            attachment: base64Image,
            filename: filename
        });
        uploadedImages.push(uploadedImage);
    }

    console.log('Product was successfully created');

    return {
        productId,
        productHandle
    };
};

module.exports = createProduct;