import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import RecordButton from "../components/RecordButton/RecordButton";
import { Container, Row, Col } from "react-bootstrap";
import SavedTopics from "../components/SavedTopics/SavedTopics";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const username = data?.me.username;
  const topics = data?.me.savedTopics;

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
