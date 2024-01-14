import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_ME } from "../../utils/queries";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import RecordButton from "../components/RecordButton/RecordButton";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import SavedTopics from "../components/SavedTopics/SavedTopics";

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
   <Container className="profilePageContainer">

      <RecordButton />
   
      <hr />

        <Row>
          <Col>
            <h1> Welcome, {username}!</h1>

            <p className="intro">Below are your saved topics and responses:</p>
            <SavedTopics username={username} topics={topics} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
