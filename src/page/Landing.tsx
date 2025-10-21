import sty from "./Landing.module.css";
import landing from "../assets/landing.png";
import { useNavigate } from "react-router";

import { motion } from "motion/react";
import { API_BASE_AUTH } from "../service/APIBaseUrl";
import AppbarLogo from "../component/AppbarLogo";
import { useEffect } from "react";

function Landing() {
  const navigate = useNavigate();

  const API_BASE = API_BASE_AUTH; // express server

  async function loginAsGuest() {
    const res = await fetch(`${API_BASE}/guest`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }
    navigate("/home", { replace: true });
  }

  async function action_guest() {
    await loginAsGuest();
  }
  async function action_start() {
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    const hasVisited = localStorage.getItem("userVisited");
    if (!hasVisited) {
      console.log("Welcome! This is your first visit.");

      action_guest();

      localStorage.setItem("userVisited", "true");
    }
  }, []);
  return (
    <div className={sty.main}>
      <div className={sty.decor}>
        <div className={sty.circles}></div>
      </div>

      <div className={sty.contents}>
        <motion.div className={sty.contents_in}>
          <h2 className="white">Welcome</h2>
          <p className={`white ${sty.contents_in_text}`}>
            Explore the app, find your self and reaffirm your choices!
          </p>
        </motion.div>
        <div className={sty.image}>
          <img src={landing} alt="" className={sty.image_inner} />
        </div>
      </div>

      <div className={sty.coaster_wrap}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={sty.coaster}
        ></motion.div>
      </div>

      <div className={sty.inputs}>
        <div className={sty.header}>
          <AppbarLogo alter={true} min={true} />
        </div>

        <div className={sty.buttons}>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
            className={sty.startbtntext}
            onClick={action_start}
          >
            <h2>Get Started</h2>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
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
            onClick={action_guest}
          >
            <h2 className={sty.guesttext}>Continue as Guest</h2>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
