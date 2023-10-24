const createProduct = require("./createProduct");
const generateImage = require("./generateImage");
const generateImageStory = require("./generateImageStory");
const generateImageTitle = require("./generateImageTitle");
const uploadImageToS3 = require("./uploadImageToS3");

const create = async (req, res, next) => {
    const {
        idea,
        size
    } = req.body;

    try {
        const [imageBuffer, titleResult, storyResult] = await Promise.all([
            generateImage(idea, size),
            generateImageTitle(idea),
            generateImageStory(idea)
        ]);

        const {
            productId,
            productHandle
        } = await createProduct(imageBuffer, titleResult, storyResult, size);

        const s3Image = uploadImageToS3(imageBuffer, "image/jpeg", 'artiverseprivate', `${productId}.jpg`);

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