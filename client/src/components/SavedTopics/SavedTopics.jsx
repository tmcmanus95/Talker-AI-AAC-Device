import "./SavedTopics.scss";
export default function SavedTopics({ username, topics }) {
  return (
    <section id="savedTopicsSection">
      <h1>{username}'s Saved Topics</h1>
      <div>
        <div>
          {topics &&
            topics.map((topic) => (
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
            ))}
        </div>
      </div>
    </section>
  );
}
