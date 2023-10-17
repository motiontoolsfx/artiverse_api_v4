const generateCanvasMockup = require("../mockupGenerators/mockupFunctions/generateCanvasMockup");
const generatePosterMockup = require("../mockupGenerators/mockupFunctions/generatePosterMockup");

const generateMockups = async (imageBuffer) => {
    const canvasMockup = await generateCanvasMockup({
        imageBuffer,
        backgroundFileName: "modern_wall",
        resize: {
            x1: 362,
            y1: 222,
            x2: 662,
        },
        lighting: {
            brightness: 50,
            contrast: -0.2
        },
        depthEffect: {
            maxBrightenFactor: 1.5,
            maxDarkenFactor: 0.75,
            borderWidth: 2
        },
        corners: {
            amount: 2
        },
        shadow: {
            blurAmount: 4,
            radius: 0,
            offsetX: -5,
            offsetY: 5,
            opacity: 0.5
        }
    });

    const canvasMockup2 = await generateCanvasMockup({
        imageBuffer,
        backgroundFileName: "living_room_wall",
        resize: {
            x1: 362,
            y1: 222,
            x2: 662,
        },
        lighting: {
            brightness: 50,
            contrast: -0.2
        },
        depthEffect: {
            maxBrightenFactor: 1.5,
            maxDarkenFactor: 0.75,
            borderWidth: 2
        },
        corners: {
            amount: 2
        },
        shadow: {
            blurAmount: 4,
            radius: 0,
            offsetX: -5,
            offsetY: 5,
            opacity: 0.5
        }
    });

    const canvasMockup3 = await generatePosterMockup({
        imageBuffer,
        backgroundFileName: "dresser_with_plants",
        resize: {
            x1: 362,
            y1: 222,
            x2: 662,
        },
        lighting: {
            brightness: 50,
            contrast: -0.2
        },
        shadow: {
            blurAmount: 4,
            radius: 0,
            offsetX: -3,
            offsetY: 3,
            opacity: 0.3
        }
    });

    return [canvasMockup, canvasMockup2, canvasMockup3];
}

module.exports = generateMockups;