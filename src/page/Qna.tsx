import { ArrowLeft } from "lucide-react";
import style from "./Qna.module.css";
import ConcaveRect from "../component/ConcaveRect";
import { useEffect, useRef, useState } from "react";
import ConicProgress from "../component/ConicProgress";
import { useTimer } from "../hook/useTimer";
// import type { Answer } from "../type/Answer";
import AnswerCard from "../component/Answer";
import ProgressBar from "../component/ProgressBar";
import { motion } from "motion/react";
import { useActiveQnas } from "../context/QnaContext";
import {
  getQuestionCompound,
  createSession,
  deleteSession,
  addUserQNA
} from "../service/QnaFetch";
import { useUser } from "../context/UserContext";
import type { Session } from "../type/Session";
import { useNavigate } from "react-router";
import type { QuestionCompound } from "../type/QuestionCompound";
import type { ActiveQna } from "../type/ActiveQna";

// let startupDone = false;
export default function Qna() {
  const { session_id, setSession } = useUser();
  const qnaRef = useRef(null);
  const [width, setWidth] = useState(0);
  const { time, start, reset } = useTimer(30);
  const totalQuestionCount = 18;
  //for components

  const [okayCallreq, setOkayCallreq] = useState(false);
  //all ready is to stop that spinning wheel from showing, check when user!=null: session, question compound
  const [allReady, setAllReady] = useState(false);
  const nav = useNavigate();

  const { user, loading } = useUser();
  const { activeQna, addQna, resetActiveQnAs } = useActiveQnas();

  const [compoundqna, setCompoundQna] = useState<QuestionCompound[] | null>(
    null
  );

  //get compound questions list (state)
  //if user != null; create a session id (state)
  //everytime a user answers, put into ActiveQna list(qid, qtext, aid, atext)
  //if user !=null; also send to db; if return ok or self then ok
  //everytime a user click answer: add answer> switch QuestionCompound> Reset timer
  //when counter = 18 (state)
  //if user != null; send to /make-result -> it send to db as well
  //if guest; send to server /make-result/guest
  //when recieved:
  //if guest? send the result with route result/guest,
  //if user!=null=> go to next route and get latest session /result
  async function submitAllQnAs(session_id: string) {
  for (const qna of activeQna) {
    try {
      const res = await addUserQNA(qna.question_id, qna.answer_id, session_id);
      console.log(`✅ Sent QnA for ${qna.questionText}`, res);
    } catch (err) {
      console.error(`❌ Failed to send QnA for ${qna.question_id}`, err);
    }
  }

  console.log("🎯 All QNAs processed");
}
  //remove view now
  async function startup() {
    reset();
    resetActiveQnAs();

    //all user and guest
    let compoundquestion = await getQuestionCompound();
    if (compoundquestion != null) {
      setCompoundQna(compoundquestion);
      console.log("qna :", JSON.stringify(compoundquestion));
    }
    //if users
    if (user != null) {
      let sess: Session | null = null;
      if (session_id == null) {
        sess = await createSession();
      }
      if (sess !== null) {
        setSession(sess.id);
        console.log("session ok: ", JSON.stringify(sess.id));
      } else {
        console.log("session id is null");
      }
    }
  }
  //end logic

  function setAnswer(ans_id: string, ans_text: string) {
    //do something like storing or setting it
    const activeQna1: ActiveQna = {
      question_id: compoundqna?.[activeQna.length]?.id ?? "",
      questionText: compoundqna?.[activeQna.length]?.questionText ?? "",
      answer_id: ans_id,
      answerText: ans_text,
    };
    console.log("active id: ", JSON.stringify(activeQna1));
    // console.log(compoundqna?.[qCounter + 1].answers);
    addQna(activeQna1);
    reset();
  }

  useEffect(() => {
    console.log("list length", activeQna.length);
    if (activeQna.length < 18) {
      start();
    }
    if (activeQna.length === 18) {
      const tempActiveQna = activeQna;
      const sid = session_id;
      //ADD QNA!
      if(sid!=null){
        submitAllQnAs(sid);
      }
      nav("/result", { state: { tempActiveQna, sid }, replace: true });
    }
  }, [activeQna.length]);

  useEffect(() => {
    console.log("loading ", loading);
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) setWidth(entry.contentRect.width);
    });

    if (qnaRef.current) observer.observe(qnaRef.current);

    if (loading === false) {
      setOkayCallreq(true);
    }
    if (allReady === true) {
      start();
    }

    return () => {
      if (qnaRef.current) observer.unobserve(qnaRef.current);
    };
  }, [loading, allReady, activeQna.length]);

  useEffect(() => {
    if (okayCallreq === true) {
      startup();
    }
  }, [okayCallreq]);

  useEffect(() => {
    let checkForUser = false;
    if (session_id !== null) {
      checkForUser = true;
    }
    let checkCompound = false;
    if (compoundqna != null) {
      checkCompound = true;
    }

    if (checkForUser && checkCompound) {
      setAllReady(true);
    }
    if (user === null && checkCompound) {
      setAllReady(true);
    }
  }, [session_id, compoundqna]);

  // useEffect(() => {
  //   //running all ready
  //   if (allReady === true) {
  //     start();
  //   }
  // }, [allReady]);

  async function exitQna() {
    console.log("session is: ", JSON.stringify(session_id));
    if (session_id != null) {
      const deleted = await deleteSession(session_id);
      if (deleted != null) {
        console.log("deleted session: (QNA)", deleted);
        nav("/discovery", { replace: true });
      }
    } else {
      nav("/discovery", { replace: true });
    }
    nav("/discovery", { replace: true });
  }

  if (loading || !allReady) {
    return (
      <div
        className={style.main}
        style={{ justifyContent: "center", height: "100%" }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <motion.div
      className={style.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
    >
      <div className={style.qna_appbar}>
        <button className={style.backAbs} onClick={exitQna}>
          <ArrowLeft className={style.backbtn} />
        </button>
        <ProgressBar
          total={totalQuestionCount}
          current={Math.min(activeQna.length, totalQuestionCount)}
        />
      </div>
      <div className={style.questWrapper}>
        <div className={style.question} ref={qnaRef}>
          <div className={style.timer}>
            <div className={style.timerNumber}>
              <h3>{Math.floor(time)}</h3>
            </div>
            <ConicProgress progress={((30 - time) / 30) * 100} />
          </div>
          <div className={style.qnaBox}>
            {width > 0 && (
              <ConcaveRect
                width={width}
                question={compoundqna?.[activeQna.length]?.questionText}
              />
            )}
          </div>
        </div>
        <div className={style.ans_group}>
          <p>Select one of the following:</p>
          {activeQna.length === 18 ? (
            <div>
              <h3>Completed</h3>
            </div>
          ) : (
            compoundqna?.[activeQna.length]?.answers.map((ans) => (
              <AnswerCard
                key={ans.id + ans.qid}
                answer_obj={ans}
                to_do={setAnswer}
              />
            ))
          )}
        </div>
      </div>
      {/* {popFinishEarly === false ? (
        <></>
      ) : (
        <motion.div
          className={style.popup_wrapper}
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className={style.popup}>
            <div className={style.popup_left}>
              <div className={style.popup_num}>14</div>
              <div className={style.popup_text}>
                <h4>main careers identified</h4>
              </div>
            </div>
            <button className={style.popup_right}>
              <p>view now</p>
            </button>
          </div>
        </motion.div>
      )} */}
    </motion.div>
  );
}
