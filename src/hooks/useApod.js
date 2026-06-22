import { useState, useEffect } from "react";

// NASA APOD (Günün Astronomi Fotoğrafı) verisini çeken custom hook.
export function useApod() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // İstek iptal edilebilsin diye AbortController kullanıyoruz
    // (bileşen kapanırsa yarım kalan isteği iptal ederiz — bellek güvenliği).
    const controller = new AbortController();

    const fetchApod = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
          { signal: controller.signal }
        );

        // HTTP hatası (404, 500 vb.) fetch'i otomatik reddetmez, elle kontrol ederiz
        if (!res.ok) {
          throw new Error(`Sunucu hatası (${res.status})`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        // İptal edilen istekleri hata sayma
        if (err.name !== "AbortError") {
          setError("Uzay verisi yüklenemedi. İnternet bağlantını kontrol et.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
    return () => controller.abort(); // cleanup
  }, []);

  return { data, loading, error };
}