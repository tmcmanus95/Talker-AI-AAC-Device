import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./EditModal.scss";
import { CiCirclePlus } from "react-icons/ci";

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
    try {
      const imageData = await axios.post(
        `https://ai-aac-db2.onrender.com/api/fetchCustomImages`,
        {
          searchTerm: imageSearchTerm,
        }
      );

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
    setCustomResponse("");
    setImageSearchTerm("");
    setPossibleImageURLs([]);
  };

  return (
    <div className="modalContainer">
      {!modal ? (
        <button className="addCustomResponseButton" onClick={toggleModal}>
          <CiCirclePlus /> Add Custom Response
        </button>
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
              <div className="imageOverlay">Select Image</div>
            </div>
          ))}
          <button className="closeButton" onClick={toggleModal}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
