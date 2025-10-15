import type { Explore } from "../type/Explore";
import type { Seemore } from "../type/Seemore";
import { API_BASE } from "./APIBaseUrl";

async function getExploreResultGEMINI(terms:string[], ):Promise<Explore|null>{
    try{
            const res = await fetch(`${API_BASE}/gemini/explore`, {
                method:"POST",
                credentials:'include',
                body:JSON.stringify(
                    {exploreArr:terms}
                ),
                 headers: {
    "Content-Type": "application/json", 
  },

            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const explore = await res.json();
            return explore;
        }catch(error){
            console.error("Failed to get explore:", error);
            return null;
        }
}
async function getSeemore(title:string):Promise<Seemore|null>{
    try{
            const res = await fetch(`${API_BASE}/gemini/seemore/${title}`, {
                method:"GET",
                credentials:'include',
            });
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const seemore = await res.json();
            return seemore;
        }catch(error){
            console.error("Failed to get explore:", error);
            return null;
        }
}

export {getExploreResultGEMINI, getSeemore}

