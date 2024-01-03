import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";

// import Auth from "../utils/auth";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  console.log("Here's my data", data);
  console.log("data.me.username, ", data?.me.username);
  const username = data?.me.username;
  const topics = data?.me.savedTopics;
  console.log("topics, ", topics);
  console.log("username, ", username);
  return (
    <section>
      <h1> Welcome, {username}!</h1>
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
    </section>
  );
};

export default Profile;
