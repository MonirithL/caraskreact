import { useUser } from "../context/UserContext";
import unsetProfile from "../assets/anon_profile.png";
import style from "./UserBlock.module.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

interface UserBlockProps {
  customDesc?: string | null;
}

export default function UserBlock({ customDesc = null }: UserBlockProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  async function moveToSignIn() {
    navigate("/logout", { state: { dest: "/login" } });
  }
  if (!user) {
    return (
      <motion.div
        className={style.card}
        whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
      >
        <div className={style.left}>
          <img src={unsetProfile} alt="" className={style.profile} />
        </div>
        <div className={style.texts}>
          <h3>Sign in to see details</h3>
        </div>
        <motion.button
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileTap={{
            scale: 0.9,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.2,
            },
          }}
          whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
          className={style.signinBtn}
          onClick={moveToSignIn}
        >
          Go to Sign In
        </motion.button>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className={style.card}
        whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
      >
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
          <p>{customDesc == null ? user?.email : customDesc}</p>
        </div>
      </motion.div>
    );
  }
}
