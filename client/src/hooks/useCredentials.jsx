import { useState, useEffect } from "react";
import axios from "axios";

export default function useCredentials() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const getCredentials = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/v1/users/verify", {
          withCredentials: true,
        });

        setUser(response.data.data.user);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCredentials();
  }, []);

  return { isLoading, error, user };
}
