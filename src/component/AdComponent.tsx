import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ad1 from "../assets/adsbanner1.jpg";
import ad2 from "../assets/adsbanner2.jpg";
import ad3 from "../assets/adsbanner3.jpg";
import ad4 from "../assets/adsbanner4.jpg";
const ads = [ad1, ad2, ad3, ad4];
import style from "./AdsComponent.module.css";
export default function AdBanner() {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * ads.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <div className={style.card}>
          <motion.img
            key={ads[currentIndex]}
            src={ads[currentIndex]}
            alt="Test Ad"
            className={style.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          <div className={style.text}>
            <h5>Ad</h5>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
