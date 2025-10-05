import { motion } from "motion/react";
import style from "./Discovery.module.css";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function Discovery() {
  const navigate = useNavigate();

  function goto_basic() {}

  function goto_specific() {}

  return (
    <motion.div className={style.main}>
      <div className={style.ds_wrapper}>
        <h1>Basic Discovery</h1>
        <p>
          Discovery your career path! <br />
          You will go through a quick qna for a great experience.
        </p>
        <div className={style.button_wrapper}>
          <button onClick={goto_basic}>
            <h6>START</h6>
          </button>
        </div>
      </div>
      <div className={style.other_wrp}>
        <h4>Others</h4>
      </div>
      <div className={style.items_wrp}>
        <motion.button className={style.item} onClick={goto_specific}>
          <div className={style.item_text}>
            <h2>Specific Discovery</h2>
            <h5>Find if you are geared toward a career!</h5>
          </div>
          <div className={style.item_btn}>
            <div className={style.item_inner_btn}>
              <h4>START</h4>
              <ChevronRight
                className={style.item_inner_symbol}
                strokeWidth={3}
              />
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
