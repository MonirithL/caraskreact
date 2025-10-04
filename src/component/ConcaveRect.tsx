import { useMemo } from "react";
import style from "./ConcaveRect.module.css";

interface ConcaveRectProp {
  width: number;
  height?: number;
  img?: string;
  question?: string;
}

export default function ConcaveRect({
  width,
  height = 250,
  img = "https://placehold.co/600x400",
  question = "Loading",
}: ConcaveRectProp) {
  // memoize geometry values
  const { x1, x2, x0, x20, arcDepth, xc, shallow, corners, offset } =
    useMemo(() => {
      return {
        x0: 0.36 * width,
        x1: 0.4 * width, // 40%
        x2: 0.6 * width,
        x20: 0.64 * width, // 60%
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
      <div className={style.qimgWrapper}>
        <img src={img} alt="" className={style.qimg} />
      </div>
    </div>
  );
}
