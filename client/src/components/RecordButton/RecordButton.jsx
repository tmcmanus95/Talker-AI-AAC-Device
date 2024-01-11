import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
// import { createClient } from "pexels";
import axios from "axios";
import BigResponse from "../BigResponseComponent/BigResponse";
import "./RecordButton.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
      console.log("chatGPTResultsArray, ", chatGPTResultsArray);
      setResponses(chatGPTResultsArray);
      console.log("here is the responses variable, ", responses);
      const newImageURLs = [];
      await Promise.all(
        chatGPTResultsArray.map(async (response, index) => {
          try {
            const imageData = await axios.post(
              "http://localhost:3000/api/fetchImage",
              { searchTerm: response }
            );
            console.log("this is my image data, ", imageData);
            console.log("This is data.photos ", imageData.data.photos);
            console.log(
              "This is data.photos.src.medium: ",
              imageData.data.photos[0].src.medium
            );
            const imageSrc =
              imageData.data.photos.length > 0
                ? imageData.data.photos[0].src.medium
                : null;
            newImageURLs[index] = imageSrc;
            console.log("This is my imageSrc, ", imageSrc);
          } catch (error) {
            console.error("Error fetching Pexels data:", error);
          }
        })
      );

      setImageURLs(newImageURLs);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  return (
    <div>
      <Form.Control
        className="mb-3"
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter a topic or question"
      />
      <div className="button-container">
        <div className="d-grid gap-2">
          <Button
            className="fetch-button"
            variant="secondary"
            size="lg"
            onClick={fetchAnswersAndImages}
          >
            Fetch
          </Button>
        </div>
      </div>

      <div>
        <BigResponse
          responses={responses}
          promptText={userInput}
          userId={userId}
          imageURLs={imageURLs}
        />
      </div>
    </div>
  );
}
