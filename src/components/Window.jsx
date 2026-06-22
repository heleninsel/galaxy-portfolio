import { useEffect, useState } from "react";
import { useDraggable } from "../hooks/useDraggable";

export default function Window({ win, onClose, position, children }) {
  const { pos, onPointerDown, nodeRef, sizeRef } = useDraggable(position);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (nodeRef.current) {
      sizeRef.current = {
        w: nodeRef.current.offsetWidth,
        h: nodeRef.current.offsetHeight,
      };
    }
  }, [nodeRef, sizeRef]);

  // kapatma: önce animasyonu başlat, bitince gerçekten kapat
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 200); // animasyon süresiyle aynı
  };

  return (
    <section
      ref={nodeRef}
      className={"window" + (closing ? " closing" : "")}
      style={{ left: pos.x, top: pos.y }}
      role="dialog"
      aria-label={win.title}
    >
      <header className="window-bar" onMouseDown={onPointerDown} onTouchStart={onPointerDown}>
        <span className="window-title">{win.title}</span>
        <button className="window-close" onClick={handleClose} aria-label="Pencereyi kapat">✕</button>
      </header>
      <div className="window-body">{children}</div>
    </section>
  );
}