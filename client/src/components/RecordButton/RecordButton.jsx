import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { createClient } from "pexels";
import axios from "axios";
import BigResponse from "../BigResponseComponent/BigResponse";
import "./RecordButton.scss";
import { QUERY_ME } from "../../../utils/queries";

export default function RecordButton() {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [promptText, setPromptText] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const { loading, data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (!loading && data && data.me) {
      setUserId(data.me._id);
    }
  }, [loading, data]);

  const fetchAnswersAndImages = async () => {
    try {
      // Make a request to your server
      const response = await axios.post(
        "http://localhost:3000/api/fetchAnswers",
        { userInput }
      );
      console.log("here's the response from axios, ", response);
      console.log(
        "response.data.kwargs.content: ",
        response.data.kwargs.content
      );
      const chatGPTResults = response.data.kwargs.content;
      const chatGPTResultsArray = chatGPTResults.split("\n");
      console.log("chatGPTResultsArray");
      setResponses(chatGPTResultsArray);
      console.log("here is the responses variable, ", responses);
      const newImageURLs = [];
      for (let index = 0; index < responses.length; index++) {
        const query = responses[index];

        const client = createClient(
          "THj5EwzyfSVYW1UvgByttwmIlcqXDvRS8AmbWtx587POTV86qPqdfd30"
        );

        try {
          const data = await client.photos.search({ query, per_page: 1 });
          const imageSrc =
            data.photos.length > 0 ? data.photos[0].src.medium : null;
          newImageURLs[index] = imageSrc;
        } catch (error) {
          console.error("Error fetching Pexels data:", error);
        }
      }

      setImageURLs(newImageURLs);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
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
      <button className="fetch-button" onClick={fetchAnswersAndImages}>
        Fetch
      </button>

      <div>
        <BigResponse
          responses={responses}
          promptText={promptText}
          userId={userId}
          imageURLs={imageURLs}
        />
      </div>
    </div>
  );
}
