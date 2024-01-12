import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_TOPIC } from "../../../utils/queries";
import "./SingleTopic.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function SingleTopic() {
  const { topicId } = useParams();
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

  return (
    <form>
      <div className="prompt-text-container">
        <div className="prompt-text">
          Prompt Text: {topicText}
          <span>
            {responses.map((response, index) => (
              <form
                onClick={handleSpeak(response.responseText)}
                className="responseButton"
                key={index}
              >
                <Card style={{ width: "20rem" }} id={`button-${index}`}>
                  <div>
                    <Card.Title>{response.responseText}</Card.Title>
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
      </div>
    </form>
  );
}
