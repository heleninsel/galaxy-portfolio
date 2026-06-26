import { WINDOWS } from "../data/windows";

// Ortada sabit ana menü: büyük karşılama + ikonlar (Sharyap tarzı)
export default function MainMenu({ onOpen }) {
  return (
    <section className="main-menu" role="dialog" aria-label="Ana menü">
      <div className="main-menu-body">
        <h1 className="hello-big">Merhaba, ben Helen!</h1>
        <h2 className="hello-sub">illüstratör &amp; geliştirici</h2>

        <div className="menu-grid">
          {WINDOWS.map((w) => (
            <button key={w.id} className="menu-item" onClick={() => onOpen(w.id)}>
              <img className="menu-icon" src={w.icon} alt="" aria-hidden="true" />
              <span className="menu-label">{w.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}