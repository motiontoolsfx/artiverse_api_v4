const {
    default: axios
} = require("axios");
const {
    stabilityai
} = require("../config/config");

const aspectRatioToPixelMap = {
    "1x1": [1024, 1024],
    "3x2": [1216, 832],
    "2x1": [1344, 768],
    "2x3": [832, 1216],
    "1x2": [768, 1344]
};

const generateImage = async (idea, size) => {
    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${stabilityai.apiKey}`,
    };

    const imageSettings = {
        steps: 50,
        width: aspectRatioToPixelMap[size][0],
        height: aspectRatioToPixelMap[size][1],
        seed: 0,
        cfg_scale: 7,
        samples: 1,
        text_prompts: [{
            text: idea,
            weight: 1,
        }, ],
    };

    const url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

    const imageResponse = await axios.post(url,
        imageSettings, {
            headers
        });

    const imageBuffers = [];

    imageResponse.data.artifacts.forEach(async (image, index) => {
        const imageBuffer = Buffer.from(image.base64, 'base64');
        imageBuffers.push(imageBuffer);
    });

    return imageBuffers[0];
}

module.exports = generateImage;