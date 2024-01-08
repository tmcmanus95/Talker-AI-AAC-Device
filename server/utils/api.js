const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");

const fetchAnswers = async (userInput) => {
  const openAIApiKey = process.env.OPENAI_API_KEY;
  console.log(openAIApiKey);

  if (!openAIApiKey) {
    console.error("could not find it!");
    return;
  }

  const llm = new ChatOpenAI({ openAIApiKey });

  const promptTemplate =
    "You are in a AAC device. Give 10 1-5 word responses to the following topic or question to be used as a button to be pressed by an adult with developmental disabilities. do not start the response with a number separate each new response with a new line: {promptText}";

  const responsePrompt = PromptTemplate.fromTemplate(promptTemplate);
  const responseChain = responsePrompt.pipe(llm);

  try {
    const result = await responseChain.invoke({
      promptText: userInput,
    });

    console.log("this is what I got back from chatgpt, ", result);
    console.log("Question or Topic:", userInput);
    console.log("Chat GPT Responses:", result.content);
    return result;
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
};
