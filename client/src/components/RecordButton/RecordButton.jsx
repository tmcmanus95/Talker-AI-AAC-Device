import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
// import { createClient } from "pexels";
import axios from "axios";
import BigResponse from "../BigResponseComponent/BigResponse";
import "./RecordButton.scss";
import { QUERY_ME } from "../../../utils/queries";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

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
      for (let index = 0; index < responses.length; index++) {
        const response = await axios.post(
          "http://localhost:3000/api/fetchImage",
          { searchTerm: responses[index] }
        );

        try {
          const data = response;
          console.log("this is my image data, ", data);
          console.log("This is data.photos ", data.data.photos);
          console.log(
            "This is data.photos.src.medium: ",
            data.data.photos[0].src.medium
          );
          const imageSrc =
            data.data.photos.length > 0 ? data.data.photos[0].src.medium : null;
          newImageURLs[index] = imageSrc;
          console.log("This is my imageSrc, ", imageSrc);
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

    <Container>
      <Row>
        <Col>

   
      <form>
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

      </form>
  
        <BigResponse
          responses={responses}
          promptText={userInput}
          userId={userId}
          imageURLs={imageURLs}
        />    

    </Col>
      </Row>
    </Container>

  );
}