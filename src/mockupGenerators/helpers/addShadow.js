const sharp = require('sharp');

async function addShadow({
    inputBuffer,
    blurAmount,
    radius,
    offsetX,
    offsetY,
    opacity
}) {
    // Metadata of the input image
    const metadata = await sharp(inputBuffer).metadata();

    // Canvas dimensions
    const canvasWidth = 1024;
    const canvasHeight = 1024;

    // Create a transparent canvas
    const canvas = await sharp({
        create: {
            width: canvasWidth,
            height: canvasHeight,
            channels: 4,
            background: {
                r: 0,
                g: 0,
                b: 0,
                alpha: 0
            }
        }
    }).png().toBuffer();

    // Create a shadow canvas based on the input image dimensions
    const shadow = await sharp({
        create: {
            width: metadata.width + radius * 2,
            height: metadata.height + radius * 2,
            channels: 4,
            background: {
                r: 0,
                g: 0,
                b: 0,
                alpha: opacity
            }
        }
    }).png().toBuffer();

    // Calculate positions to center the shadow and image on the canvas
    const centerPosition = (canvasDimension, itemDimension, itemRadius) =>
        Math.round((canvasDimension - (itemDimension + itemRadius * 2)) / 2);

    const shadowLeft = centerPosition(canvasWidth, metadata.width, radius) + offsetX;
    const shadowTop = centerPosition(canvasHeight, metadata.height, radius) + offsetY;
    const imageLeft = centerPosition(canvasWidth, metadata.width, 0);
    const imageTop = centerPosition(canvasHeight, metadata.height, 0);

    // Composite the shadow onto the canvas
    const withShadow = await sharp(canvas)
        .composite([{
            input: shadow,
            left: shadowLeft,
            top: shadowTop
        }])
        .toBuffer();

    // Composite the input image onto the canvas with shadow and apply blur
    const outputBuffer = await sharp(withShadow)
        .blur(blurAmount)
        .composite([{
            input: inputBuffer,
            left: imageLeft,
            top: imageTop
        }])
        .toBuffer();

    return outputBuffer;
}

module.exports = addShadow;