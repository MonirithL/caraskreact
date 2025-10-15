import { useLocation, useNavigate } from "react-router";

import { createResult } from "../service/QnaFetch";
import { useEffect, useState } from "react";
import type { ResultTs } from "../type/Result";
import ResultCard from "../component/ResultCard";
import style from "./Result.module.css";
import { motion } from "motion/react";
export default function Result() {
  const [wait, setWait] = useState(true);
  const [ran, setRan] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");
  const nav = useNavigate();
  //mark session as completed
  //add qna to database
  //make result
  const location = useLocation();
  const { tempActiveQna = [], sid = null } = location.state || {};
  const [result, setResult] = useState<ResultTs | null>();
  const [result_id, setResult_id] = useState<string | null>(null);

  useEffect(() => {
    if (!wait) return;

    const dots = [".", "..", "...", "...."];
    let index = 0;

    const interval = setInterval(() => {
      setLoadingText(`Loading${dots[index]}`);
      index = (index + 1) % dots.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [wait]);
  useEffect(() => {
    if (ran) return;
    if (sid !== null) {
      //do stuff related to user
      console.log("Reuslt session delivered");
    }
    if (tempActiveQna.length > 0) {
      //call stuff to add question
      console.log("Reuslt question delivered");
      const callResult = async () => {
        const fsid = sid ?? null;
        const result: ResultTs | null = await createResult(tempActiveQna, fsid);
        if (result !== null && result !== undefined) {
          console.log("Fetched result:", result);
          setResult(result);
          setResult_id(result.id);
          setWait(false);
          console.log("SETTED result and SETTED wait");
          console.log(JSON.stringify(result));
        }
      };
      callResult();
      setRan(true);
    }
  }, []);

  async function finish() {
    nav("/progress", {
      replace: true,
      state: { sid: sid != null ? "user" : "guest" },
    });
  }

  if (wait) {
    return (
      <div className={style.wait}>
        <div className={style.wait_center}>
          <div className="spinner"></div>
          <h2>{loadingText}</h2>
        </div>
      </div>
    );
  }
  return (
    <div className={style.result_main}>
      <h1 className={style.title}>Result:&nbsp;</h1>
      {/* <p className={style.footer}>Session ID: {sid ?? "Guest"}</p> */}
      <div className={style.results}>
        {result?.result_json?.result
          .filter((career) => career.fit === true)
          .map((career, index) => (
            <ResultCard
              key={career.title + index + index}
              fit={career.fit}
              description={career.description}
              title={career.title}
              reasons={career.reasons}
              index={(index + 1).toString()}
            />
          ))}
        <div className={style.showIncompatible}>
          <h3>Career paths not advised</h3>
        </div>
        {result?.result_json.result
          .filter((career) => career.fit === false)
          .map((career, index) => (
            <ResultCard
              key={career.title + index + index.toString()}
              fit={career.fit}
              description={career.description}
              title={career.title}
              reasons={career.reasons}
              index={(index + 1).toString()}
            />
          ))}
      </div>
      <div className={style.finish_wrapper}>
        <motion.button
          className={style.finish}
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
          onClick={finish}
        >
          <h2>Finish</h2>
        </motion.button>
      </div>
    </div>
  );
}
