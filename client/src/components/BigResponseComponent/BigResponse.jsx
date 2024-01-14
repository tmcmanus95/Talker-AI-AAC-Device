import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_TOPIC,
  ADD_RESPONSE,
  REMOVE_TOPIC,
  REMOVE_RESPONSE,
} from "../../../utils/mutations";

import "./BigResponse.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Auth from "../../../utils/auth";
import EditModal from "../EditModal/EditModal";
import { QUERY_SINGLE_TOPIC } from "../../../utils/queries";
import { useLocation, Link } from "react-router-dom";

export default function BigResponse({
  userId,
  promptText,
  responses,
  imageURLs,
  isFetchedAnswers,
  addCustomResponse,
}) {
  const [addTopic, { error: topicError }] = useMutation(ADD_TOPIC);
  const [removeTopic, { error }] = useMutation(REMOVE_TOPIC);
  const [addResponse, { error: responseError }] = useMutation(ADD_RESPONSE);
  const [savedTopic, setSavedTopic] = useState(false);
  const [removedTopic, setRemovedtopic] = useState(false);
  const [topicId, setTopicId] = useState(null);
  const [responseIds, setResponseIds] = useState([]);
  const [response, setResponse] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  const [removeResponse, { error: removeResponseError }] = useMutation(
    REMOVE_RESPONSE,
    { refetchQueries: [QUERY_SINGLE_TOPIC, `${topicId}`] }
  );
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

  // const updateResponse = (response, imageURL) => {
  //   setResponse;
  // };

  const handleRemoveResponse = async (topicId, responseId, index) => {
    console.log("here is my topicId, ", topicId);
    console.log("here is my responseId, ", responseId);

    console.log("handle remove function working");
    if (savedTopic) {
      const { data } = await removeResponse({
        variables: { topicId, responseId },
      });
      setResponseIds((prevResponseIds) => {
        const newResponseIds = [...prevResponseIds];
        newResponseIds.splice(index, 1);
        return newResponseIds;
      });
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
          console.log("here's my imageURLs[i]", imageURLs[i]);
          const responseMutationResult = await addResponse({
            variables: {
              topicId: savedTopicId,
              responseText: responses[i],
              imageURL: imageURLs[i],
            },
          });
          console.log(
            "here is my responseMutationResult",
            responseMutationResult
          );
          console.log(
            "here is my responseMutationResult.data.addResponse.responses[i]._id",
            responseMutationResult.data.addResponse.responses[i]._id
          );

          const addedResponseId =
            responseMutationResult.data.addResponse.responses[i]._id;
          console.log("here is my addedResponseId", addedResponseId);
          setResponseIds((prevResponseIds) => [
            ...prevResponseIds,
            addedResponseId,
          ]);
          console.log("here are my responseIds, ", responseIds);
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
        ) : isFetchedAnswers ? (
          <div>Login to save and customize responses!</div>
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
              {/* <Button
                onClick={() =>
                  handleRemoveResponse(topicId, responseIds[index])
                }
              >
                Remove Response
              </Button> */}
            </Card>
          </div>
        ))}
        {isFetchedAnswers && !savedTopic ? (
          <EditModal
            className="responseButton"
            addCustomResponse={addCustomResponse}
            savedTopic={savedTopic}
          />
        ) : (
          <></>
        )}
        {savedTopic ? <Link to={`/${topicId}`}>Edit Topic</Link> : <></>}
      </form>
    </>
  );
}
