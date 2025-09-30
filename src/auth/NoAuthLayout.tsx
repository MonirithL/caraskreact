import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { API_BASE_AUTH } from "../service/APIBaseUrl";
export default function NoAuthLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_AUTH}/`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          return { user: null };
        }
        throw new Error(`Unexpected status: ${res.status}`);
      })
      .then((data) => {
        if (!data.user) {
          //do nth
        } else {
          //if user then redirect
          navigate("/home", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        //do nth
      });
  }, [navigate]);
  return <Outlet />;
}
