const openai = require("../config/openai");

const generateImageTitle = async (idea) => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "assistant",
            content: `Describe this prompt "${idea}" in less than six words.`
        }],
        temperature: 0.35,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const title = response.data.choices[0].message.content.replace(/['".]/g, "");
    return title.charAt(0).toUpperCase() + title.slice(1);
};

module.exports = generateImageTitle;