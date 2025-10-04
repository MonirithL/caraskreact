import { motion } from "motion/react";
import style from "./Discovery.module.css";

export default function Discovery() {
  return (
    <motion.div className={style.main}>
      <div className={style.ds_wrapper}>
        <h1>Basic Discovery</h1>
        <p>
          Discovery your career path! <br />
          You will go through a quick qna for a great experience.
        </p>
        <div className={style.button_wrapper}>
          <button>
            <h6>START</h6>
          </button>
        </div>
      </div>
      <div className={style.other_wrp}>
        <h4>Others</h4>
      </div>
      <div className={style.items_wrp}>
        <h1>Specific desicory</h1>
      </div>
    </motion.div>
  );
}
