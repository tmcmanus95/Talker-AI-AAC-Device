import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_RESPONSE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const ResponseForm = ({ profileId }) => {
  const [response, setResponse] = useState("");

  const [addResponse, { error }] = useMutation(ADD_RESPONSE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addResponse({
        variables: { topicId, response },
      });

      setResponse("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="responsesContainer">
        {responses.map((response, index) => (
          <div className="responseButton" id={`button-${index}`} key={index}>
            <p>{response}</p>
            <img id={`gif-${index}`}></img>
          </div>
        ))}
      </div>{" "}
    </form>
  );
};

export default SkillForm;
