import { useState, useEffect } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { useQuery } from "@apollo/client";
import { createClient } from "pexels";
import { QUERY_ME } from "../../../utils/queries";
import ResponseForm from "../ResponseForm/ResponseForm";
import TopicForm from "../TopicForm/TopicForm";
import "./RecordButton.scss";

export default function RecordButton() {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [promptText, setPromptText] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  console.log("Query_Me, ", QUERY_ME);
  console.log("useQuery(QUERY_ME):", useQuery(QUERY_ME));

  const { loading, data } = useQuery(QUERY_ME); //figure out how to get the userId so that the topics / responses can be saved
  console.log("this is data.me._id", data);
  console.log("Record Button Data: ", data);
  const userId = data?.me._id;
  console.log("userId, ", userId);
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
      setPromptText(userInput);
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
      // getting corresponding gif
      responses.forEach((response, index) => {
        const query = response;

        const client = createClient(
          "THj5EwzyfSVYW1UvgByttwmIlcqXDvRS8AmbWtx587POTV86qPqdfd30"
        );

        client.photos
          .search({ query, per_page: 1 })
          .then((data) => {
            console.log("client.photos data", data);
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
      });
    }
  }, [responses]);

  // Speaking functionality
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const responseText = "sample response text";
  const imageURL = "sample imageurl";
  const topicId = "sample topicId";
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
      <TopicForm promptText={promptText} userId={userId} />
      {/* <div className="prompt-text">Prompt Text: {promptText}</div> */}
      <div className="responsesContainer">
        {responses.map((response, index) => (
          <div className="responseButton" id={`button-${index}`} key={index}>
            <div>
              <p>{response}</p>
              <span>
                <button>add</button>
              </span>
            </div>

            <img id={`gif-${index}`}></img>
          </div>
        ))}
      </div>
      <ResponseForm
        responseText={responseText}
        imageURL={imageURL}
        topicId={topicId}
      />
    </div>
  );
}
