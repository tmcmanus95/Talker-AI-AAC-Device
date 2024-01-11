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
// import config from "../../config";

export default function RecordButton() {
  // console.log(config.serverUrl);
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
      const response = await axios.post(
        `https://ai-aac-db2.onrender.com/api/fetchAnswers`,
        {
          userInput,
        }
      );

      console.log("Response from axios:", response.data);

      const chatGPTResults = response.data.kwargs.content;
      const chatGPTResultsArray = chatGPTResults.split("\n");
      setResponses(chatGPTResultsArray);

      const newImageURLs = [];

      await Promise.all(
        chatGPTResultsArray.map(async (response, index) => {
          try {
            const imageData = await axios.post(
              `https://ai-aac-db2.onrender.com/api/fetchImages`,
              {
                searchTerm: response,
              }
            );

            console.log("Image data:", imageData.data);

            const imageSrc =
              imageData.data.photos.length > 0
                ? imageData.data.photos[0].src.medium
                : null;

            newImageURLs[index] = imageSrc;
          } catch (imageError) {
            console.error("Error fetching image data:", imageError);
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
