import { Pen } from "lucide-react";
import style from "./Progress.module.css";
import ProgressCard from "../component/ProgressCard";

export default function Progress() {
  return (
    <div className={style.main}>
      <div className={`w-full ${style.leadText}`}>
        <h3>Items Currently working on</h3>
        <button>
          <Pen className={style.edit} />
        </button>
      </div>
      <div className={`w-full ${style.items}`}>
        <ProgressCard />
      </div>
    </div>
  );
}
