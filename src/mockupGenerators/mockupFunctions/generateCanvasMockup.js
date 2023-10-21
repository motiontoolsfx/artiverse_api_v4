const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;
const resizeAndCenter = require("../helpers/resizeAndCenter");
const brightnessContrastEffect = require("../helpers/brightnessContrastEffect");
const overlayTexture = require("../helpers/overlayTexture");
const depthEffect = require("../helpers/depthEffect");
const roundCorners = require("../helpers/roundCorners");
const addShadow = require("../helpers/addShadow");
const addArtiverseLogo = require("../helpers/addArtiverseLogo");

const generateCanvasMockup = async ({
    imageBuffer,
    backgroundFileName,
    resize: {
        x1,
        y1,
        x2
    },
    lighting: {
        brightness,
        contrast
    },
    depthEffect: {
        maxBrightenFactor,
        maxDarkenFactor,
        borderWidth
    },
    corners: {
        amount
    },
    shadow: {
        blurAmount,
        radius,
        offsetX,
        offsetY,
        opacity
    }
}) => {
    try {
        const {
            outputBuffer: resizedImage,
            centerX,
            centerY
        } = await resizeAndCenter({
            inputBuffer: imageBuffer,
            x1,
            y1,
            x2,
        });

        const artiverseLogoPath = path.join(__dirname, '../assets/logo/artiverse_logo.png');
        const artiverseLogoBuffer = await fs.readFile(artiverseLogoPath);

        const imageWithLogo = await addArtiverseLogo({
            inputBuffer: resizedImage,
            logoBuffer: artiverseLogoBuffer,
            padding: 0.02,
            x1,
            y1,
            x2,
            size: 0.05
        });

        const imageWithShadowBrightnessContrast = await brightnessContrastEffect({
            inputBuffer: imageWithLogo,
            brightness,
            contrast
        });

        const texturePath = path.join(__dirname, '../assets/textures/canvas_texture.jpg');
        const textureBuffer = await fs.readFile(texturePath);

        const texturedImage = await overlayTexture({
            inputBuffer: imageWithShadowBrightnessContrast,
            textureBuffer
        });

        const imageWithDepthEffect = await depthEffect({
            inputBuffer: texturedImage,
            maxBrightenFactor,
            maxDarkenFactor,
            borderWidth
        });

        const imageWithRoundedCorners = await roundCorners({
            inputBuffer: imageWithDepthEffect,
            amount,
        });

        const imageWithShadow = await addShadow({
            inputBuffer: imageWithRoundedCorners,
            blurAmount,
            radius,
            offsetX,
            offsetY,
            opacity
        });

        const overlayMetadata = await sharp(imageWithShadow).metadata(); // Get overlay image dimensions

        // Use centerX and centerY to set the top-left corner positions for the overlay image
        const xPos = Math.round(centerX - (overlayMetadata.width / 2));
        const yPos = Math.round(centerY - (overlayMetadata.height / 2));

        const backgroundPath = path.join(
            __dirname,
            `../assets/backgrounds/${backgroundFileName}.jpg`
        );
        const backgroundBuffer = await fs.readFile(backgroundPath);

        const finalBuffer = await sharp(backgroundBuffer)
            .composite([{
                input: imageWithShadow,
                top: yPos,
                left: xPos,
            }, ])
            .toBuffer();

        return finalBuffer;
    } catch (error) {
        console.log(error);
    }
};

module.exports = generateCanvasMockup;