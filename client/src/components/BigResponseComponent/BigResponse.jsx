import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_TOPIC,
  ADD_RESPONSE,
  REMOVE_TOPIC,
} from "../../../utils/mutations";
import { QUERY_ME } from "../../../utils/queries";

import "./BigResponse.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Auth from "../../../utils/auth";

export default function BigResponse({
  userId,
  promptText,
  responses,
  imageURLs,
  isFetchedAnswers,
}) {
  const [addTopic, { error: topicError }] = useMutation(ADD_TOPIC);
  const [removeTopic, { error }] = useMutation(REMOVE_TOPIC);
  const [addResponse, { error: responseError }] = useMutation(ADD_RESPONSE);
  const [savedTopic, setSavedTopic] = useState(false);
  const [removedTopic, setRemovedtopic] = useState(false);
  const [topicId, setTopicId] = useState(null);
  const [response, setResponse] = useState("");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleRemoveTopic = async (topicId) => {
    console.log("I'm in the handleRemoteTopic, here's my topicId: ", topicId);
    try {
      const { data } = await removeTopic({
        variables: { topicId },
      });
      console.log("remove topic data, ", data);
      console.log("I have removed the topic!");
      setRemovedtopic(true);
      setTopicId(null);
      setResponse("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (removedTopic) {
      return;
    }

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
          setSavedTopic(true);
        } catch (responseError) {
          console.error(`Error adding response at index ${i}:`, responseError);
        }
      }
    } catch (topicError) {
      console.error("Error adding topic:", topicError);
    }
  };

  return removedTopic ? (
    <></>
  ) : (
    <>
      <form onSubmit={handleFormSubmit}>
        {Auth.loggedIn() && isFetchedAnswers ? (
          <div className="saveButtonContainer">
            <Button
              className="saveTopic saveTopicBtn"
              variant="secondary"
              size="sm"
              type="submit"
            >
              Save Topic and Responses
            </Button>
            <div className="prompt-text-container">
              <div className="prompt-text">
                <span>{promptText}</span>
                {savedTopic ? (
                  <Button onClick={() => handleRemoveTopic(topicId)}>
                    Remove Topic and Responses
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {responses.map((response, index) => (
          <div
            key={index}
            onClick={() => speak(response)}
            className="responseButton"
          >
            <Card style={{ width: "20rem" }} id={`button-${index}`}>
              <div>
                <Card.Title>{response}</Card.Title>
              </div>
              <Card.Img
                src={imageURLs[index]}
                alt={`Response Image ${index}`}
              />
            </Card>
          </div>
        ))}
      </form>
    </>
  );
}
