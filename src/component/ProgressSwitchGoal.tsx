import { X } from "lucide-react";
import style from "./ProgressSwitchGoal.module.css";
import { useState } from "react";

interface PorgressSwitchGoalProps {
  close: () => void;
  current: string | undefined;
  goals: string[];
  setGoal: (goal: string) => void;
}

export default function ProgressSwitchGoal({
  close,
  current,
  goals,
  setGoal,
}: PorgressSwitchGoalProps) {
  const [selectText, setSelectText] = useState<string | null>(null);

  function selectTheText(text: string) {
    setSelectText(text);
  }
  return (
    <div className={style.popcard} onClick={close}>
      <div className={style.maincard} onClick={(e) => e.stopPropagation()}>
        <div className={style.headers}>
          <h3 className={style.orange}>Manage your Goal:</h3>
          <button onClick={close} className={style.closeBtn}>
            <X className={style.closeIcon} />
          </button>
        </div>

        <div className={style.goals}>
          {goals
            .filter((goal) => goal != current)
            .map((goal, index) => (
              <div
                className={style.goalCard}
                key={`${index}000${index} ${goal}`}
              >
                <h4>{goal}</h4>
                <button
                  className={style.switchBtn}
                  onClick={() => {
                    selectTheText(goal);
                  }}
                >
                  <h4>Select</h4>
                </button>
              </div>
            ))}
        </div>
        {selectText != null ? (
          <div className={style.confirmBox}>
            <h3 className={style.orange}>Changing from:</h3>
            <h4>{`${current} -> ${selectText}`}</h4>
            <div className={style.btnWrapper}>
              <button
                className={`${style.switchBtn} ${style.confirmBtn}`}
                onClick={() => {
                  setGoal(selectText);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
