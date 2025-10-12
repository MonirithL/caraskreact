import { useEffect, useState } from "react";
import style from "./ProgressCard.module.css";
import { motion } from "motion/react";
import { Trash } from "lucide-react";
import type { Progress } from "../type/Progress";

interface ProgressCardProps {
  edit: boolean;
  remove: (pid: number) => Promise<Progress | null>;
  update: (pid: number, completed: boolean) => Promise<Progress | null>;
  progress: Progress;
  refresh: () => void;
}
export default function ProgressCard({
  edit,
  remove,
  progress,
  refresh,
  update,
}: ProgressCardProps) {
  const [prog, setProg] = useState(0);
  async function complete() {
    //change to update id then refresh
    setProg(1);
    const prognew = await update(progress.id, 1 ? true : false);
    if (prognew != null) {
      refresh();
    }
  }
  useEffect(() => {
    setProg(progress.completed ? 1 : 0);
  }, []);
  async function removeInner() {
    const deleteProg = await remove(progress.id);
    if (deleteProg != null) {
      refresh();
    }
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
          <h5>{progress.text}</h5>
        </div>
        {edit ? (
          <motion.button
            className={style.action}
            onClick={removeInner}
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
            <Trash style={{ height: "var(--p)", width: "var(--p)" }} />
            <h5>Remove</h5>
          </motion.button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
