const sharp = require('sharp');

async function adjustImage({
    inputBuffer,
    brightness = 0,
    contrast = 0
}) {
    try {
        // Initialize with the input buffer
        let image = sharp(inputBuffer);

        // Only apply transformations if values are not zero
        if (brightness !== 0 || contrast !== 0) {
            // Linear adjustment for brightness and contrast
            // Formula: output = input * (1 + contrast) + brightness
            image = image.linear(1 + contrast, brightness);
        }

        const outputBuffer = await image.toBuffer();

        return outputBuffer;
    } catch (err) {
        console.error('Error adjusting image:', err);
        throw err;
    }
}

module.exports = adjustImage;

// Usage
// Replace `yourInputBuffer` with your actual image buffer
// adjustImage({
//     inputBuffer: yourInputBuffer,
//     brightness: 0,
//     contrast: 0,
// });