import { Col, Container, Row } from "react-bootstrap";
import Connection from "./components/Connection";
import ImageUploader from "./components/ImageUploader";
import DescriptionForm from "./components/DescriptionForm";
import "../src/styles.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <Container className="text-center">
          <h1>AiDataVault</h1>
        </Container>
        <Container className="container-md">
          <Row>
            <Col className="col-md-12 text-center shadow-lg border border-white border-1 rounded-4 mt-4">
              <Connection></Connection>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-7 text-center shadow-lg border border-white border-1 rounded-4 mt-4">
              <ImageUploader></ImageUploader>
            </Col>
            <Col className="col-md-1"></Col>
            <Col className="col-md-4 text-center shadow-lg border border-white border-1 rounded-4 mt-4">
              <DescriptionForm></DescriptionForm>
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
                  <h4>LightHause</h4>
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
