import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/", {
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
          console.log(data);
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <main className="auth-page">
      <Outlet />
    </main>
  );
}
