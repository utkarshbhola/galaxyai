import { task } from "@trigger.dev/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runLLMTask = task({
  id: "run-llm-task",

  run: async (payload: { prompt: string }) => {
    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY!
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(payload.prompt);

    return result.response.text();
  },
});
