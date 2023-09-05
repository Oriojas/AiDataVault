import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function DescriptionForm() {
  const [description, setDescription] = useState("");
  const [showResumeLabel, setShowResumeLabel] = useState(false);

  const handleResumeClick = () => {
    setShowResumeLabel(true);
  };

  const handleIPFSClick = () => {
    // Coloca aquí la lógica para manejar el botón IPFS, si es necesario.
  };

  return (
    <Form>
      <Form.Group controlId="description">
        <Form.Label className="form-label mt-2">Description:</Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      {!showResumeLabel ? (
        <Button
          className="mt-2 mb-2"
          variant="primary"
          onClick={handleResumeClick}
        >
          Resume
        </Button>
      ) : (
        <div>
          <Form.Group>
            <Form.Label className="form-label mt-2">Resume:</Form.Label>
            <p className="mt-2">{description}</p>
          </Form.Group>

          <Form.Group>
            <Button
              className="mb-2"
              variant="secondary"
              onClick={handleIPFSClick}
            >
              SAVE IPFS
            </Button>
          </Form.Group>
        </div>
      )}
    </Form>
  );
}

export default DescriptionForm;
