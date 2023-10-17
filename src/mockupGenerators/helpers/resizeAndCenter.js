const sharp = require('sharp');

async function resizeAndCenter({
    inputBuffer,
    x1,
    y1,
    x2
}) {
    const {
        width: inWidth,
        height: inHeight
    } = await sharp(inputBuffer).metadata();
    const squareSize = x2 - x1;
    const aspectRatio = inWidth / inHeight;

    let overlayWidth, overlayHeight;

    if (inWidth > inHeight) {
        overlayWidth = squareSize;
        overlayHeight = Math.round(squareSize / aspectRatio);
    } else {
        overlayHeight = squareSize;
        overlayWidth = Math.round(squareSize * aspectRatio);
    }

    const xOffset = Math.round((squareSize - overlayWidth) / 2);
    const yOffset = Math.round((squareSize - overlayHeight) / 2);

    const centerX = x1 + xOffset + Math.round(overlayWidth / 2);
    const centerY = y1 + yOffset + Math.round(overlayHeight / 2);

    const outputBuffer = await sharp(inputBuffer)
        .resize({
            width: overlayWidth,
            height: overlayHeight,
            fit: 'inside'
        })
        .toBuffer();

    return {
        outputBuffer,
        centerX,
        centerY
    };
}

module.exports = resizeAndCenter;

// Example usage
// Replace `yourInputBuffer` with your actual image buffer
// resizeAndCenter({
//         inputBuffer: yourInputBuffer,
//         x1: 312,
//         y1: 172,
//         x2: 712
//     })
//     .then(({
//         outputBuffer,
//         centerX,
//         centerY
//     }) => {
//         console.log(`Center point: (${centerX}, ${centerY})`);
//     })
//     .catch(err => console.error(err));