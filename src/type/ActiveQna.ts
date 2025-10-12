export type ActiveQna = {
    question_id:string;
    questionText: string;
    answer_id:string;
    answerText:string;
}
export type ActiveQnaText = {
    questionText:string;
    answerText:string;
}
//we will create a map of item
//const questionTexts = qnas.map(q => q.questionText);