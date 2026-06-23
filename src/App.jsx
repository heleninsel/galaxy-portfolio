import Lilies from "./components/Lilies";
import { useState } from "react";
import Starfield from "./components/Starfield";
import MainMenu from "./components/MainMenu";
import Window from "./components/Window";
import { useTheme } from "./hooks/useTheme";
import { WINDOWS } from "./data/windows";

// Pencere içerikleri
import About from "./windows/About";
import Gallery from "./windows/Gallery";
import Contact from "./windows/Contact";
import Blog from "./windows/Blog";
import Space from "./windows/Space";
import Links from "./windows/Links";
import Works from "./windows/Works";
import FAQ from "./windows/FAQ";

function App() {
  // Açık pencerelerin id listesi. Örn: ["about", "contact"]
  const [openIds, setOpenIds] = useState([]);

  // Light/dark tema (havuz / uzay)
  const { theme, toggle } = useTheme();

  // Bir pencere aç: zaten açıksa tekrar ekleme
const [positions, setPositions] = useState({});

  const openWindow = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setPositions((prev) => {
      if (prev[id]) return prev;
      // pencere boyutuna göre güvenli alan hesapla (taşmasın)
      const winW = 600;   // pencere genişliği (CSS ile aynı)
      const winH = 460;   // tahmini pencere yüksekliği
      const margin = 24;  // kenar boşluğu

      const maxX = Math.max(margin, window.innerWidth - winW - margin);
      const maxY = Math.max(margin, window.innerHeight - winH - margin);

      // güvenli alan içinde rastgele, ama çok kenara yapışmasın diye
      // orta bölgeye hafif yanaştırıyoruz
      const x = margin + Math.random() * (maxX - margin);
      const y = margin + Math.random() * (maxY - margin);

      return { ...prev, [id]: { x, y } };
    });
  };

  // Bir pencere kapat: listeden çıkar
  const closeWindow = (id) => {
    setOpenIds((prev) => prev.filter((x) => x !== id));
  };

  // id'ye göre doğru içerik bileşenini döndürür
  const renderContent = (id) => {
    switch (id) {
      case "about":
        return <About onOpenContact={() => openWindow("contact")} />;
      case "gallery":
        return <Gallery />;
      case "contact":
        return <Contact />;
      case "blog":
        return <Blog />;
      case "space":
        return <Space />;
      case "links":   return <Links />;
      case "works":   return <Works />;
      case "faq":     return <FAQ />;
      case "daily":   return <Space theme={theme} />;
      default:
        return <p>Bu pencere yakında ({id})</p>;
    }
  };

  return (
    <>
      <Starfield theme={theme} />
      {theme === "light" && <Lilies />}

<main className="desktop">
        <button className="theme-toggle" onClick={toggle} aria-label="Temayı değiştir">
          {theme === "dark" ? "☀️ Havuz" : "🌙 Uzay"}
        </button>

        <MainMenu onOpen={openWindow} />

        {openIds.map((id) => {
          const win = WINDOWS.find((w) => w.id === id);
          return (
            <Window key={id} win={win} position={positions[id]} onClose={() => closeWindow(id)}>
              {renderContent(id)}
            </Window>
          );
        })}
      </main>


    </>
  );
}

export default App;
