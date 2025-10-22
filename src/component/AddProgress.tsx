import { X } from "lucide-react";
import style from "./AddProgress.module.css";
import { useEffect, useState } from "react";
import type { Progress } from "../type/Progress";
import { motion } from "motion/react";

interface AddProgressProps {
  close: () => void;
  add: (text: string) => void;
  recommended: string[];
  alreadyFull: Progress[] | null;
  goal: string | undefined;
  refresh: () => void;
}

export default function AddProgress({
  close,
  add,
  recommended,
  alreadyFull,
  goal,
  refresh,
}: AddProgressProps) {
  const [already, setAlready] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const textarr: string[] = alreadyFull?.map((item) => item.text) ?? [];
    setAlready(textarr);
  }, [alreadyFull]);
  useEffect(() => {
    if (goal !== undefined && recommended?.length === 0) {
      refresh();
    }
  }, []);

  return (
    <div className={style.popUp} onClick={close}>
      <div className={style.addProgCard} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <h3>Add new Progress item!</h3>
          <button className={style.closeBtn} onClick={close}>
            <X className={style.cancelIcon} />
          </button>
        </div>
        <div className={style.inputRow}>
          <input
            className={style.input}
            type="text"
            placeholder="Enter a task to see and keep track"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <div className={style.recoms}>
          {goal === undefined ? (
            <h4>To get recomended Progress tasks, Please set a Goal!</h4>
          ) : (
            <h4>Things recomended to tracks:</h4>
          )}

          {goal !== undefined && recommended?.length === 0 ? (
            <div className={style.center}>
              <div className={style.spinner}></div>
              <p>Loading recommendations...</p>
            </div>
          ) : (
            Array.isArray(recommended) &&
            recommended
              .filter((rec) => !already.includes(rec))
              .map((rec, index) => (
                <div
                  key={`${rec}-${index}`}
                  className={style.recItems}
                  onClick={() => {
                    setInput(rec);
                  }}
                >
                  <p>{rec}</p>
                </div>
              ))
          )}
        </div>
        {input?.length === 0 ? (
          <></>
        ) : (
          <div className={`w-full ${style.finishBox}`}>
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
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              className={style.finish}
              onClick={() => add(input.trim())}
            >
              <h4>Start Tracking!</h4>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
