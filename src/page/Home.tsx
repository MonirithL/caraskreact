// import { useNavigate } from "react-router";
import { useNavigate } from "react-router";
import UserBlock from "../component/UserBlock";
import style from "./Home.module.css";
import { motion } from "motion/react";
export default function Home() {
  const navigate = useNavigate();
  function goToDiscovery() {
    navigate("/discovery");
  }
  function goToExploration() {
    navigate("/explore");
  }

  return (
    <div className={style.home}>
      <UserBlock />
      <motion.div
        className={style.item_card}
        whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
      >
        <h1>Discovery</h1>
        <p>Quickly self discover with our point system questionnaire</p>
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
          whileHover={{ scale: 1.04, transition: { duration: 0.1 } }}
          onClick={goToDiscovery}
        >
          <p>START</p>
        </motion.button>
      </motion.div>
      <motion.div
        className={style.item_card}
        whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
        // transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1>Exploration</h1>
        <p>Ready yourself with information related to your interests</p>
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
          whileHover={{ scale: 1.04, transition: { duration: 0.1 } }}
          onClick={goToExploration}
        >
          <p>START</p>
        </motion.button>
      </motion.div>
    </div>
  );
}
