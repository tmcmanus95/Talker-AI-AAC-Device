import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import RecordButton from "../components/RecordButton/RecordButton";

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

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
<>
    <Header />
    <Navbar />
    <RecordButton />

    <hr />

    <Container>
      <Row>
        <Col>
      <h1> Welcome, {username}!</h1>

      <p className="intro">Below are your saved topics and responses:</p>

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
      </Col>
      </Row>
    </Container>
    </>

  );
};

export default Profile;
