// import "./Header.scss";
import { Container, Row, Col } from "react-bootstrap";

export default function Header() {
  return (
    <Container>
      <Row>
        <Col>
          <a href="/" title="Back to Homepage">
            <img
              class="logo"
              src="/talker-logo-whitebg.png"
              alt="Talker App"
              title="Talker App"
            />
          </a>
        </Col>
      </Row>
    </Container>
  );
}
