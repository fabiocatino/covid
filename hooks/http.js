import React, { useCallback, useState } from 'react';
import axios from 'axios';


const useHttp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const sendHttp = useCallback(async (config, transformData) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get(config.url);
      const data = await response;
      transformData(data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      console.log(error)
      // throw new Error("Something went wrong")
    }
  }, []);
  return { isLoading, error, sendHttp };
};

export default useHttp;
