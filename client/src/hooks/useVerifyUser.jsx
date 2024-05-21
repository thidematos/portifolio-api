import axios from "axios";
import { useEffect, useState } from "react";

function useVerifyUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const res = await axios.get("/api/v1/users/verify-user", {
          withCredentials: true,
        });

        setUser(res.data.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    verifyLogin();
  }, []);

  return [user, setUser];
}

export default useVerifyUser;
