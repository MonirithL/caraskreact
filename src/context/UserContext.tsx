import { createContext, useContext, useEffect, useState,useCallback } from "react";
import { Outlet } from "react-router";
import { API_BASE } from "../service/APIBaseUrl";

export interface User {
  name: string;
  email: string;
  profile_img: string | null;
}
//Add tier payment

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  removeUser: () => {},
});

export const UserProvider = () => {
  const [user, setUserState] = useState<User | null>(null);
  // const setUser = (newUser: User) => {
  //   setUserState(newUser);
  // };
  // const removeUser = () => {
  //   setUserState(null);
  // };

  const setUser = useCallback((newUser: User) => setUserState(newUser), []);
  const removeUser = useCallback(() => setUserState(null), []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/user/`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("USERCONTEXT: res!ok");
          setUserState(null);
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
          };

          setUserState(user_data);
        } else {
          setUserState(null); 
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUserState(null); // set user null on error
      }
    };

    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      <Outlet />
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
