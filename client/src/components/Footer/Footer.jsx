import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container id="footer">
      <Row>
        <Col>
          <div className="text-center">
            <a
              href="https://github.com/project3-AAC"
              target="_blank"
              className="footer"
            >
              Broca's Basilisk © 2024
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
