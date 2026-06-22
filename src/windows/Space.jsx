import { useApod } from "../hooks/useApod";

export default function Space() {
  const { data, loading, error } = useApod();

  // 1) Yükleniyor durumu
  if (loading) {
    return (
      <div className="apod-state">
        <div className="spinner" aria-hidden="true" />
        <p>Uzaydan veri çekiliyor…</p>
      </div>
    );
  }

  // 2) Hata durumu
  if (error) {
    return (
      <div className="apod-state">
        <p className="apod-error">⚠️ {error}</p>
      </div>
    );
  }

  // 3) Veri hâlâ yoksa (güvenlik kontrolü) hiçbir şey gösterme
  if (!data) return null;

  // 4) Başarılı durum
  return (
    <div className="apod">
      <h3 className="apod-title">{data.title}</h3>
      <small className="apod-date">{data.date}</small>
      {data.media_type === "image" ? (
        <img className="apod-img" src={data.url} alt={data.title} />
      ) : (
        <p>
          Bugünkü içerik bir video:{" "}
          <a href={data.url} target="_blank" rel="noopener noreferrer">izle</a>
        </p>
      )}
      <p className="apod-text">{data.explanation}</p>
    </div>
  );
}