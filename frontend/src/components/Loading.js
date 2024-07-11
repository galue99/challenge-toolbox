import React from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const Loading = () => {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="auto">
          <Spinner animation="border" role="status" />
        </Col>
      </Row>
    </Container>
  );
}

export default Loading;
