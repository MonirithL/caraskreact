import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { API_BASE_AUTH } from "../service/APIBaseUrl";
export default function AuthLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  function checkAuth() {
    fetch(`${API_BASE_AUTH}/`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        if (!data.user) {
          navigate("/");
        } else {
          // console.log(data);
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }
  useEffect(() => {
    checkAuth();
  }, [navigate]);

  return <Outlet />;
}
