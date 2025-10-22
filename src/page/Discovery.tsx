import { motion } from "motion/react";
import style from "./Discovery.module.css";
import { useNavigate } from "react-router";
import UserBlock from "../component/UserBlock";
import { useEffect, useState } from "react";
import type { Session } from "../type/Session";
import { getCompletedSession } from "../service/HistoryFetch";
import HistoryCard from "../component/HistoryCard";
import { useUser } from "../context/UserContext";

export default function Discovery() {
  const { user } = useUser();
  const navigate = useNavigate();

  function goto_basic() {
    navigate("/qna");
  }

  const [history, setHistory] = useState<Session[] | null>(null);

  async function getData() {
    const data = await getCompletedSession();
    if (data != null) {
      setHistory(data);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div className={style.main}>
      <UserBlock />
      <motion.div
        className={style.ds_wrapper}
        whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
      >
        <h1>Basic Discovery</h1>
        <p>
          Discovery your career path! <br />
          You will go through a quick qna for a great experience.
        </p>
        <div className={style.button_wrapper}>
          <motion.button
            onClick={goto_basic}
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
          >
            <h6>START</h6>
          </motion.button>
        </div>
      </motion.div>
      <div className={style.other_wrp}>
        {user !== null ? (
          <h4>History</h4>
        ) : (
          <h5>To View History, Please sign in!</h5>
        )}
      </div>
      <div className={style.items_wrp}>
        {history?.map((hist) => (
          <HistoryCard key={`${hist.id}${hist.created_at}`} session={hist} />
        ))}
        {/* <motion.button className={style.item} onClick={goto_specific}>
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
        </motion.button> */}
      </div>
    </motion.div>
  );
}
