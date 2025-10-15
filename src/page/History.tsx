import { useEffect, useRef, useState } from "react";
import { getHistoryBySessionID } from "../service/HistoryFetch";
import type { QnaHistory } from "../type/QnaHistory";
import { useLocation, useNavigate } from "react-router";
import type { Session } from "../type/Session";
import style from "./History.module.css";
import { ArrowLeft } from "lucide-react";

export default function History() {
  const location = useLocation();
  const hasLoaded = useRef(false);
  const navigate = useNavigate();
  const { session } = (location.state as { session: Session }) || {};
  const [history, setHistory] = useState<QnaHistory[] | null>(null);

  async function getData() {
    const data = await getHistoryBySessionID(session.id);
    if (data != null) {
      setHistory(data);
      console.log(JSON.stringify(data));
    }
  }

  useEffect(() => {
    if (session && !hasLoaded.current) {
      hasLoaded.current = true;
      getData();
    }
  }, [session]);
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

  if (!hasLoaded) {
    return (
      <div className={`${style.main} ${style.center}`}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.btnabs}>
          <button
            onClick={() => {
              navigate("/discovery", { replace: true });
            }}
          >
            <ArrowLeft />
          </button>
        </div>
        <h1>History</h1>
      </div>

      <div className={style.info}>
        <h3>
          Basic Discovery taken on:&nbsp;{formatDateTime(session.created_at)}
        </h3>
      </div>

      {history?.length === 0 ? (
        <div className={`${style.main} ${style.center}`}>
          <h3 className="orange">No Question and Answers data found</h3>
        </div>
      ) : (
        <div className={style.histBody}>
          {history?.map((hist, index) => (
            <div
              key={hist.created_at}
              className={`${style.histCard} ${
                index !== history.length - 1 ? style.border : ""
              }`}
            >
              <div>
                <h4 className="orange">Question:&nbsp;</h4>
                <h5>{hist.questionText}</h5>
              </div>
              <div>
                <h5 className="orange"> Your answer:&nbsp;</h5>
                <p>{hist.answerText}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
