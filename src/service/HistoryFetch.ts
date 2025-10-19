
import type { QnaHistory } from "../type/QnaHistory";
import type { Session } from "../type/Session";
import { API_BASE } from "./APIBaseUrl";

async function getHistoryBySessionID(sid:string):Promise<QnaHistory[]|null>{
    try{
            const res = await fetch(`${API_BASE}/qna/all/${sid}`, {
                method:"GET",
                credentials:'include',
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const qnah = await res.json();
            return qnah;
        }catch(error){
            console.error("Failed to get explore:", error);
            return null;
        }
}
async function getCompletedSession():Promise<Session[]|null>{
    try{
            const res = await fetch(`${API_BASE}/session/all`, {
                method:"GET",
                credentials:'include',
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const sessions = await res.json();
            return sessions;
        }catch(error){
            console.error("Failed to get explore:", error);
            return null;
        }
}

export {getHistoryBySessionID, getCompletedSession}

