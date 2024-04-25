import axios from 'axios';
import { useState } from 'react';

export default function usePatch(patchOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    resource,
    id,
    field,
    isSectionField,
    newValue,
    setter,
    isImage = false,
    usePath = false,
  } = patchOptions;

  const data = isImage
    ? newValue
    : {
        [`${field}`]: newValue,
      };

  let patchPath;

  if (usePath) {
    patchPath = usePath;
  } else {
    patchPath = isSectionField
      ? `/api/v1/${resource}/${id}/${isSectionField}`
      : `/api/v1/${resource}/${id}`;
  }

  async function handleSave() {
    try {
      setIsLoading(true);
      const res = await axios.patch(patchPath, data, {
        withCredentials: true,
      });
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
