import { Pen } from "lucide-react";
import style from "./Progress.module.css";
import ProgressCard from "../component/ProgressCard";
import { useState } from "react";

export default function Progress() {
  const [edit, setEdit] = useState(false);

  function toggleEdit() {
    setEdit(!edit);
  }
  function removeTrack(card_id: string) {
    //remove from the list or map or array
  }
  return (
    <div className={style.main}>
      <div className={`w-full ${style.leadText}`}>
        <h3>Items Currently working on</h3>
        <button
          style={{
            backgroundColor: `${
              edit ? "rgba(var(--main-color-num),0.4)" : "transparent"
            }`,
          }}
          onClick={toggleEdit}
        >
          <Pen className={style.edit} />
        </button>
      </div>
      <div className={`w-full ${style.items}`}>
        <ProgressCard edit={edit} remove={removeTrack} />
      </div>
    </div>
  );
}
