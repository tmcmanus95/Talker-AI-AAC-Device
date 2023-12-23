import SpeechButtonList from "./SpeechButtonList";
import response from "./ChatGPT"; // Adjust the import statement

const ChatComponent = () => {
  const [chatGPTResponses, setChatGPTResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChatGPTResponse();
        setChatGPTResponse(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>ChatGPT Responses</h1>
      {/* Render the response here */}
      <p>{response}</p>
      <SpeechButtonList chatGPTResponses={chatGPTResponses} />
    </div>
  );
};

export default ChatComponent;
