import { useMemo } from "react";
import style from "./ConcaveRect.module.css";
import { AnimatePresence, motion } from "motion/react";

interface ConcaveRectProp {
  width: number;
  height?: number;
  img?: string;
  question?: string;
}

export default function ConcaveRect({
  width,
  height = 350,
  img = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F5778%2F5778542.png&f=1&nofb=1&ipt=78597a4f4aca0e0eb5701e135497ae8871ec1e7cf05139d891481c6282b75f49",
  question = "Loading",
}: ConcaveRectProp) {
  // memoize geometry values
  if (img == null) {
    img =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F5778%2F5778542.png&f=1&nofb=1&ipt=78597a4f4aca0e0eb5701e135497ae8871ec1e7cf05139d891481c6282b75f49";
  }
  const { x1, x2, arcDepth, xc, shallow, corners, offset } = useMemo(() => {
    return {
      x1: 0.4 * width, // 40%
      x2: 0.6 * width,
      xc: 0.5 * width,
      arcDepth: 0.09 * width, // 20% depth
      shallow: 0.09 * width,
      corners: 0.05 * width,
      offset: 0.025 * width,
    };
  }, [width, height]);

  //replace with 2 rects
  //2 off centered rect, one circle
  //and fill bottom
  console.log("q", question);
  return (
    <div
      className={style.arcbox}
      style={{
        width,
        height,
        backgroundColor: "rgba(var(--main-color-num),0.6)",
        borderRadius: "1rem",
        // clipPath: `path(M 0,0 L ${x1},0 L ${width},${height} L 0,${height} Z)`,
        clipPath: `path("M 0,0 L ${
          x1 - corners
        },0 A ${corners},${corners} 0,0,1 ${x1},${offset} A ${
          shallow + 5
        },${shallow} 0,0,0 ${xc},${arcDepth} A ${
          shallow + 5
        },${shallow} 0,0,0 ${x2},${offset} A ${corners},${corners} 0,0,1 ${
          x2 + corners
        },0 L ${width},0 L ${width},${height} L 0,${height} Z")`,
        paddingTop: `calc(${arcDepth}px + 1rem)`,
      }}
    >
      <h3>{question}</h3>
      <div
        className={style.qimgWrapper}
        style={{ overflow: "hidden", position: "relative" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={img} // important: triggers animation when img changes
            src={img}
            alt=""
            className={style.qimg}
            initial={{ x: "100%", opacity: 0 }} // start offscreen right
            animate={{ x: 0, opacity: 1 }} // slide into place
            exit={{ x: "-100%", opacity: 0 }} // slide out left
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: "absolute", width: "100%" }} // keep images stacked
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
