import { useEffect } from "react"
import style from "./Logout.module.css"
import { API_BASE_AUTH } from "../service/APIBaseUrl"
import { useNavigate } from "react-router";
export default function Logout(){
    const navigate = useNavigate();

    async function logout() {
    const res = await fetch(`${API_BASE_AUTH}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }
    navigate("/", { replace: true });
  }
    useEffect(()=>{
        logout();
    },[])
    return(
        <div className={style.main}>
            <div className={style.center_box}>
                <div className="spinner"></div>
                <h3>Logging out</h3>
            </div>
        </div>
    )
}