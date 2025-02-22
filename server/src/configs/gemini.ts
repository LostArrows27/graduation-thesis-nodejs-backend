import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./setting";

const genAI = new GoogleGenerativeAI(config.gemini_api_key);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite-preview-02-05",
});

export default model;
