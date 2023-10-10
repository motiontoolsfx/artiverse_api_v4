const openai = require("../config/openai");

function startsWithYesOrNo(inputString) {
    // Remove any preceding apostrophes
    inputString = inputString.replace(/^'+/, '').trim();

    // Convert to lowercase for case-insensitive comparison
    const lowerInputString = inputString.toLowerCase();

    // Check if the string starts with "Yes" or "No"
    if (lowerInputString.startsWith('yes')) {
        return true;
    } else if (lowerInputString.startsWith('no')) {
        return false;
    }

    // If neither "Yes" nor "No" is found, look for the first 'y' or 'n'
    const firstY = lowerInputString.indexOf('y');
    const firstN = lowerInputString.indexOf('n');

    // Check the positions of 'y' and 'n', and return true if 'y' comes first
    if (firstY !== -1 && (firstN === -1 || firstY < firstN)) {
        return true;
    } else if (firstN !== -1) {
        return false;
    }

    return false;
}

const containsBannedPhrase = async (txt) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant",
                content: `Yes or No. Is this text at all inappropriate or can it be used inappropriately? "${txt}"`
            }],
            temperature: 0,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const responseTxt = response.data.choices[0].message.content;
        return (startsWithYesOrNo(responseTxt));
    } catch (error) {
        console.log("Error with gpt verifying prompt.")
    }
};

module.exports = {
    containsBannedPhrase
};