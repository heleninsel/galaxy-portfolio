import { useState, useRef, useEffect } from "react";

// Bir pencereyi sürüklenebilir yapan custom hook.
// Pencere ekran dışına taşmaz (sınır kontrolü var).
export function useDraggable(initial) {
  const [pos, setPos] = useState(initial || { x: 60, y: 80 });
  const offset = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 }); // pencere boyutu (sınır için)
  const nodeRef = useRef(null);           // pencere DOM elementi

  const onPointerDown = (e) => {
    dragging.current = true;
    const point = e.touches ? e.touches[0] : e;
    setPos((cur) => {
      offset.current = { x: point.clientX - cur.x, y: point.clientY - cur.y };
      return cur;
    });
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const point = e.touches ? e.touches[0] : e;
      let nx = point.clientX - offset.current.x;
      let ny = point.clientY - offset.current.y;

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const w = sizeRef.current.w || 340;
      const h = sizeRef.current.h || 200;

      // ekran içinde tut
      nx = Math.max(0, Math.min(nx, winW - w));
      ny = Math.max(0, Math.min(ny, winH - h));

      setPos({ x: nx, y: ny });
    };

    const onUp = () => { dragging.current = false; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return { pos, onPointerDown, nodeRef, sizeRef };
}