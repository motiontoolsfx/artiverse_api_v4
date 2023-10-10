const AWS = require('aws-sdk');
const {
    aws: config
} = require('./config');
AWS.config.update(config);
const s3 = new AWS.S3();

module.exports = s3;