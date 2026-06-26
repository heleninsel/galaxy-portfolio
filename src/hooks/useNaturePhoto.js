import { useState, useEffect } from "react";

// Lorem Picsum'dan rastgele bir doğa/manzara fotoğrafı + bilgisi çeker.
export function useNaturePhoto() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPhoto = async () => {
      try {
        setLoading(true);
        setError(null);

        // rastgele bir foto ID'si seç (her açılışta farklı foto)
        const randomId = Math.floor(Math.random() * 900) + 50;

        // önce foto bilgisini çek (yazar, boyut)
        const infoRes = await fetch(
          `https://picsum.photos/id/${randomId}/info`,
          { signal: controller.signal }
        );
        if (!infoRes.ok) throw new Error(`Sunucu hatası (${infoRes.status})`);
        const info = await infoRes.json();

        // gösterilecek fotoğraf URL'si (manzara boyutu)
        const imageUrl = `https://picsum.photos/id/${randomId}/800/500`;

        setData({
          url: imageUrl,
          author: info.author,
          width: info.width,
          height: info.height,
          link: info.url,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Doğa fotoğrafı yüklenemedi. İnternet bağlantını kontrol et.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}