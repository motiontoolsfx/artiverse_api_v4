const {
    Configuration,
    OpenAIApi
} = require('openai');
const {
    openai: config
} = require('./config');

const configuration = new Configuration({
    organization: config.organization,
    apiKey: config.apiKey,
});
const openai = new OpenAIApi(configuration);

module.exports = openai;