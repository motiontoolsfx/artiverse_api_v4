const generateCanvasMockup = require("../mockupGenerators/mockupFunctions/generateCanvasMockup");
// const generatePosterMockup = require("../mockupGenerators/mockupFunctions/generatePosterMockup");

const generateMockups = async (imageBuffer) => {
    const allMockups = await Promise.all([
        generateCanvasMockup({
            imageBuffer,
            backgroundFileName: "white",
            resize: {
                x1: 100,
                y1: 100,
                x2: 924
            },
            lighting: {
                brightness: 50,
                contrast: -0.2
            },
            depthEffect: {
                maxBrightenFactor: 1.5,
                maxDarkenFactor: 0.75,
                borderWidth: 4
            },
            corners: {
                amount: 12
            },
            shadow: {
                blurAmount: 5,
                radius: 0,
                offsetX: -8,
                offsetY: 5,
                opacity: 0.35
            }
        }),
        generateCanvasMockup({
            imageBuffer,
            backgroundFileName: "modern_wall",
            resize: {
                x1: 379,
                y1: 148,
                x2: 693
            },
            lighting: {
                brightness: 40,
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
                opacity: 0.35
            }
        }),
        generateCanvasMockup({
            imageBuffer,
            backgroundFileName: "living_room_wall",
            resize: {
                x1: 355,
                y1: 202,
                x2: 669
            },
            lighting: {
                brightness: 55,
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
                opacity: 0.35
            }
        }),
        generateCanvasMockup({
            imageBuffer,
            backgroundFileName: "dresser_with_plants",
            resize: {
                x1: 355,
                y1: 102,
                x2: 669
            },
            lighting: {
                brightness: 55,
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
                opacity: 0.35
            }
        })
    ]);

    return allMockups;
};

module.exports = generateMockups;