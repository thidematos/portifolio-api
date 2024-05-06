import axios from 'axios';
import { useEffect, useState } from 'react';

function useGet(
  setter,
  resource,
  path,
  withCredentials,
  setIsLoading,
  setError
) {
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(path, {
          withCredentials: withCredentials,
        });

        setter(res.data.data[resource]);
      } catch (err) {
        setError(err.err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [path, withCredentials, setIsLoading, setError, setter]);
}

export default useGet;
