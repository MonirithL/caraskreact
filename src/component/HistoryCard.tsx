import { motion } from "motion/react";
import style from "./HistoryCard.module.css";
import type { Session } from "../type/Session";
import { useNavigate } from "react-router";

interface HistoryProps {
  session: Session;
}

export default function HistoryCard({ session }: HistoryProps) {
  const navigate = useNavigate();
  function goto() {
    navigate("/history", { state: { session: session } });
  }
  function formatDateTime(isoString: string): string {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day}-${month}-${year} at ${time}`;
  }
  return (
    <div className={style.card}>
      <div className={style.textWrapper}>
        <h4>Basic Discovery</h4>
        <p>{formatDateTime(session.created_at)}</p>
      </div>
      <div className={style.buttonBox}>
        <motion.button
          onClick={goto}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileTap={{
            scale: 0.95,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.2,
            },
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        >
          See Answered
        </motion.button>
      </div>
    </div>
  );
}
