// import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { apiKey, apiKey1, apiKey2, apiKey3 } from "./Apis";
// import { apiKeys } from "./Apis";
// import { OpenAI } from "openai";

// // Initialize GoogleGenerativeAI with the first available API key
// // const genAI = new GoogleGenerativeAI(apiKey || apiKey1 || apiKey2 || apiKey3);

// // const model = genAI.getGenerativeModel({
// //     model: "gemini-1.5-flash",
    
// // });


// const selectedApiKey = apiKeys.google.find(key => key)||
//     apiKeys.openai.find(key => key) ;

    

// const genAI = new GoogleGenerativeAI(selectedApiKey);

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-pro-latest",
// })





// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// async function runChat(prompt) {
//     // Start a new chat session with the specified generation configuration
//     const chatSession = await model.startChat({
//         generationConfig,
//         history: [],
//     });

//     // Send the message and receive the response
//     const result = await chatSession.sendMessage(prompt);
//     const responseText = result.response.text(); // Extract the text from the response
//     console.log(responseText);
//     return responseText; // Return the extracted text
// }

// export default runChat;









import { GoogleGenerativeAI } from "@google/generative-ai";
import { apiKeys } from "./Apis";
import { OpenAI } from "openai";

const selectedApiKey =
    apiKeys.google.find(key => key) || 
    apiKeys.openAI.find(key => key) ||
    apiKeys.orgId.find(key => key);

if (!selectedApiKey) {
    throw new Error("No valid API key found.");
}

const genAI = apiKeys.google.find(key => key)
    ? new GoogleGenerativeAI(selectedApiKey)
    : new OpenAI({ apiKey: selectedApiKey, dangerouslyAllowBrowser: true });

const model = apiKeys.google.find(key => key)
    ? genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    })
    : { model: "gpt-3.5-turbo" };

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function runChat(prompt) {
    const chatSession = await model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    console.log(responseText);
    return responseText;
}

export default runChat;













