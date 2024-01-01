// import { useQuery } from "@apollo/client";
import Header from "../components/Header/Header";
import RecordButton from "../components/RecordButton/RecordButton";
const Home = () => {
  // const { loading, data } = useQuery(QUERY_PROFILES);
  // const profiles = data?.profiles || [];

  return (
    <main>
      <div>
        <Header />
        <RecordButton />
      </div>
    </main>
  );
};

export default Home;
