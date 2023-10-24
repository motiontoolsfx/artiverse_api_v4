const openai = require("../config/openai");

const generateImageStory = async (idea) => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "assistant",
            content: `Write a short single paragraph story about an image that was generated using AI, from this prompt; "${idea}"`
        }],
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const story = response.data.choices[0].message.content;
    return story;
};

module.exports = generateImageStory;