import "./SavedTopics.scss";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { REMOVE_TOPIC } from "../../../utils/mutations";
import { QUERY_ME } from "../../../utils/queries";
import Auth from "../../../utils/auth";

export default function SavedTopics({ username, topics }) {
  const [removeTopic, { error }] = useMutation(REMOVE_TOPIC, {
    refetchQueries: [QUERY_ME, "me"],
  });

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
  console.log("This is my topic, ", topics);
  return (
    <section className="savedTopicsSection">
      {Auth.loggedIn() ? (
        <h1 className="savedTopicsHeader">{username}'s Saved Topics</h1>
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTopic(e, topic.topic._id);
                      }}
                    >
                      X
                    </button>
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
