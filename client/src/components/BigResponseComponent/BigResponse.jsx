import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TOPIC, ADD_RESPONSE } from "../../../utils/mutations";
import Accordion from "react-bootstrap/Accordion";
import "./BigResponse.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const BigResponse = ({ userId, promptText, responses, imageURLs }) => {
  const [addTopic, { error: topicError }] = useMutation(ADD_TOPIC);
  const [addResponse, { error: responseError }] = useMutation(ADD_RESPONSE);
  const [topicId, setTopicId] = useState(null);
  const [response, setResponse] = useState("");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  console.log("this is the promptText,", promptText);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const topic = promptText;

    try {
      const topicData = await addTopic({
        variables: { userId, topic },
      });

      const savedTopicId = topicData.data.addTopic.savedTopics[0].topic._id;
      console.log("here's the topic data: ", topicData);
      setTopicId(savedTopicId);
      console.log("This is my saved topid Id, ", savedTopicId);

      for (let i = 0; i < responses.length; i++) {
        try {
          console.log("This is my saved topid Id, ", savedTopicId);
          console.log("this is my response[i], ", responses[i]);
          console.log("this is my imageURLs[i], ", imageURLs[i]);

          await addResponse({
            variables: {
              topicId: savedTopicId,
              responseText: responses[i],
              imageURL: imageURLs[i],
            },
          });
        } catch (responseError) {
          console.error(`Error adding response at index ${i}:`, responseError);
        }
      }
      setResponse("");
    } catch (topicError) {
      console.error("Error adding topic:", topicError);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="saveButtonContainer">
          <Button
            className="saveTopic saveTopicBtn"
            variant="secondary"
            size="sm"
          >
            Save Topic and Responses
          </Button>
        </div>
        <div className="prompt-text-container">
          <div className="prompt-text">
            Prompt Text:
            <span>{promptText}</span>
          </div>
        </div>
        {responses.map((response, index) => (
          <form className="responseButton" key={index}>
            <Card style={{ width: "20rem" }} id={`button-${index}`}>
              <div>
                <Card.Title onClick={speak(response)}>{response}</Card.Title>
              </div>
              <Card.Img
                src={imageURLs[index]}
                alt={`Response Image ${index}`}
              />
            </Card>
          </form>
        ))}
      </form>
    </>
  );
};

export default BigResponse;
