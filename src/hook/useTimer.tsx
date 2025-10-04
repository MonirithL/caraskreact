import { useEffect, useRef, useState } from "react";

export function useTimer(startSeconds: number) {
  const [time, setTime] = useState(startSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start countdown
  const start = () => {
    if (intervalRef.current) return; // already running
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= -29) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return -30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Pause countdown
  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset countdown
  const reset = () => {
    pause();
    setTime(startSeconds);
  };

  useEffect(() => {
    return () => pause(); // cleanup
  }, []);

  return { time, start, reset, pause };
}
