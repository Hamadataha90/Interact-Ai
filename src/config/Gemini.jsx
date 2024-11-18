





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













