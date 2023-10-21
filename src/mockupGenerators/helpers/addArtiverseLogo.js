const sharp = require('sharp');

async function addArtiverseLogo({
    inputBuffer,
    logoBuffer,
    padding,
    x1,
    y1,
    x2,
    size // This size parameter will be used to define how big the logo will be relative to the square
}) {
    // Get metadata of the input image
    const inputMetadata = await sharp(inputBuffer).metadata();

    // Calculate the dimensions of the square
    const squareSize = x2 - x1;

    // Resize the logo based on the square size and the size parameter
    const logoSize = Math.floor(squareSize * size);
    const resizedLogoBuffer = await sharp(logoBuffer)
        .resize(logoSize, logoSize)
        .toBuffer();

    // Scale the padding based on the square size
    const scaledPadding = Math.floor(squareSize * padding);

    // Calculate the position to place the logo in the bottom-right corner,
    // accounting for the scaled padding
    const logoLeft = inputMetadata.width - logoSize - scaledPadding;
    const logoTop = inputMetadata.height - logoSize - scaledPadding;

    // Composite the resized logo onto the input image
    const outputBuffer = await sharp(inputBuffer)
        .composite([{
            input: resizedLogoBuffer,
            left: logoLeft,
            top: logoTop
        }])
        .toBuffer();

    return outputBuffer;
}

module.exports = addArtiverseLogo;