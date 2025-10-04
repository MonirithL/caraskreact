import style from "./ProgressBar.module.css";
interface ProgressBarProps {
  current: number;
  total: number;
}
export default function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <div className={style.outer}>
      <progress className={style.bar} value={current} max={total}></progress>
      <div className={style.counter}>
        <h4>{`${current}/${total}`}</h4>
      </div>
    </div>
  );
}
