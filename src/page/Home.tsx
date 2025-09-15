import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();
  async function logout() {
    const res = await fetch(`http://localhost:3000/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("sign out failed");
    }
    navigate("/", { replace: true });
  }
  console.log("user avatar: " + user?.avatar_url);
  return (
    <>
      <div>Home</div>
      <div>
        <div>{user?.username}</div>
        <div>{user?.id}</div>
        <div>{user?.email}</div>
        <img
          src={user?.avatar_url??""}
          alt="user_avatar"
          width="100px"
        />
      </div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
