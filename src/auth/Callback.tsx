import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Callback() {
  const navigate = useNavigate();
  useEffect(() => {
    const hash = window.location.hash.substring(1); // remove #
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (!accessToken || !refreshToken) {
      console.error("No tokens found in URL");
      return;
    }

    fetch("http://localhost:3000/auth/callback", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken }),
    }).then((res) => {
      if (res.ok) {
        window.location.href = "/home";
      } else {
        console.error("Failed to store tokens on server");
        navigate("/", { replace: true });
      }
    });
  }, []);
  return <></>;
}
