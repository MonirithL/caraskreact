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
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
    >
      <p>{answer_obj.answerText}</p>
    </motion.button>
  );
}
