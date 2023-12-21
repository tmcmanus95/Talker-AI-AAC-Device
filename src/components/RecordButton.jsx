import { useState, useEffect } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

export default function FetchButton() {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const fetchAnswers = async () => {
    const openAIApiKey = "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"; // todo: add to a .env file

    const llm = new ChatOpenAI({ openAIApiKey });

    const promptTemplate =
      "You are in a AAC device. Give 25 1-5 word responses to the following topic or question to be used as a button to be pressed by an adult with developmental disabilities. do not start the response with a number: {promptText}";

    const responsePrompt = PromptTemplate.fromTemplate(promptTemplate);
    const responseChain = responsePrompt.pipe(llm);
    setResponses([]);

    try {
      const result = await responseChain.invoke({
        promptText: userInput,
      });
      console.log("Question or Topic:", userInput);
      console.log("Chat GPT Responses:", result.content);
      // Create an array of responses split at new line
      setResponses(result.content.split("\n"));
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  // Speaking functionality
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={handleInput}
        placeholder="Enter a topic or question"
      />
      <button onClick={fetchAnswers}>Fetch</button>
      <div className="responsesContainer">
        {responses.map((response, index) => (
          <div className="responseButton" id={`button-${index}`} key={index}>
            <p>{response}</p>
            <img id={`gif-${index}`}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
