import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
}

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
  const setUser = (newUser: User) => {
    setUserState(newUser);
  };
  const removeUser = () => {
    setUserState(null);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setUserState(null);
          return;
        }

        const data = await res.json();
        if (data?.user) {
          console.log(data);
          const user_data: User = {
            id: data.user.id,
            username:
              data.user.user_metadata.full_name ||
              data.user.email.split("@")[0],
            email: data.user.email,
            avatar_url: data.user.user_metadata.avatar_url || null,
          };
          setUserState(user_data);
        } else {
          setUserState(null); // ensure user is null if no data
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
