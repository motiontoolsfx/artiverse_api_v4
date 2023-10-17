const sharp = require('sharp');

async function depthEffect({
    inputBuffer,
    maxBrightenFactor,
    maxDarkenFactor,
    borderWidth
}) {
    try {
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        const {
            width,
            height,
            channels
        } = metadata;

        const clamp = (value) => Math.max(0, Math.min(255, value));
        const computeFadeFactor = (distance, maxFactor) => 1 + ((borderWidth - distance) / borderWidth) * (maxFactor - 1);

        const imageBuffer = await image.raw().toBuffer();
        const newBuffer = Buffer.alloc(width * height * channels);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * channels;

                let r = imageBuffer[idx];
                let g = imageBuffer[idx + 1];
                let b = imageBuffer[idx + 2];

                let distanceTopOrRight = Math.min(y, width - x);
                let distanceBottomOrLeft = Math.min(height - y, x);

                let fadeFactorBrighten = (y < borderWidth || x >= width - borderWidth) ? computeFadeFactor(distanceTopOrRight, maxBrightenFactor) : 1;
                let fadeFactorDarken = (y >= height - borderWidth || x < borderWidth) ? 1 - ((borderWidth - distanceBottomOrLeft) / borderWidth) * (1 - maxDarkenFactor) : 1;

                newBuffer[idx] = clamp(r * fadeFactorBrighten * fadeFactorDarken);
                newBuffer[idx + 1] = clamp(g * fadeFactorBrighten * fadeFactorDarken);
                newBuffer[idx + 2] = clamp(b * fadeFactorBrighten * fadeFactorDarken);

                if (channels === 4) {
                    newBuffer[idx + 3] = imageBuffer[idx + 3]; // Copy alpha channel
                }
            }
        }

        const outputBuffer = await sharp(newBuffer, {
            raw: {
                width,
                height,
                channels
            }
        }).jpeg().toBuffer();

        return outputBuffer;
    } catch (err) {
        console.error('Error in depthEffect:', err);
        throw err;
    }
}

module.exports = depthEffect;

// Example usage
// Replace `yourInputBuffer` with your actual image buffer
// depthEffect({
//     inputBuffer: yourInputBuffer,
//     maxBrightenFactor: 2.0,
//     maxDarkenFactor: 0.5,
//     borderWidth: 15
// })
// .then(outputBuffer => {
//     // Do something with the outputBuffer
// })
// .catch(err => console.error(err));