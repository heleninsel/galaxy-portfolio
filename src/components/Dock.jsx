import { WINDOWS } from "../data/windows";

// Dock: alttaki ikon çubuğu.
// props:
//   onOpen  -> bir ikona tıklanınca çağrılır (pencere açar)
//   openIds -> şu an açık pencerelerin id listesi (aktif ikonu vurgulamak için)
export default function Dock({ onOpen, openIds }) {
  return (
    <nav className="dock" aria-label="Uygulamalar">
      {WINDOWS.map((win) => (
        <button
          key={win.id}
          className={"dock-btn" + (openIds.includes(win.id) ? " is-active" : "")}
          onClick={() => onOpen(win.id)}
          aria-label={win.title}
          title={win.title}
        >
          <span className="dock-icon" aria-hidden="true">{win.icon}</span>
          <span className="dock-label">{win.title}</span>
        </button>
      ))}
    </nav>
  );
}