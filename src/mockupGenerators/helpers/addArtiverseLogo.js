const sharp = require('sharp');

async function addArtiverseLogo({
    inputBuffer,
    logoBuffer,
    padding
}) {
    // Get metadata of the input image and the logo
    const inputMetadata = await sharp(inputBuffer).metadata();
    const logoMetadata = await sharp(logoBuffer).metadata();

    // Calculate the position to place the logo in the bottom-right corner,
    // accounting for the padding
    const logoLeft = inputMetadata.width - logoMetadata.width - padding;
    const logoTop = inputMetadata.height - logoMetadata.height - padding;

    // Composite the logo onto the input image
    const outputBuffer = await sharp(inputBuffer)
        .composite([{
            input: logoBuffer,
            left: logoLeft,
            top: logoTop
        }])
        .toBuffer();

    return outputBuffer;
}

module.exports = addArtiverseLogo;