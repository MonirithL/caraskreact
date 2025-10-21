import type { User } from "../context/UserContext";
import { API_BASE } from "./APIBaseUrl";

export async function buyForUser(user: User): Promise<User | null> {
  try {
    const res = await fetch(`${API_BASE}/user/payment`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        paidPersonal: true,  
        paidGroup: false,    
        paidFor: null,
    }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user ?? null;
  } catch (err) {
    console.error("Error buying personal subscription:", err);
    return null;
  }
}

/**
 * Buy group subscription for a user
 */
export async function buyForGroup(user: User): Promise<User | null> {
  try {
    const res = await fetch(`${API_BASE}/user/payment`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        paidPersonal: false,  
        paidGroup: true,    
        paidFor: null,
       }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user ?? null;
  } catch (err) {
    console.error("Error buying group subscription:", err);
    return null;
  }
}