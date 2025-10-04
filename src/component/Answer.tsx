import type { Answer } from "../type/Answer"
import style from "./Answer.module.css"

interface AnswerProp{
    answer_obj: Answer;
    to_do: (id:string)=>void;
}

export default function AnswerCard({answer_obj, to_do}:AnswerProp){
    return(
        <button key={answer_obj.id} onClick={()=>{to_do(answer_obj.id)}} className={style.answer}>
            <p>{answer_obj.answer}</p>
        </button>
    );
}