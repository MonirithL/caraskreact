//have state<Map> question id->question answer

import type { ActiveQna, ActiveQnaText } from "../type/ActiveQna";
import type { QnA } from "../type/QnA";
import type { QuestionCompound } from "../type/QuestionCompound";
import type { ResultTs } from "../type/Result";
// import type { ResultJson } from "../type/ResultJson";
import type { Session } from "../type/Session";
import { API_BASE } from "./APIBaseUrl";

async function getQuestionCompound():Promise<QuestionCompound[]|null>{
    // /question/basic
    //take array of questions
    try{
        const res = await fetch(`${API_BASE}/question/basic`, {
            method:"GET",
            credentials:'include'
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const QC:QuestionCompound[] = await res.json();
        return QC;
    }catch(error){
        console.error("Failed to get qna:", error);
        return null;
    }
}
async function createSession():Promise<Session| null>{
    // put /session/
    try{
        const res = await fetch(`${API_BASE}/session/`, {
            method:"PUT",
            credentials:'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        if(!res.ok){
            
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const session: Session = await res.json();
        return session;
    }catch(error){
        console.error("Failed to create session:", error);
        return null;
    }

}
async function addUserQNA(qid:string, aid:string, session_id:string):Promise<QnA|null>{
    //this is users answer
    // put /qna/
    try{
        const res = await fetch(`${API_BASE}/qna/`, {
            method:"PUT",
            credentials:'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                qid:qid,
                aid: aid,
                sid: session_id
            })
        });
        if(!res.ok){
            
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const qna: QnA = await res.json();
        return qna;
    }catch(error){
        console.error("Failed to create session:", error);
        return null;
    }
}

async function createResult(qnaList: ActiveQna[], session_id:number, setProgressTextBase:(text:string)=>void):Promise<ResultTs|null>{
    // post /gemini/basic

    // post /gemini/basic/user

    const url = `${API_BASE}/gemini/make-result${!session_id?"":"/user"}`;
    
    const activeQnaTexts: ActiveQnaText[] = qnaList.map(qna => ({
        questionText: qna.questionText,
        answerText: qna.answerText,
        }));

    try{
        const body: Record<string, any> = { qas: activeQnaTexts };
        if (session_id) body.session_id = session_id; 
        const res = await fetch(url, {
            method:"POST",
            credentials:'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                body
            )
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        setProgressTextBase("Preparing Results")
        const result: ResultTs = await res.json();
        return result;
    }catch(error){
        console.error("Failed to create session:", error, " session ", session_id);
        return null;
    }
}

async function deleteSession(sid:string){
    try{
        console.log("try delete session", sid)
        const res = await fetch(`${API_BASE}/session/delete`, { 
            method:"DELETE",
            credentials:'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({sid:sid})
        });
        if(!res.ok){
            
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const session: Session = await res.json();
        return session;
    }catch(error){
        console.error("Failed to DELETE session:", error);
        return null;
    }
}

// async function completeSession(session_id:string){
//     try{
//         const res = await fetch(`${API_BASE}/session/complete`,{
            
//         })
//     }catch(error){
//         console.error("failed to complete session: ", error)
//         return null;
//     }
// }

//complete Session too or just added that with result json on router end
export {getQuestionCompound, createSession, addUserQNA, createResult, deleteSession}