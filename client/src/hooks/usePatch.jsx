import axios from 'axios';
import { useState } from 'react';

export default function usePatch(patchOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    resource,
    id,
    field,
    newValue,
    setter,
    isImage = false,
  } = patchOptions;

  const data = isImage
    ? newValue
    : {
        [`${field}`]: newValue,
      };

  async function handleSave() {
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `http://127.0.0.1:3000/api/v1/${resource}/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setter(res.data.data[resource]);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { handler: handleSave, isLoading, error };
}
