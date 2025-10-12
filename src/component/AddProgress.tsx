import { X } from "lucide-react";
import style from "./AddProgress.module.css";
import { useEffect, useState } from "react";
import type { Progress } from "../type/Progress";

interface AddProgressProps {
  close: () => void;
  add: (text: string) => void;
  recommended: string[];
  alreadyFull: Progress[] | null;
}

export default function AddProgress({
  close,
  add,
  recommended,
  alreadyFull,
}: AddProgressProps) {
  const [already, setAlready] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const textarr: string[] = alreadyFull?.map((item) => item.text) ?? [];
    setAlready(textarr);
  }, [alreadyFull]);

  return (
    <div className={style.popUp}>
      <div className={style.addProgCard}>
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
          <h4>Things recomended to tracks:</h4>
          {Array.isArray(recommended)
            ? recommended
                .filter((rec) => !already.includes(rec))
                .map((rec, index) => (
                  <div key={`${rec}-${index}`} className={style.recItems}>
                    <p>{rec}</p>
                  </div>
                ))
            : null}
        </div>
        {input.length === 0 ? (
          <></>
        ) : (
          <div className="w-full">
            <button className={style.finish} onClick={() => add(input.trim())}>
              Start Tracking!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
