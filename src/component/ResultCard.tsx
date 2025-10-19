import {Plus } from "lucide-react";
import style from "./ResultCard.module.css";

interface ResultCardProps {
  index: string;
  fit: boolean;
  title: string;
  description: string;
  reasons: string[];
}
export default function ResultCard({
  fit,
  reasons,
  title,
  index,
  description,
}: ResultCardProps) {
  return (
    <div className={`${!fit ? style.notfitting : style.card}`}>
      <div className={style.header}>
        {fit ? <div className={style.largeNumbering}>{index}</div> : <></>}
        {fit ? <h3>{title}</h3> : <h4>{title}</h4>}
      </div>
      <div className={style.desc_wrapper}>
        <p>{description}</p>
      </div>
      <div className={style.reasons_wrapper}>
        {fit ? (
          reasons.map((reason, index) => (
            <div className={style.reason} key={title + index}>
              <Plus className={style.reason_icon} />
              <h5 className={style.reason_text}>{reason}</h5>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
