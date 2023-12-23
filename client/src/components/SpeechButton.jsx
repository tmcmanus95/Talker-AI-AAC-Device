const SpeechButton = ({ data, speakText }) => {
  return <button onClick={() => speakText(data.text)}>{data.text}</button>;
};

export default SpeechButton;
