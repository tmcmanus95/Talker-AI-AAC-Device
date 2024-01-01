import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_RESPONSE } from "../../../utils/mutations";

import Auth from "../../../utils/auth";

const ResponseForm = ({ topicId, responseText, imageURL }) => {
  const [response, setResponse] = useState("");

  const [addResponse, { error }] = useMutation(ADD_RESPONSE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addResponse({
        variables: { topicId, responseText, imageURL },
      });

      setResponse("");
    } catch (err) {
      console.error(err);
    }
  };

  return <div>Hi</div>;
};

export default ResponseForm;
