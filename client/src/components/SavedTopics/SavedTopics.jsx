import "./SavedTopics.scss";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { REMOVE_TOPIC } from "../../../utils/mutations";
import { QUERY_ME } from "../../../utils/queries";
import Auth from "../../../utils/auth";
import { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";

export default function SavedTopics({ username, topics }) {
  const [removeTopic, { error }] = useMutation(REMOVE_TOPIC, {
    refetchQueries: [QUERY_ME, "me"],
  });
  const [editMode, setEditMode] = useState(false);

  const handleRemoveTopic = async (e, topicId) => {
    e.preventDefault();
    console.log("I'm in the handleRemoteTopic, here's my topicId: ", topicId);
    try {
      const { data } = await removeTopic({
        variables: { topicId },
      });
      console.log("remove topic data, ", data);
      console.log("I have removed the topic!");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };
  console.log("This is my topic, ", topics);
  return (
    <section className="savedTopicsSection">
      {Auth.loggedIn() ? (
        <div>
          <h1 className="savedTopicsHeader">{username}'s Saved Topics</h1>
          {editMode ? (
            <MdDoneOutline onClick={(e) => toggleEditMode(e)} />
          ) : (
            <FaEdit onClick={(e) => toggleEditMode(e)} />
          )}{" "}
        </div>
      ) : (
        <></>
      )}
      <div className="savedTopicsContainer">
        <div>
          {topics &&
            topics.map((topic) => (
              <Link
                to={`${topic.topic._id}`}
                key={topic.topic._id}
                className="savedTopicBlock"
              >
                <div>
                  <h4>
                    <span className="savedTopicPromptText">
                      {topic.topic.promptText}
                    </span>
                    {editMode ? (
                      <CiSquareRemove
                        className="removeTopicButton"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTopic(e, topic.topic._id);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </h4>

                  <div>
                    {topic.topic.responses.map((response) => (
                      <li className="savedResponseContainer" key={response._id}>
                        <p className="savedResponseText">
                          {response.responseText}
                        </p>
                        {response.imageURL && (
                          <img
                            src={response.imageURL}
                            className="savedResponseImage"
                            alt={`Response ${response._id}`}
                          />
                        )}
                      </li>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
