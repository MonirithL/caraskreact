import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import unsetProfile from "../assets/anon_profile.png";
import style from "./UserBlock.module.css";

export default function UserBlock() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className={style.card}>
        <div className={style.left}>
          <img src={unsetProfile} alt="" className={style.profile} />
        </div>
        <div className={style.texts}>
          <h3>Sign in to see details</h3>
        </div>
        <button>Go to Sign In</button>
      </div>
    );
  } else {
    return (
      <div className={style.card}>
        <div className={style.left}>
          <img
            src={
              user?.profile_img == null || user?.profile_img.length === 0
                ? unsetProfile
                : user?.profile_img
            }
            alt=""
            className={style.profile}
          />
        </div>
        <div className={style.texts}>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
      </div>
    );
  }
}
