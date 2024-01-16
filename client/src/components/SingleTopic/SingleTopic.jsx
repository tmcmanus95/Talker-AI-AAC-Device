import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_TOPIC } from "../../../utils/queries";
import "./SingleTopic.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditModal from "../EditModal/EditModal";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";

import { ADD_RESPONSE, REMOVE_RESPONSE } from "../../../utils/mutations";
import { CiSquareRemove } from "react-icons/ci";

export default function SingleTopic() {
  const { topicId } = useParams();
  const [addResponse, { error }] = useMutation(ADD_RESPONSE, {
    refetchQueries: [QUERY_SINGLE_TOPIC, `${topicId}`],
  });
  const [removeResponse, { error: removeResponseError }] = useMutation(
    REMOVE_RESPONSE,
    { refetchQueries: [QUERY_SINGLE_TOPIC, `${topicId}`] }
  );
  const [editMode, setEditMode] = useState(false);

  const handleRemoveResponse = async (topicId, responseId, index, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("here is my topicId, ", topicId);
    console.log("here is my responseId, ", responseId);

    console.log("handle remove function working");
    const { data } = await removeResponse({
      variables: { topicId, responseId },
    });
    console.log("remove reponse data, ", data);
  };

  const addCustomResponse = async (response, imageURL) => {
    try {
      const newCustomResponse = await addResponse({
        variables: {
          topicId: topicId,
          responseText: response,
          imageURL: imageURL,
        },
      });

      console.log("New custom response:", newCustomResponse);
    } catch (error) {
      console.error("Error adding custom response:", error);
    }
  };
  const { loading, data } = useQuery(QUERY_SINGLE_TOPIC, {
    variables: { topicId },
  });

  const responses = data?.topic.responses || [];
  const topicText = data?.topic.promptText;

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = (text) => {
    return () => {
      speak(text);
    };
  };

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
    console.log("edit mode is ", editMode);
  };
  return (
    <form className="singleTopicContainer">
      <div className="prompt-text-container">
        <div className="prompt-text">
          <h2>{topicText}</h2>
          <span className="editIcon">
            {editMode ? (
              <MdDoneOutline onClick={(e) => toggleEditMode(e)} />
            ) : (
              <FaEdit onClick={(e) => toggleEditMode(e)} />
            )}
          </span>
        </div>
      </div>

      <div className="responsesContainer">
        <span>
          {editMode ? (
            <EditModal
              className="editModal"
              addCustomResponse={addCustomResponse}
            />
          ) : (
            <></>
          )}

          {responses.map((response, index) => (
            <form
              onClick={handleSpeak(response.responseText)}
              className="responseButton"
              key={index}
            >
              <Card style={{ width: "20rem" }} id={`button-${index}`}>
                <div className="responseTitleContainer">
                  <Card.Title>{response.responseText}</Card.Title>
                  <span>
                    {editMode ? (
                      <CiSquareRemove
                        type="button"
                        className="removeResponseButton"
                        onClick={(e) =>
                          handleRemoveResponse(topicId, response._id, index, e)
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                <Card.Img
                  src={response.imageURL}
                  alt={`Response Image ${index}`}
                />
              </Card>
            </form>
          ))}
        </span>
      </div>
    </form>
  );
}
