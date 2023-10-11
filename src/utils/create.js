const createProduct = require("./createProduct");
const generateImage = require("./generateImage");
const generateImageTitle = require("./generateImageTitle");
const generateMockups = require("./generateMockups");
const uploadImageToS3 = require("./uploadImageToS3");

const create = async (req, res, next) => {
    const {
        idea,
        size
    } = req.body;

    try {
        const [imageResult, titleResult] = await Promise.all([
            generateImage(idea, size),
            generateImageTitle(idea)
        ]);

        const mockup = await generateMockups(imageResult);

        const {
            productId,
            productHandle
        } = await createProduct(mockup, titleResult, size);

        const s3Image = uploadImageToS3(imageResult, "image/jpeg", 'artiverseprivate', `${productId}.jpg`);

        res.json({
            status: "success",
            productId,
            productHandle
        });
    } catch (error) {
        console.log(`Error creating image: ${error}`);

        res.json({
            status: "failed",
            error: error.message || error
        });
    }
}

module.exports = create;