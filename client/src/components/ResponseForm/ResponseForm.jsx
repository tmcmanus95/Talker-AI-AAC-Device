// ResponseForm.jsx
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_RESPONSE } from "../../../utils/mutations";
import { createClient } from "pexels";
import "./ResponseForm.scss";
const ResponseForm = ({ index, responses }) => {
  // const [response, setResponse] = useState("");

  const [addResponse, { error }] = useMutation(ADD_RESPONSE);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleResponseSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addResponse({
        variables: { topicId, responseText, imageURL: imageSrc }, // Use imageSrc here
      });

      setResponse("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if ("speechSynthesis" in window) {
      // getting corresponding gif
      responses.forEach((response, index) => {
        const query = response;

        const client = createClient(
          "THj5EwzyfSVYW1UvgByttwmIlcqXDvRS8AmbWtx587POTV86qPqdfd30"
        );

        client.photos
          .search({ query, per_page: 1 })
          .then((data) => {
            console.log("client.photos data", data);
            const imageSrc =
              data.photos.length > 0 ? data.photos[0].src.medium : null;
            console.log(imageSrc);
            const button = document.getElementById(`button-${index}`);
            button.addEventListener("click", () => speak(response));
            const gif = document.getElementById(`gif-${index}`);
            gif.src = imageSrc;
          })
          .catch((error) => {
            console.error("Error fetching Pexels data:", error);
          });
      });
    }
  }, [responses]);

  return (
    <>
      {responses.map((response, index) => (
        <form className="responseButton" onSubmit={handleResponseSubmit}>
          <div id={`button-${index}`} key={index}>
            <div>
              <p>{response}</p>
              <span>
                <button>save</button>
              </span>
            </div>

            <img id={`gif-${index}`} alt={`gif-${index}`} />
          </div>
        </form>
      ))}
    </>
  );
};

export default ResponseForm;
