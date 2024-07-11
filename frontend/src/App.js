import React  from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TableFile from './components/TableFile';
import './App.css';

function App() {

  return (
    <Container fluid className="bg-light min-vh-100 p-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h1" className="text-center mb-4">Files Data</Card.Title>
              <TableFile />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
