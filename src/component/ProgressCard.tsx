import { useState } from "react";
import style from "./ProgressCard.module.css";
import { motion } from "motion/react";

export default function ProgressCard() {
  const [prog, setProg] = useState(0);
  function complete() {
    setProg(1);
  }
  return (
    <div className={style.card}>
      <div className={style.background}></div>
      <div
        className={style.progress}
        style={{
          width: `${prog * 100}%`,
        }}
      ></div>
      <div className={style.content}>
        <div className={style.text}>
          <h5>Learn English</h5>
        </div>
        <motion.button
          className={style.action}
          onClick={complete}
          whileTap={{
            scale: 0.9,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.2,
            },
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        >
          {prog !== 1 ? "Complete" : "Completed"}
        </motion.button>
      </div>
    </div>
  );
}
