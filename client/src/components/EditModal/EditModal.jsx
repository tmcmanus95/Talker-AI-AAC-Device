import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./EditModal.scss";

export default function EditModal({ addCustomResponse }) {
  const [customResponse, setCustomResponse] = useState("");
  const [customImageURL, setCustomImageURL] = useState("");
  const [imageSearchTerm, setImageSearchTerm] = useState("");
  const [possibleImageURLs, setPossibleImageURLs] = useState([]);
  const [modal, setModal] = useState(false);

  const handleInputChange = (e) => {
    setCustomResponse(e.target.value);
  };

  const handleImageSearchTermChange = (e) => {
    setImageSearchTerm(e.target.value);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  const fetchCustomImageOptions = async () => {
    console.log("I am working");
    try {
      const imageData = await axios.post(
        `http://localhost:3000/api/fetchCustomImages`,
        {
          searchTerm: imageSearchTerm,
        }
      );

      console.log("Image data:", imageData);
      console.log("Imagedata.data.photos", imageData.data.photos);
      const newImages = imageData.data.photos;
      setPossibleImageURLs(newImages);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const handleSelectImage = (url) => {
    setCustomImageURL(url);
    addCustomResponse(customResponse, url);
    setModal(!modal);
  };

  return (
    <div className="modalContainer">
      {!modal ? (
        <button onClick={toggleModal}>+</button>
      ) : (
        <div>
          <Form.Control
            className="mb-3 customResponseInput"
            type="text"
            value={customResponse}
            onChange={handleInputChange}
            placeholder="Enter a custom response"
          />
          <Form.Control
            className="mb-3 customSearchTermInput"
            type="text"
            value={imageSearchTerm}
            onChange={handleImageSearchTermChange}
            placeholder="Enter an image search term"
          />
          <div className="d-grid gap-2">
            <Button
              className="fetch-button"
              variant="secondary"
              size="lg"
              onClick={fetchCustomImageOptions}
            >
              Search Custom Image
            </Button>
          </div>
          {possibleImageURLs.map((possibleImage) => (
            <div
              className="possibleImageContainer"
              key={possibleImage.id}
              onClick={() => handleSelectImage(possibleImage.src.medium)}
            >
              <img
                className="possibleImage"
                src={possibleImage.src.medium}
              ></img>
            </div>
          ))}
          <button onClick={toggleModal}>close</button>
        </div>
      )}
    </div>
  );
}
