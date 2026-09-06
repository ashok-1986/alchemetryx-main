import OpenAI from "openai";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, ".env.local") });

const client = new OpenAI({
  apiKey: process.env.EXPLABS_API_KEY,
  baseURL: "https://api.experientiallabs.ai/v1",
});

async function main() {
  console.log("Testing Experiential gateway with gpt-6-astra...\n");

  const response = await client.chat.completions.create({
    model: "gpt-6-astra",
    messages: [{ role: "user", content: "Say hello in one sentence." }],
  });

  console.log("Reply:", response.choices[0].message.content);
  console.log("\nToken usage:", JSON.stringify(response.usage, null, 2));
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
