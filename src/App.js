import { Col, Container, Row } from "react-bootstrap";
import Connection from "./components/Connection";
import "../src/styles.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <Container className="text-center">
          <h1>AiDataVault</h1>
        </Container>
        <Container>
          <Row>
            <Col className="col-md-12 text-center shadow-lg border border-secondary border-2 rounded mt-4">
              <Connection></Connection>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-7 text-center shadow-lg border border-secondary border-2 rounded mt-4">
              <h2>SimpleBox</h2>
            </Col>
            <Col></Col>
            <Col className="col-md-4 text-center shadow-lg border border-secondary border-2 rounded mt-4">
              <h2>SimpleBox</h2>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
