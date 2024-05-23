import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import Codice from "./Codice";

function CodiceSuggestions({ codice }) {
  const [suggestedCodices, setSuggestedCodices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!codice.category) return;
    const getSuggestions = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "/api/v1/codice/top-gophed",
          {
            categories: codice.category,
          },
          {
            withCredentials: false,
          },
        );

        setSuggestedCodices(res.data.data.codices);
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSuggestions();
  }, [codice]);

  return (
    <div className="flex w-full flex-col items-center justify-center py-6  drop-shadow-sm">
      <h3 className="mb-6 font-noto text-2xl text-gray-800">Outros Códices</h3>
      {isLoading && <Loader />}
      {error && <Error />}
      {!isLoading &&
        !error &&
        suggestedCodices.map((codice) => (
          <Codice
            key={codice._id}
            codice={codice}
            path={`/codice-desvelado/read/${codice._id}`}
          />
        ))}
    </div>
  );
}

export default CodiceSuggestions;
