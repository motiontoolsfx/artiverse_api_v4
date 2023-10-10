require('dotenv').config();

module.exports = {
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1',
    },
    openai: {
        organization: process.env.OPENAI_ORGANIZATION,
        apiKey: process.env.OPENAI_API_KEY,
    },
    stabilityai: {
        apiKey: process.env.STABILITY_AI_API_KEY
    },
    shopify: {
        shopName: process.env.SHOPIFY_SHOP_NAME,
        apiKey: process.env.SHOPIFY_API_KEY,
        password: process.env.SHOPIFY_PASSWORD,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN
    }
};