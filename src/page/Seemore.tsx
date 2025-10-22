import { useEffect, useState } from "react";
import { getSeemore } from "../service/ExploreFetch";
import type { Seemore } from "../type/Seemore";
import { useLocation, useNavigate } from "react-router";
import style from "./Seemore.module.css";
import { ChevronLeft } from "lucide-react";
import loadingImg from "../assets/loading.gif";
import { useUser } from "../context/UserContext";
interface LocationState {
  title: string; // replace with your session type
  terms: string[];
}
export default function SeemoreExplore() {
  const { user } = useUser();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const title = state?.title ?? "Return nothing, title is none";
  const terms = state?.terms ?? [];
  const [seemore, setSeemore] = useState<Seemore | null>();
  async function getSeemoreData() {
    setLoading(true);
    const data: Seemore | null = await getSeemore(title);
    if (data != null) {
      setSeemore(data);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!seemore) {
      getSeemoreData();
    }
  }, [seemore]);

  function goback() {
    navigate("/explore", { replace: true, state: { terms: terms } });
  }
  function defineClassForDiff(diff: string) {
    const classmap: Record<string, string> = {
      seamless: style.seamless,
      easy: style.easy,
      medium: style.medium,
      hard: style.hard,
      "very hard": style.veryhard,
    };
    return classmap[diff.toLowerCase()] ?? "";
  }

  if (loading) {
    return (
      <div className={style.loading}>
        {user?.paidGroup || user?.paidPersonal ? (
          <img src={loadingImg} alt="" className={style.loadingImg} />
        ) : (
          <div className="spinner"></div>
        )}
        <h2>Collecting Valuable details for you!</h2>
        <h3>Please wait</h3>
      </div>
    );
  }

  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.back}>
          <button className={style.backbtn} onClick={goback}>
            <ChevronLeft />
          </button>
        </div>
        <div>
          <h2>Details</h2>
        </div>
      </div>
      <div className={style.body}>
        <div className={style.title}>
          <h3>{seemore?.title}</h3>
          <p>{seemore?.description}</p>
        </div>

        <div className={style.requirements}>
          <h3>{seemore?.title} requirements:</h3>
          <div className={style.reqlist}>
            {seemore?.requirements?.map((req) => (
              <p className={style.req}>-&nbsp;{req}</p>
            ))}
          </div>
        </div>
        <div className={`${style.transall} `}>
          {seemore?.goal !== null ? (
            <div className={`${style.transcard}`}>
              <h3 className={style.ext}>If you were to change:</h3>
              <h4>
                From "{seemore?.goal}" to "{seemore?.title}"
              </h4>
            </div>
          ) : (
            <></>
          )}
          {seemore?.goal !== null &&
          seemore?.transitioning_diff != null &&
          seemore.transitioning !== null ? (
            <div className={`${style.transitioning}`}>
              <div className={style.rowtext}>
                <div>Changing difficulty:&nbsp;</div>
                <div
                  className={`${defineClassForDiff(
                    seemore?.transitioning_diff ?? "unknown"
                  )}`}
                >
                  {seemore.transitioning_diff.toUpperCase()}
                </div>
              </div>
              <div className={style.fit}>
                <h3>The good side:</h3>
                <div className={style.fitlist}>
                  {seemore.whyFit?.map((fit) => (
                    <p>+&nbsp;{fit}</p>
                  ))}
                </div>
              </div>
              <div className={style.notfit}>
                <h3>The bad side:</h3>
                <div className={style.notfitlist}>
                  {seemore.whyNotFit?.map((nfit) => (
                    <p>-&nbsp;{nfit}</p>
                  ))}
                </div>
              </div>
              <div className={style.rec}>
                <h3>Tasks to help with change:</h3>
                <div className={style.reclist}>
                  {seemore.transitioning?.map((tran) => (
                    <p>+&nbsp;{tran}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
