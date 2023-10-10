const Jimp = require("jimp");
const path = require("path");

const generatePosterMockup = async (imageBuffer) => {
    const backgroundPath = path.join(__dirname, 'backgrounds', 'empty_wall.jpg');
    const background = await Jimp.read(backgroundPath);
    const image = await Jimp.read(imageBuffer);

    // Padding
    const padding = 140;
    const extraBottomPadding = 177;

    // Calculate new dimensions
    const maxWidth = background.bitmap.width - 2 * padding;
    const maxHeight = background.bitmap.height - 2 * padding - extraBottomPadding;

    // Resize image
    image.contain(maxWidth, maxHeight);

    // Create shadow
    const shadow = image.clone();
    shadow.color([{
        apply: 'mix',
        params: ['#000000', 100]
    }]);

    // Create a larger image for the shadow to allow blur to spread
    const largerShadow = await new Jimp(shadow.bitmap.width + 400, shadow.bitmap.height + 400, 0x00000000);
    largerShadow.composite(shadow, 100, 100);
    largerShadow.blur(20);
    largerShadow.opacity(0.7); // Set opacity to 70%

    // Calculate position for centering
    const x = (background.bitmap.width - image.bitmap.width) / 2;
    const y = (background.bitmap.height - image.bitmap.height - extraBottomPadding) / 2;

    // Composite larger shadow first, then image
    background.composite(largerShadow, x + 10 - 100, y + 10 - 100);
    background.composite(image, x, y);

    // Get buffer
    const finalBuffer = await background.getBufferAsync(Jimp.MIME_JPEG);

    return finalBuffer;
};

module.exports = generatePosterMockup;