import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_TOPIC } from "../../../utils/mutations";

// import Auth from "../../../utils/auth";

const TopicForm = ({ userId, promptText }) => {
  const [topic, setTopic] = useState("");

  const [addTopic, { error }] = useMutation(ADD_TOPIC);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("The topic is, ", topic);
    try {
      const data = await addTopic({
        variables: { userId, topic },
      });

      setTopic("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <button>Topic Form Add Button</button>
      <div className="prompt-text">
        Prompt Text:
        <span onChange={(event) => setTopic(event.target.value)}>
          {promptText}
        </span>
      </div>
    </form>
  );
};

export default TopicForm;
