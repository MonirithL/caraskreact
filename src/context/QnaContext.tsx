import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ActiveQna } from "../type/ActiveQna";

import { Outlet, useLocation } from "react-router";

interface QnaContextType {
  activeQna: ActiveQna[];
  addQna: (qna: ActiveQna) => void;
  resetActiveQnAs: () => void;
}
const QnaContext = createContext<QnaContextType>({
  activeQna: [],
  addQna: () => {},
  resetActiveQnAs: () => {},
});

export const QnaProvider = () => {
  const location = useLocation();
  const [activeQna, setActiveQnaState] = useState<ActiveQna[]>([]);

  const addQna = useCallback((qna: ActiveQna) => {
    setActiveQnaState((prev) => (prev ? [...prev, qna] : [qna]));
  }, []);
  const resetActiveQnAs = () => {
    setActiveQnaState([]);
  };

  useEffect(()=>{
    if(activeQna.length>0 && location.pathname!="/qna"){
      resetActiveQnAs()
    }
  }, [location.pathname])

  console.log("CALLED QNA CONTEXT");
  return (
    <QnaContext.Provider value={{ activeQna, addQna, resetActiveQnAs }}>
      <Outlet />
    </QnaContext.Provider>
  );
};
export const useActiveQnas = () => useContext(QnaContext);
