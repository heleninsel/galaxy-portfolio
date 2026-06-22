// Placeholder görseller (sonra kendi çizimlerinle değiştirirsin)
const ITEMS = [1, 2, 3, 4, 5, 6];

export default function Gallery() {
  return (
    <div className="gallery-grid">
      {ITEMS.map((n) => (
        <div key={n} className="gallery-item" aria-label={`Çizim ${n}`}>
          🖼️
        </div>
      ))}
    </div>
  );
}