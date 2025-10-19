import { createContext, useContext, useEffect, useState,useCallback } from "react";
import { Outlet, useLocation } from "react-router";
import { API_BASE } from "../service/APIBaseUrl";
import { deleteSession } from "../service/QnaFetch";

export interface User {
  name: string;
  email: string;
  profile_img: string | null;
  paidPersonal: boolean;
  paidGroup: boolean;
  paidFor:string | null;
}
//Add tier payment

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  removeUser: () => void;
  session_id: string|null;
  setSession:(sid:string)=>void;
  removeSession:(sid:string)=>void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading:true,
  setUser: () => {},
  removeUser: () => {},
  session_id:null,
  removeSession:()=>{},
  setSession:()=>{},
});

export const UserProvider = () => {
  const [session_id, setSession] = useState<string|null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const setUser = (newUser: User) => {
  //   setUserState(newUser);
  // };
  // const removeUser = () => {
  //   setUserState(null);
  // };

  const setUser = useCallback((newUser: User) => setUserState(newUser), []);
  const removeUser = useCallback(() => setUserState(null), []);
  const removeSession = useCallback(() => setSession(null), []);
  useEffect(() => {
    const fetchUser = async () => {
      console.log("CALLED FETCH USER PROVIDER")
      try {
        const res = await fetch(`${API_BASE}/user/`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("USERCONTEXT: res!ok");
          setUserState(null);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (data?.user) {
          if (data.user.type === "guest") {
            setUserState(null);
            return;
          }
          const user_data: User = {
            profile_img: data.user.profile_img,
            name: data.user.name,
            email: data.user.email,
            paidPersonal: data.paidPersonal,
            paidGroup: data.paidGroup,
            paidFor: data.paidFor,
          };

          setUserState(user_data);
        } else {
          setUserState(null); 
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUserState(null); // set user null on error
      } finally{
        setLoading(false);
      }
    };

    fetchUser();
    console.log("CALLED USER CONTEXT")
  }, []);
  const location = useLocation();
  useEffect(()=>{
    const currentPath = location.pathname;
    if((!currentPath.startsWith("/qna") && session_id)){
       const cleanup = async () => {
        try {
          const deleted = await deleteSession(session_id);
          if (deleted != null) {
            console.log("Deleted session:", session_id);
          } else {
            console.warn("Failed to delete session:", session_id);
          }
        } catch (err) {
          console.error("Error deleting session:", err);
        } finally {
          removeSession(); // clear from context
        }
      };
      cleanup()
    }
    
  }, [location.pathname])
  return (
    <UserContext.Provider value={{ user, setUser, removeUser , loading, removeSession, session_id, setSession}}>
      <Outlet />
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
