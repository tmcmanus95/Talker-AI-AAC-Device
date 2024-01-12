import "./SavedTopics.scss";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { REMOVE_TOPIC } from "../../../utils/mutations";

export default function SavedTopics({ username, topics }) {
  const [removeTopic, { error }] = useMutation(REMOVE_TOPIC);

  const handleRemoveTopic = async (topicId) => {
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
  return (
    <section className="savedTopicsSection">
      <h1 className="savedTopicsHeader">{username}'s Saved Topics</h1>
      <div className="savedTopicsContainer">
        <div>
          {topics &&
            topics.map((topic) => (
              <Link
                to={topic.topic._id}
                key={topic.topic._id}
                className="savedTopicBlock"
              >
                <div>
                  <h4 className="savedTopicPromptText">
                    {topic.topic.promptText}
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
