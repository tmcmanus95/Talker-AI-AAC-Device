import SpeechButton from "./SpeechButton";

const SpeechButtonList = ({ chatGPTResponses }) => {
  return (
    <ul>
      {chatGPTResponses.map((response) => (
        <li key={response.id}>
          <SpeechButton data={response} />
        </li>
      ))}
    </ul>
  );
};

export default SpeechButtonList;
