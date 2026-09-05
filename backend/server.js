import express from "express";
const app = express();
app.use(express.json());
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors());

const ai = new GoogleGenAI({});
app.post("/tina", async (req, res) => {
  const { conversation } = req.body;
  const prompt = `this the conversation: ${JSON.stringify(conversation)}
You are tina an ai insurance consultant for turners cars use the conversation to guide your responses.
The first question has been asked and you are to continue the conversation with the customer.
If they dont want help end the convosation,
If they do want help continue.
You are to ask only one question at a time and make it very short to try and figure out witch of the 3 products would be best for the customer.
Only send words and not symbols like !@#$%^&* and do not use any emojis
Do not ask them witch one they want you have to reccomend it.
The products that could help are as follows,
Mechanical Breakdown Insurance (MBI),
Comprehensive Car Insurance,
Third Party Car Insurance.
There are 2 business rules: 
MBI is not available to trucks and racing cars,
And Comprehensive Car Insurance is only available to any motor vehicles less than 10 years old.
After no more then 6 questions or you are cnfident in witch product to reccomend then give them 1 or 2 reccomendation  give them a short explaination why you chose these ones.`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.7-flash",
    input: prompt,
  });
  res.json({ tinaResponse: interaction.output_text });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
