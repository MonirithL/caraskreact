//get latest session
//get Goal
//set, delete, update progress
//generate recommendations

import type { Goal } from "../type/Goal";
import type { Progress } from "../type/Progress";

import type { ResultTs } from "../type/Result";
import type { Session } from "../type/Session";
import { API_BASE } from "./APIBaseUrl";

async function getLatestSession():Promise<Session|null>{
    try{
            const res = await fetch(`${API_BASE}/session/latest`, {
                method:"GET",
                credentials:'include'
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const session = await res.json();
            return session;
        }catch(error){
            console.error("Failed to get session:", error);
            return null;
        }
}
async function getGoal():Promise<Goal|null>{
    try{
            const res = await fetch(`${API_BASE}/goal/`, {
                method:"GET",
                credentials:'include'
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const session = await res.json();
            return session;
        }catch(error){
            console.error("Failed to get goal:", error);
            return null;
        }
}
async function addGoal(career:string):Promise<Goal|null>{
    console.log(career);
    try{
            const res = await fetch(`${API_BASE}/goal/`, {
                method:"POST",
                credentials:'include',
                body:JSON.stringify(
                    {career_title:career}
                ),
                 headers: {
    "Content-Type": "application/json", 
  },
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const session = await res.json();
            return session;
        }catch(error){
            console.error("Failed to post goal:", error);
            return null;
        }
}
async function updateGoal(career:string, gid:number):Promise<Goal|null>{
    try{
            const res = await fetch(`${API_BASE}/goal/`, {
                method:"PUT",
                credentials:'include',
                body:JSON.stringify({
                    career_title:career,
                    gid:gid
                }),
                headers:{
                    "Content-Type":"application/json",
                }
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const session = await res.json();
            return session;
        }catch(error){
            console.error("Failed to put goal:", error);
            return null;
        }
}

async function getResult(sid:string):Promise<ResultTs|null>{
    try{
        console.log(`${API_BASE}/result/${sid}`)
            const res = await fetch(`${API_BASE}/result/${sid}`, {
                method:"GET",
                credentials:'include',
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const session = await res.json();
            return session;
        }catch(error){
            console.error("Failed to put goal:", error);
            return null;
        }

}
async function addProgress(gid:number, text:string):Promise<Progress|null>{
    try{

            const res = await fetch(`${API_BASE}/progress/`, {
                method:"POST",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    gid:gid,
                    text:text
                })
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const progress = await res.json();
            return progress;
        }catch(error){
            console.error("Failed to add progress", error);
            return null;
        }
    
}
async function getProgresses():Promise<Progress[]>{
    try{

            const res = await fetch(`${API_BASE}/progress/`, {
                method:"GET",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json",
                },
            
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const progresses = await res.json();
            return progresses;
        }catch(error){
            console.error("Failed to get progresses", error);
            return [];
        }

}
async function deleteProgress(pid:number):Promise<Progress|null>{
    try{

            const res = await fetch(`${API_BASE}/progress/`, {
                method:"DELETE",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    pid:pid,
                })
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const deletedProgress = await res.json();
            return deletedProgress;
        }catch(error){
            console.error("Failed to delete progress", error);
            return null;
        }
}
async function updateProgress(pid:number, completed:boolean):Promise<Progress|null>{
        try{

            const res = await fetch(`${API_BASE}/progress/`, {
                method:"PUT",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    pid:pid,
                    completed:completed
                })
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const updateProg = await res.json();
            return updateProg;
        }catch(error){
            console.error("Failed to update progress", error);
            return null;
        }
}
async function getRecommended(careerText:string, progresses:Progress[]):Promise<string[]>{
        try{
            const progressText = progresses.map(p=>p.text);
            const res = await fetch(`${API_BASE}/gemini/recommended`, {
                method:"POST",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    careerText:careerText,
                    alreadyDoneArr:progressText
                })
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const recprogs = await res.json();
            return recprogs.result;
        }catch(error){
            console.error("Failed to get rec progress", error);
            return [];
        }
}

export {getLatestSession, addGoal, updateGoal, getGoal, getResult, addProgress, deleteProgress, updateProgress,getProgresses,getRecommended}