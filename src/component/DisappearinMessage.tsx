import { useEffect, useState } from "react";
import style from "./DisappearingMessage.module.css";
import { motion, AnimatePresence } from "motion/react";

interface DisappearingMessageProps {
  text: string;
  duration: number;
  onHide: () => void;
}
function DisappearingMessage({
  text,
  duration = 3000,
  onHide,
}: DisappearingMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onHide) onHide(); // optional callback to parent
    }, duration);

    return () => clearTimeout(timer); // cleanup if unmounted early
  }, [duration, onHide]);

  return (
    <AnimatePresence mode="wait" onExitComplete={onHide}>
      {visible && (
        <motion.p
          className={style.dm}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default DisappearingMessage;
