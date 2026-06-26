import { useNaturePhoto } from "../hooks/useNaturePhoto";

export default function Nature() {
  const { data, loading, error } = useNaturePhoto();

  if (loading) {
    return (
      <div className="apod-state">
        <div className="spinner" aria-hidden="true" />
        <p>Doğadan bir kare yükleniyor…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apod-state">
        <p className="apod-error">⚠️ {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="apod">
      <h3 className="apod-title">Günün Doğa Karesi 🌿</h3>
      <img className="apod-img" src={data.url} alt="Doğa fotoğrafı" />
      <p className="apod-text">Fotoğrafçı: {data.author} · {data.width}×{data.height}</p>
      <a href={data.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ alignSelf: "flex-start" }}>
        Orijinali gör →
      </a>
    </div>
  );
}