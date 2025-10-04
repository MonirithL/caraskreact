interface ConicProgressProps {
  progress: number;
}
export default function ConicProgress({ progress }: ConicProgressProps) {
  const clamped = Math.min(Math.max(progress, 0), 100);
  const deg = (clamped / 100) * 360;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `conic-gradient(var(--main-color) 0deg ${deg}deg,transparent ${deg}deg 360deg)`,
      }}
    ></div>
  );
}
