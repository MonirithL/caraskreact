import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { API_BASE_AUTH } from "../service/APIBaseUrl";
export default function AuthLayout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  async function checkAuth() {

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_AUTH}/check`, {
        method: "GET",
        credentials: "include",
      });
      if (res.status !== 200) {
        const data = await res.json();

        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("AuthLayout error: ", err);
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    checkAuth();
  }, [navigate]);

  if (loading) return null;
  return <Outlet />;
}
