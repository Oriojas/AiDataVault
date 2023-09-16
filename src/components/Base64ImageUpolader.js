import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

function Base64ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [uploadedImage, setUploadedImage] = useState(false);

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
    try {
      const response = await axios.post(
        "https://eb10-204-199-66-51.ngrok-free.app/uploadImage",
        {
          img: base64Image,
        }
      );
      console.log("Respuesta del servidor:", response.data);
      setUploadedImage(true);
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
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
      {uploadedImage && <div>Imagen subida con éxito</div>}
    </div>
  );
}

export default Base64ImageUploader;
