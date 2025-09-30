import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import style from "./Home.module.css";
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

  // async function getTest() {
  //   const res = await fetch(`${API_BASE_TEST}/`, {
  //     method: "GET",
  //     credentials: "include",
  //   });
  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log(`data: ${JSON.stringify(data)}`);
  //   } else {
  //     console.log("failed to get data");
  //   }
  // }
  return (
    // <>
    //   <div>Home</div>
    //   <div>
    //     <div>{user == null ? "this is null" : "Not null"}</div>
    //     <div>{user?.username}</div>
    //     <div>{user?.id}</div>
    //     <div>{user?.email}</div>
    //     <Avatar src={user?.avatar_url ?? "DEFAULT"} alt="default_avatar" />
    //   </div>
    //   <button onClick={logout}>Logout</button>
    // </>
    //if user not NULL then return a user tracking
    <div className={style.home}>
      <div className={style.item_card}>
        <h1>Discovery</h1>
        <p>Quickly self discover with out point system questionnaire</p>
        <button>
          <p>START</p>
        </button>
      </div>
      <div className={style.item_card}>
        <h1>Exploration</h1>
        <p>Ready yourself with information related to your interests</p>
        <button>
          <p>START</p>
        </button>
      </div>
    </div>
  );
}
