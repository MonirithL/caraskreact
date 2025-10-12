import type { Answer } from "./Answer";
export type QuestionCompound = {
    id: string;
    questionText:string;
    image:string;
    order:number;
    answers:Answer[];
}