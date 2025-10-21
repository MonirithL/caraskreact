import { useNavigate, Outlet } from "react-router";
import { useEffect } from "react";
import { API_BASE_AUTH } from "../service/APIBaseUrl";
export default function NoAuthLayout() {
  const navigate = useNavigate();

  async function checkAuth() {

    try {
      const res = await fetch(`${API_BASE_AUTH}/check`, {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 200) {
        const data = await res.json();
        navigate("/home", { replace: true });
      }
      
    } catch (err) {

      navigate("/", { replace: true });
      
    }
  }
  useEffect(() => {
    checkAuth();
  }, [navigate]);
  return <Outlet />;
}
