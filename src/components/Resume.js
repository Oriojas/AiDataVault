import React from "react";
import { Container, Row } from "react-bootstrap";

export default function Resume() {
  return (
    <div>
      <Container>
        <Row className="mt-4">
          <img
            src={process.env.PUBLIC_URL + "lh.png"}
            className="img-fluid"
            width="200"
          ></img>
          <p class="text-start mt-3">
            This Dapp is powered by decentralized storage, you can save your
            files with all the LighHouse technology that allows you to encrypt
            as soon as your information is uploaded in a perpetual manner
          </p>
        </Row>
      </Container>
    </div>
  );
}
