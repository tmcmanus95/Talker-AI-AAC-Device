import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TOPIC, ADD_RESPONSE } from "../../../utils/mutations";
// import "./BigResponse.scss";
import Accordion from 'react-bootstrap/Accordion';

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
          // Add your error handling logic here
        }
      }
      ("");
      setResponse("");
    } catch (topicError) {
      console.error("Error adding topic:", topicError);
      // Add your error handling logic here
    }
  };


  return (

    <>
     
    <form onSubmit={handleFormSubmit}>
      <button className="saveTopicBtn">Save Topic and Responses</button>
      <div className="prompt-text">
        Prompt Text:
        <span>{promptText}</span>
      </div>
      </form>

      <Accordion defaultActiveKey="{index}">
      {responses.map((response, index) => (
        <Accordion.Item eventKey="{index}">
        <form className="responseButton">
          <div id={`button-${index}`}>
          <Accordion.Header>{response}</Accordion.Header>
            {/* <div>
              <p>{response}</p>
            </div> */}
             <Accordion.Body>
            <img src={imageURLs[index]} alt={`Response Image ${index}`} />
            </Accordion.Body>
          </div>
        </form>
        </Accordion.Item>
      ))}
   

    </Accordion>
    </>
  );
};

export default BigResponse;
