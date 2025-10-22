import { Pen, Plus } from "lucide-react";
import style from "./Progress.module.css";
import ProgressCard from "../component/ProgressCard";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import NotSignIn from "../component/NoSignedIn";
import { useLocation } from "react-router";
import DisappearingMessage from "../component/DisappearinMessage";
import { motion } from "motion/react";
import {
  getLatestSession,
  getGoal,
  addGoal,
  updateGoal,
  getResult,
  addProgress,
  deleteProgress,
  updateProgress,
  getProgresses,
  getRecommended,
} from "../service/ProgressFetch";
// import type { Session } from "../type/Session";
import UserBlock from "../component/UserBlock";
import type { Goal } from "../type/Goal";
import ProgressSwitchGoal from "../component/ProgressSwitchGoal";
import type { Progress } from "../type/Progress";
import AddProgress from "../component/AddProgress";
import nothing from "../assets/cat_s.png";

export default function Progress() {
  const location = useLocation();
  const { user } = useUser();
  const [edit, setEdit] = useState(false);
  const [adding, setAdding] = useState(false);
  const [isChangingGoal, setICG] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);

  //active data

  const { sid = null } = location.state || {};
  const [showNotUserWarning, setNUW] = useState(false);

  //
  // const [lastSession, setLastSession] = useState<Session | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [defaultCareers, setDefaultCareers] = useState<string[]>([]);
  const [dbProgresses, setDbProgresses] = useState<Progress[] | null>(null);
  const [dbrecommended, setdbrecommended] = useState<string[]>([]);

  function toggleEdit() {
    setEdit(!edit);
  }
  // function removeTrack(card_id: string) {
  //   //remove from the list or map or array
  // }

  async function setUpUser() {
    const session = await getLatestSession();
    console.log(JSON.stringify(session));
    // setLastSession(session);
    const goal: Goal | null = await getGoal();
    if (goal != null) {
      setGoal(goal);
    } else {
      console.log("no goal");
    }
    if (session != null) {
      const result = await getResult(session.id);
      if (result != null) {
        const titles: string[] = result.result_json.result
          .filter((item) => item.fit) // keep only items with fit = true
          .map((item) => item.title);
        setDefaultCareers(titles);
        console.log(titles);
      }
    }

    //call progresses
    const getprogs = await getProgresses();
    setDbProgresses(getprogs);
    //call get recommended
    if (goal?.career !== undefined) {
      const recs = await getRecommended(goal?.career, getprogs);
      setdbrecommended(recs);
    }
  }

  async function getDbRecRefresh() {
    if (goal?.career !== undefined && dbProgresses != null) {
      const recs = await getRecommended(goal?.career, dbProgresses);
      setdbrecommended(recs);
    }
  }

  async function setDbGoal(newGoal: string) {
    if (goal === null) {
      const goal1 = await addGoal(newGoal);
      if (goal1 != null) {
        setGoal(goal1);
        setICG(false);
      }
    } else {
      const updatedGoal = await updateGoal(newGoal, goal.id);
      if (updatedGoal !== null) {
        setGoal(updatedGoal);
        setICG(false);
      }
    }
  }
  async function refreshProg() {
    const getprogs = await getProgresses();
    setDbProgresses(getprogs);
  }
  async function addingProgress(text: string) {
    if (goal?.id !== undefined) {
      const prog = await addProgress(goal?.id, text);
      if (prog != null) {
        refreshProg();
        setAdding(false);
      }
    }
  }

  useEffect(() => {
    if (sid == "guest") {
      setNUW(true);
    }
    if (user !== null && !isSettingUp) {
      setIsSettingUp(true);
      setUpUser();
    }
    console.log("RUN MOUNT!!!!!!!!!!");
    console.log(sid);
  }, [user, sid]);

  useEffect(() => {
    if (isSettingUp && defaultCareers?.length !== 0) {
      setIsSettingUp(false);
    }
  }, [defaultCareers]);

  if (user === null) {
    return (
      <div className={style.main}>
        <NotSignIn />

        {showNotUserWarning && (
          <DisappearingMessage
            text="No result to show, please sign in and try again"
            duration={2000}
            onHide={() => setNUW(false)}
          />
        )}
      </div>
    );
  }
  return (
    <div className={style.main}>
      {isChangingGoal ? (
        <ProgressSwitchGoal
          current={goal?.career}
          close={() => {
            setICG(false);
          }}
          goals={defaultCareers}
          setGoal={setDbGoal}
        />
      ) : (
        <></>
      )}
      {adding ? (
        <AddProgress
          close={() => {
            setAdding(false);
          }}
          add={addingProgress}
          alreadyFull={dbProgresses}
          recommended={dbrecommended}
          goal={goal?.career}
          refresh={getDbRecRefresh}
        />
      ) : (
        <></>
      )}
      <div className={style.progprofile}>
        <UserBlock customDesc={`Goal: ${goal?.career ?? "Not set"}!`} />
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
          whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
          className={style.switch}
          onClick={() => {
            setICG(true);
          }}
          disabled={defaultCareers?.length === 0}
        >
          Change goal
        </motion.button>
      </div>
      <div className={`w-full ${style.leadText}`}>
        <h3>Items Currently working on</h3>
        <div className={style.btnactionGroup}>
          <button
            className={style.btnaction}
            onClick={() => {
              setAdding(!adding);
            }}
          >
            <div className={style.itemaction} title="Add Progress">
              <Plus className={style.edit} />
            </div>
          </button>
          <button className={style.btnaction} onClick={toggleEdit}>
            <div className={style.itemaction} title="Toggle Delete">
              <Pen className={style.edit} />
            </div>
          </button>
        </div>
      </div>
      {dbProgresses === null ? (
        <div className={style.loadingProgressItems}>
          <div className="spinner"></div>
        </div>
      ) : dbProgresses?.length === 0 ? (
        <div className={style.loadingProgressItems}>
          <img src={nothing} alt="" />
          <h4>Add a few Tasks to see progress!</h4>
        </div>
      ) : (
        <div className={`w-full ${style.items}`}>
          {dbProgresses.map((prog) => (
            <ProgressCard
              key={prog.id + "/" + prog.goal_id}
              edit={edit}
              remove={deleteProgress}
              update={updateProgress}
              progress={prog}
              refresh={refreshProg}
            />
          ))}
        </div>
      )}
    </div>
  );
}
