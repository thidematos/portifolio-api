import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useDelete(deleteOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    redirectTo,
    id,
    path = `/api/v1/works/${id}`,
    action,
  } = deleteOptions;

  async function deleteResource() {
    try {
      setIsLoading(true);

      await axios.delete(path, {
        withCredentials: true,
      });

      if (action) action();

      navigate(redirectTo);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { handler: deleteResource, isLoading, error };
}

export default useDelete;
