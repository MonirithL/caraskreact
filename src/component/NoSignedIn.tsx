import { useLocation, useNavigate } from "react-router";
import style from "./NotSignIn.module.css";
import { motion } from "motion/react";

export default function NotSignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || "";

  // capitalize first letter
  const capitalized =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  async function moveToSignIn() {
    navigate("/logout", { state: { dest: "/login" } });
  }
  return (
    <div className={style.card}>
      <div className={style.center}>
        <h4>{`To view ${capitalized}, Please Sign in`}</h4>
        <motion.button
          className={style.action}
          onClick={moveToSignIn}
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
        >
          <h3>SIGN IN</h3>
        </motion.button>
      </div>
    </div>
  );
}
