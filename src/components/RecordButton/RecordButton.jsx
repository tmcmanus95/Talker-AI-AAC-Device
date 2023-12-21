import { useState, useEffect } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { createClient } from "pexels";
import "./RecordButton.scss";
export default function FetchButton() {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const fetchAnswers = async () => {
    const openAIApiKey = ""; // todo: add to a .env file

    const llm = new ChatOpenAI({ openAIApiKey });

    const promptTemplate =
      "You are in a AAC device. Give 10 1-5 word responses to the following topic or question to be used as a button to be pressed by an adult with developmental disabilities. do not start the response with a number separate each new resposne with a new line: {promptText}";

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

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const gifAPIKey = "00i0GbbklHCvJrFCh4J39nvyQb3SUtwb&q"; //todo, add to an env file
      const imageAPIKey = "lYuomr2uMS5O4SjkT948S0W4HmTEnIEy8rOOLNcv8h8";
      // getting corresponding gif
      responses.forEach((response, index) => {
        // const gifRequestUrl = `https://api.giphy.com/v1/gifs/search?api_key=${gifAPIKey}=${response}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
        // console.log(response.toLowerCase().trim());
        // const imageRequestURL = `https://api.unsplash.com/photos/?client_id=${imageAPIKey}&page=1&query=${response
        //   .toLowerCase()
        //   .trim()}`;
        // fetch(gifRequestUrl)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const gifUrl =
        //       data.data.length > 0 ? data.data[0].images.original.url : null;
        //     console.log(gifUrl);
        //     const button = document.getElementById(`button-${index}`);
        //     button.addEventListener("click", () => speak(response));
        //     const gif = document.getElementById(`gif-${index}`);
        //     gif.src = gifUrl;
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching GIF data:", error);
        //   });
        const query = response;

        const client = createClient();

        client.photos
          .search({ query, per_page: 1 })
          .then((data) => {
            console.log(data);
            const imageSrc =
              data.photos.length > 0 ? data.photos[0].src.medium : null;
            console.log(imageSrc);
            const button = document.getElementById(`button-${index}`);
            button.addEventListener("click", () => speak(response));
            const gif = document.getElementById(`gif-${index}`);
            gif.src = imageSrc;
          })
          .catch((error) => {
            console.error("Error fetching Pexels data:", error);
          });
        // ...
        // fetch(imageRequestURL)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(imageRequestURL);
        //     console.log(data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      });
    }
  }, [responses]);

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
        onChange={handleInputChange}
        placeholder="Enter a topic or question"
        className="input-field"
      />
      <button className="fetch-button" onClick={fetchAnswers}>
        Fetch
      </button>
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
