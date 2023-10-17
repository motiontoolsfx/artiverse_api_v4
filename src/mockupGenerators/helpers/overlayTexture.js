const sharp = require('sharp');

async function overlayTexture({
    inputBuffer,
    textureBuffer
}) {
    // Get the dimensions of the input image
    const {
        width: inputWidth,
        height: inputHeight
    } = await sharp(inputBuffer).metadata();

    // Resize (crop) the texture image to be the same dimensions as the input image
    const resizedTextureBuffer = await sharp(textureBuffer)
        .resize(inputWidth, inputHeight)
        .toBuffer();

    // Composite the resized texture image over the input image using a 'multiply' blend
    const outputBuffer = await sharp(inputBuffer)
        .composite([{
            input: resizedTextureBuffer,
            blend: 'multiply'
        }])
        .toBuffer();

    return outputBuffer;
}

module.exports = overlayTexture;

// Example usage
// Replace `yourInputBuffer` and `yourTextureBuffer` with your actual image buffers
// overlayTexture({
//     inputBuffer: yourInputBuffer,
//     textureBuffer: yourTextureBuffer
// })
// .catch(err => console.error(err));