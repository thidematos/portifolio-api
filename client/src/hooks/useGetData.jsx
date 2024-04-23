import axios from 'axios';
import { useEffect, useState } from 'react';

function useGetData(path, withCredentials) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(path, {
          withCredentials: withCredentials,
        });

        if (!res.data.data) throw new Error(`Não há nenhum recurso em ${path}`);

        setData(...Object.values(res.data.data));
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [withCredentials, path]);

  return { data, isLoading, setData, error };
}

export default useGetData;
