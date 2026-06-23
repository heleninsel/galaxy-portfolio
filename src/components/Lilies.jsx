import { useRef, useEffect, useState } from "react";
import lily from "../assets/lily.png";

// Havuz temasında yüzen + fareden kaçan nilüferler.
const COUNT = 9; // kaç nilüfer

export default function Lilies() {
  // her nilüferin başlangıç konumu ve özellikleri
  const [lilies] = useState(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      id: i,
    // ekranın kenarlarına yakın konumlandır (orta = menü, boş kalsın)
      x: Math.random() < 0.5 ? Math.random() * 22 + 3 : Math.random() * 22 + 75,
      y: Math.random() * 88 + 6,
      size: 60 + Math.random() * 70,     // px boyut
      drift: Math.random() * 0.005 + 0.0015, // süzülme hızı (çok yavaş)
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2, // dönme hızı
    }))
  );

  const ref = useRef(
    lilies.map((l) => ({ ...l, vx: 0, vy: 0, rot: 0, homeX: l.x, homeY: l.y }))
  );
  const containerRef = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    let raf;

    const onMove = (e) => {
      const p = e.touches ? e.touches[0] : e;
      pointer.current = {
        x: (p.clientX / window.innerWidth) * 100,
        y: (p.clientY / window.innerHeight) * 100,
      };
    };
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onLeave);

    const animate = () => {
      const nodes = containerRef.current?.children;
      if (nodes) {
        ref.current.forEach((l, i) => {
          // yavaş, görünür süzülme (evinin etrafında salınım)
          l.angle += l.drift;
          const tx = l.homeX + Math.sin(l.angle) * 6;
          const ty = l.homeY + Math.cos(l.angle * 0.7) * 6;

          // fareden kaçma (küçük etki alanı, yumuşak)
          const dx = l.x - pointer.current.x;
          const dy = l.y - pointer.current.y;
          const dist = Math.hypot(dx, dy);
          const radius = 4; // % cinsinden etki alanı (küçük)
          if (dist < radius && dist > 0) {
            const force = (radius - dist) / radius;
            l.vx += (dx / dist) * force * 0.25; // yumuşak/yavaş kaçış
            l.vy += (dy / dist) * force * 0.25;
          }

          // süzülme hedefine doğru yumuşakça çek
          l.x += (tx - l.x) * 0.02;
          l.y += (ty - l.y) * 0.02;

          // kaçış hızını uygula ve yavaşlat (sürtünme)
          l.vx *= 0.9;
          l.vy *= 0.9;
          l.x += l.vx;
          l.y += l.vy;

          // ekran içinde tut
          l.x = Math.max(0, Math.min(100, l.x));
          l.y = Math.max(0, Math.min(100, l.y));

          // hafif dönme
          l.rot += l.spin;

          const node = nodes[i];
          if (node) {
            node.style.left = `calc(${l.x}% - ${l.size / 2}px)`;
            node.style.top = `calc(${l.y}% - ${l.size / 2}px)`;
            node.style.transform = `rotate(${l.rot}deg)`;
          }
        });
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <div className="lilies" ref={containerRef} aria-hidden="true">
      {lilies.map((l) => (
        <img
          key={l.id}
          src={lily}
          className="lily"
          alt=""
          style={{ width: l.size, height: l.size }}
        />
      ))}
    </div>
  );
}
