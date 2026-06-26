import { useState } from "react";

// Tüm jpeg'leri otomatik topla
const images = import.meta.glob("../assets/*.jpeg", { eager: true, import: "default" });

// dosya adından sayıyı çıkar (örn. "../assets/12.jpeg" -> 12)
const getNum = (path) => {
  const file = path.split("/").pop();      // "12.jpeg"
  const name = file.replace(".jpeg", "");  // "12"
  return parseInt(name, 10);
};

// sadece sayı isimli olanları al, sayısal sıraya diz
const PHOTOS = Object.entries(images)
  .filter(([path]) => !Number.isNaN(getNum(path)))
  .sort((a, b) => getNum(a[0]) - getNum(b[0]))
  .map(([, src]) => src);

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {PHOTOS.map((src, i) => (
          <button
            key={i}
            className="gallery-item"
            onClick={() => setSelected(src)}
            aria-label={`Fotoğraf ${i + 1} büyüt`}
          >
            <img src={src} alt={`Çalışma ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)} role="dialog" aria-label="Büyütülmüş fotoğraf">
          <img src={selected} alt="Büyütülmüş çalışma" className="lightbox-img" />
          <button className="lightbox-close" aria-label="Kapat">✕</button>
        </div>
      )}
    </div>
  );
}