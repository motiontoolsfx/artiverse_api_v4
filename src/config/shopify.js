const Shopify = require('shopify-api-node');
const {
    shopify: config
} = require('./config');

const shopify = new Shopify({
    shopName: config.shopName,
    accessToken: config.accessToken
});

module.exports = shopify;