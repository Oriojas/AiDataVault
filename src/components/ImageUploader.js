import React, { Component } from "react";
import { Container } from "react-bootstrap";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      showButton: true,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({
        imageSrc: reader.result,
        showButton: false,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <Container className="container-md">
        {this.state.showButton ? (
          <div className="input-group mt-4 mb-4">
            <input
              className="form-control bg-primary text-white"
              type="file"
              accept="image/*"
              onChange={this.handleImageChange}
            />
          </div>
        ) : (
          <Container className="mt-4 mb-4">
            <img
              src={this.state.imageSrc}
              alt="Imagen cargada"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Container>
        )}
      </Container>
    );
  }
}

export default ImageUploader;
