import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ethers } from "ethers";
import axios from "axios";
import lighthouse from "@lighthouse-web3/sdk";

function Base64ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [uploadedImage, setUploadedImage] = useState(false);
  const [respuestaJSON, setRespuestaJSON] = useState(null);
  const [wallet, setWallet] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Nuevo estado

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const storedResponse = localStorage.getItem("respuestaJSON");
    if (storedResponse) {
      setRespuestaJSON(JSON.parse(storedResponse));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setUploadedImage(false);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64Image(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = async () => {
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const publicKey = await signer.getAddress();

    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    console.log(signedMessage);

    try {
      const response = await axios.post(
        "https://3c1f-186-155-169-52.ngrok-free.app/uploadImage",
        {
          img: base64Image,
          signedMessage: signedMessage,
          publicKey: publicKey,
        }
      );
      console.log("Respuesta del servidor:", response);
      setUploadedImage(true);

      localStorage.setItem("respuestaJSON", JSON.stringify(response.data));
      setRespuestaJSON(response.data);
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    }
  };

  const handleSubmitClick = async () => {
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const publicKey = await signer.getAddress();

    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    console.log(signedMessage);

    if (uploadedImage) {
      const jsonToSend = {
        cid: respuestaJSON.cid,
        wallet: wallet,
        signedMessage: signedMessage,
        publicKey: publicKey,
      };

      try {
        // Realiza una solicitud POST al endpoint deseado con el JSON
        const response = await axios.post(
          "https://3c1f-186-155-169-52.ngrok-free.app/access",
          jsonToSend
        );
        console.log("Respuesta del servidor:", response);
        // Puedes realizar acciones adicionales después de enviar el formulario
        setShowSuccessMessage(true); // Muestra el mensaje de éxito
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    }
  };

  return (
    <div className="container-md mt-4">
      <input
        type="file"
        className="form-control bg-primary text-white"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <Container className="mt-4 mb-4">
          <img
            src={base64Image}
            alt="Imagen cargada"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Container>
      )}
      {selectedImage && !uploadedImage && (
        <button
          className="btn btn-primary mt-2 mb-3"
          onClick={handleUploadClick}
        >
          Send IPFS Base64
        </button>
      )}
      {uploadedImage && (
        <div className="alert alert-dark">
          Image uploaded and encrypted successfully!
        </div>
      )}
      <h5 className="text-start mb-2 mt-4">
        You can share your information with another wallet
      </h5>
      {uploadedImage && (
        <Form>
          <Form.Group className="text-start mt-4" controlId="cid">
            <Form.Label>CID:</Form.Label>
            <Form.Control type="text" value={respuestaJSON.cid} readOnly />
          </Form.Group>
          <Form.Group className="text-start" controlId="wallet">
            <Form.Label>Wallet:</Form.Label>
            <Form.Control
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary mt-4"
            onClick={handleSubmitClick} // Llama a la función al hacer clic en Submit
          >
            Share info NFT
          </Button>
        </Form>
      )}
      {showSuccessMessage && (
        <div className="alert alert-primary mt-3">Successfully shared!</div>
      )}
    </div>
  );
}

export default Base64ImageUploader;
