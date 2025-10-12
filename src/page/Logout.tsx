import { useEffect } from "react";
import style from "./Logout.module.css";
import { API_BASE_AUTH } from "../service/APIBaseUrl";
import { useLocation, useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dest = location.state?.dest || "/";
  async function logout() {
    console.log(`preparing to call ${API_BASE_AUTH}/logout`);
    const res = await fetch(`${API_BASE_AUTH}/logout`, {
      method: "GET",
      credentials: "include",
    });
    console.log("logout called after fetch");

    if (!res.ok) {
      console.log("res not ok");
      throw new Error("logout failed");
    }
    navigate(dest, { replace: true });
  }
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className={style.main}>
      <div className={style.center_box}>
        <div className="spinner"></div>
        <h3>Logging out</h3>
      </div>
    </div>
  );
}
