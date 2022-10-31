import { useState, useEffect } from "react";
import { useApi } from "../context";
// use fermentorEvent hook 
export function useFermentorEvents(props) {
  let api = useApi();

  const [isLoading, setIsLoading] = useState(true);
  const [fermentorEvents, setFermentorEvents] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let results = null;

      results = await api.getFermentorEvents(props);
      if (results.success) {
        let { data } = results;
        setFermentorEvents(data);
      } else {
        let { message } = results;
        setHasError(true);
        setErrorMessage(message);
      }
      setIsLoading(false);
    };

    fetchData();
    return () => {
      return [fermentorEvents, isLoading, hasError, errorMessage];
    };
  }, []);

  return { fermentorEvents, isLoading, hasError, errorMessage };
}
