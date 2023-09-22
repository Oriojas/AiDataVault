import { Col, Container, Row } from "react-bootstrap";
import Connection from "./components/Connection";
import Base64ImageUploader from "./components/Base64ImageUpolader";
import Resume from "./components/Resume";
import "../src/styles.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <Container className="text-center">
          <Row>
            <Col className="col-md-8">
              <img
                src={process.env.PUBLIC_URL + "logo.png"}
                className="img-fluid"
                width="200"
              ></img>
            </Col>
            <Col className="col-md-4 mt-5">
              <h4>The AI solution to save data in a decentralized way</h4>
            </Col>
          </Row>
        </Container>
        <Container className="container-md">
          <Row>
            <Col className="col-md-12 text-center shadow-lg border border-white border-1 rounded-4 mt-4">
              <Connection></Connection>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-7 text-center shadow-lg border border-white border-1 rounded-4 mt-4">
              <Base64ImageUploader></Base64ImageUploader>
            </Col>
            <Col className="col-md-1"></Col>
            <Col className="col-md-4 text-center shadow-lg border border-white border-1 rounded-4 mt-4">
              <Resume></Resume>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-12 text-center shadow-lg border border-white border-1 rounded-4 mt-4">
              <Row>
                <Col className="col-md-3 mt-2">
                  <h4>FileCoin</h4>
                </Col>
                <Col className="col-md-3 mt-2">
                  <h4>Chainlink</h4>
                </Col>
                <Col className="col-md-3 mt-2">
                  <h4>LightHouse</h4>
                </Col>
                <Col className="col-md-3 mt-2">
                  <h4>IPFS</h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
