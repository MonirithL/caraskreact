import type { Answer } from "../type/Answer";
import style from "./Answer.module.css";
import { motion } from "motion/react";

interface AnswerProp {
  answer_obj: Answer;
  to_do: (id: string, ans_text: string) => void;
}

export default function AnswerCard({ answer_obj, to_do }: AnswerProp) {
  return (
    <motion.button
      key={answer_obj.id}
      onClick={() => {
        to_do(answer_obj.id, answer_obj.answerText);
      }}
      className={style.answer}
    >
      <p>{answer_obj.answerText}</p>
    </motion.button>
  );
}
