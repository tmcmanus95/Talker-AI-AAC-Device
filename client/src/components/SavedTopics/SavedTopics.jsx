import "./SavedTopics.scss";
import { Link } from "react-router-dom";
export default function SavedTopics({ username, topics }) {
  return (
    <section id="savedTopicsSection">
      <h1>{username}'s Saved Topics</h1>
      <div>
        <div>
          {topics &&
            topics.map((topic) => (
              <Link to={topic.topic._id}>
                <div key={topic.topic._id}>
                  <div>
                    <h4>{topic.topic.promptText}</h4>
                    <ul>
                      {topic.topic.responses.map((response) => (
                        <li key={response._id}>
                          <p>{response.responseText}</p>
                          {response.imageURL && <img src={response.imageURL} />}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
