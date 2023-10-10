const generatePosterMockup = require("./mockupGenerators/generatePosterMockup");

const generateMockups = async (imageBuffer) => {
    const posterMockup = await generatePosterMockup(imageBuffer);
    return posterMockup;
}

module.exports = generateMockups;