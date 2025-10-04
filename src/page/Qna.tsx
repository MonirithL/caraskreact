import { ArrowLeft } from "lucide-react";
import style from "./Qna.module.css";
import ConcaveRect from "../component/ConcaveRect";
import { useEffect, useRef, useState } from "react";
import ConicProgress from "../component/ConicProgress";
import { useTimer } from "../hook/useTimer";
import type { Answer } from "../type/Answer";
import AnswerCard from "../component/Answer";
import ProgressBar from "../component/ProgressBar";
import { motion } from "motion/react";

export default function Qna() {
  const [isLoading, setIsLoading] = useState(true);
  const [popFinishEarly, setPopFInishEarly] = useState(false);

  const [localProgress, setLocalProgress] = useState<Map<string, Answer>>(
    new Map()
  );
  const [simulated_progress, setsprog] = useState(3);

  const qnaRef = useRef(null);
  const [width, setWidth] = useState(0);
  const { time, start, pause, reset } = useTimer(30);
  const totalQuestionCount = 18;
  const [answers, setAnswers] = useState<Answer[]>([
    { id: "1", answer: "Click me1", point: 1, type: "creative" },
    { id: "2", answer: "Click me2", point: 1, type: "creative" },
    { id: "3", answer: "Click me3", point: 1, type: "creative" },
    { id: "4", answer: "Click me4", point: 1, type: "creative" },
  ]);

  function setAnswer(ans_id: string) {
    //do something like storing or setting it
    setsprog(simulated_progress + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
    start();
  }, []);
  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
        console.log(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(handleResize);

    if (qnaRef.current) {
      observer.observe(qnaRef.current);
    }

    return () => {
      if (qnaRef.current) observer.unobserve(qnaRef.current);
    };
  }, [isLoading]);
  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
        console.log(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(handleResize);

    if (qnaRef.current) {
      observer.observe(qnaRef.current);
    }

    return () => {
      if (qnaRef.current) observer.unobserve(qnaRef.current);
    };
  }, []);

  if (isLoading) {
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
        <button className={style.backAbs}>
          <ArrowLeft className={style.backbtn} />
        </button>
        <ProgressBar total={totalQuestionCount} current={simulated_progress} />
      </div>
      <div>
        <div className={style.question} ref={qnaRef}>
          <div className={style.timer}>
            <div className={style.timerNumber}>
              <h3>{Math.floor(time)}</h3>
            </div>
            <ConicProgress progress={((30 - time) / 30) * 100} />
          </div>
          <div className={style.qnaBox}>
            {width > 0 && <ConcaveRect width={width} />}
          </div>
        </div>
        <div className={style.ans_group}>
          <p>Select one of the following:</p>
          {answers.map((ans) => (
            <AnswerCard answer_obj={ans} to_do={setAnswer} />
          ))}
        </div>
      </div>
      {popFinishEarly === false ? (
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
      )}
    </motion.div>
  );
}
