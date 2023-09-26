import React, { useState, useEffect } from "react";
import { Container, Row, Button, Table } from "react-bootstrap";

export default function Resume() {
  const [showResponse, setShowResponse] = useState(false);
  const [showPoweredBy, setShowPoweredBy] = useState(true);
  const [respuestaJSON, setRespuestaJSON] = useState(
    JSON.parse(localStorage.getItem("respuestaJSON"))
  );

  useEffect(() => {
    // Escuchar cambios en localStorage y actualizar respuestaJSON
    const handleStorageChange = (e) => {
      if (e.key === "respuestaJSON") {
        setRespuestaJSON(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Limpia el evento de escucha al desmontar el componente
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleShowResponseClick = () => {
    setShowResponse(true);
    setShowPoweredBy(false);
  };

  const formatJSONToTable = (json) => {
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(json).map(([key, value]) => (
            <tr key={key}>
              <td className="text-sm">{key}</td>
              <td className="text-sm">{JSON.stringify(value)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <Container>
        <Row className="mt-4">
          {showPoweredBy && (
            <div>
              <h4>Powered by:</h4>
              <img
                src={process.env.PUBLIC_URL + "lh.png"}
                className="img-fluid"
                width="200"
                alt="Lighthouse Logo"
              />
              <p className="text-start mt-3">
                This Dapp is powered by decentralized storage, you can save your
                files with all the LighHouse technology that allows you to
                encrypt as soon as your information is uploaded in a perpetual
                manner
              </p>
            </div>
          )}
          <Button variant="primary" onClick={handleShowResponseClick}>
            Show Response JSON
          </Button>
          {showResponse && respuestaJSON ? (
            <div>
              <div>
                <h6 className="mt-3">Employee Information</h6>
                {formatJSONToTable(respuestaJSON.EmployeeInformation)}
              </div>
              <div>
                <h6>Employer Information</h6>
                {formatJSONToTable(respuestaJSON.EmployerInformation)}
              </div>
              <div>
                <h6>Tax Compensation</h6>
                {formatJSONToTable(respuestaJSON.TaxCompensation)}
              </div>
            </div>
          ) : (
            <div>No Files in local</div>
          )}
        </Row>
      </Container>
    </div>
  );
}
