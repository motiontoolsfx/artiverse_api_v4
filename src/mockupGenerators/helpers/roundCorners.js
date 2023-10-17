const sharp = require('sharp');

async function roundCorners({
    inputBuffer,
    radius
}) {
    // Get image info
    const imageInfo = await sharp(inputBuffer).metadata();

    // Create SVG for rounded corners
    const roundedCorners = Buffer.from(
        `<svg width="${imageInfo.width}" height="${imageInfo.height}">
               <rect x="0" y="0" width="${imageInfo.width}" height="${imageInfo.height}" rx="${radius}" ry="${radius}"/>
             </svg>`
    );

    // Round corners and convert to buffer
    const outputBuffer = await sharp(inputBuffer)
        .composite([{
            input: roundedCorners,
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    return outputBuffer;
}

module.exports = roundCorners;

// Example usage
// Replace `yourInputBuffer` with your actual image buffer
// roundCorners({
//         inputBuffer: yourInputBuffer,
//         radius: 100
//     })
//     .then(outputBuffer => {
//         console.log('Image corners rounded, got buffer');
//     })
//     .catch(err => {
//         console.error('Error:', err);
//     });