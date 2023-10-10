const s3 = require("../config/aws.js");

const uploadImageToS3 = async (buffer, contentType, bucketName, key) => {
    try {
        const data = await s3.upload({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: contentType
        }).promise();
        return data.Location;
    } catch (error) {
        logger.error({
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });
        throw new Error(`An error occurred while uploading the buffer: ${error.message}.`);
    }
};

module.exports = uploadImageToS3;