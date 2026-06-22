import { useRef, useEffect } from "react";
import { useStarfield, paintCells } from "../hooks/useStarfield";

export default function Starfield({ theme }) {
  const canvasRef = useRef(null);   // uzay: yıldız canvas'ı
  const cellsARef = useRef(null);   // havuz: alt katman (koyu)
  const cellsBRef = useRef(null);   // havuz: üst katman (saydam beyaz)

  // uzay yıldızları (sadece dark temada çalışır)
  useStarfield(canvasRef, theme);

  // havuz hücre ağını BİR KEZ çiz (light temaya geçince)
  useEffect(() => {
    if (theme !== "light") return;
    const build = () => {
      if (cellsARef.current) paintCells(cellsARef.current, 150, 0.12, [20, 70, 80], 110);
      if (cellsBRef.current) paintCells(cellsBRef.current, 128, 0.12, [255, 255, 255], 130);
    };
    build();
    window.addEventListener("resize", build);
    return () => window.removeEventListener("resize", build);
  }, [theme]);

  return (
    <>
      {/* HAVUZ: mozaik dip + iki katman hücre ağı (CSS ile yavaşça oynar) */}
      {theme === "light" && (
        <>
          <div className="pool-floor" aria-hidden="true" />
          <canvas ref={cellsARef} className="cells cells-a" aria-hidden="true" />
          <canvas ref={cellsBRef} className="cells cells-b" aria-hidden="true" />
        </>
      )}

      {/* UZAY: yıldız canvas'ı (sadece dark temada görünür) */}
      {theme === "dark" && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: "fixed", inset: 0, width: "100%", height: "100%", display: "block", zIndex: -1 }}
        />
      )}
    </>
  );
}
