// Import and configure dotenv to load environment variables
import { config } from "dotenv";
config(); // Loads environment variables from .env

// Import required modules from OpenAI
import OpenAI from "openai";

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this matches your .env file's variable name
});

// Create a readline interface for command-line input/output
import readline from "readline";
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Enter your prompt: ",
});

// Display the prompt to the user
userInterface.prompt();

// Handle user input line by line
userInterface.on("line", async (input) => {
  try {
    // Send a request to OpenAI's API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });

    // Output the response
    console.log(response.choices[0].message.content);

    // Prompt the user for the next input
    userInterface.prompt();
  } catch (error) {
    console.error("Error generating response:", error);
    userInterface.prompt();
  }
});
