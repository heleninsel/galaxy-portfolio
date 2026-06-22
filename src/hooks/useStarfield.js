import { useEffect, useRef } from "react";

// İki ayrı arka plan:
//  - "dark" (uzay): canvas'ta imleçten kaçan yıldızlar (animasyon döngüsü)
//  - "light" (havuz): hücre ağı SADECE BİR KEZ çizilir (kasmaz),
//    hareketi CSS animasyonu yapar (Starfield.jsx'te).
export function useStarfield(canvasRef, theme) {
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId = null;

    // ---------- UZAY: yıldızlar (sadece dark temada döner) ----------
    let stars, W, H;
    const initStars = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const isMobile = W < 768;
      const density = isMobile ? 9000 : 6000;
      const count = Math.floor((W * H) / density);
      // uzay paletinden yıldız halesi renkleri
      const STAR_COLORS = [
        "104, 188, 185",  // turkuaz #6dbcb9
        "72, 136, 183",   // gök mavisi #4888b7
        "71, 68, 118",    // indigo #474476
        "140, 239, 182",  // nane #8cefb6
      ];
      stars = Array.from({ length: count }, () => {
        const x = Math.random() * W;
        const y = Math.random() * H;
        return {
          x, y, baseX: x, baseY: y,
          size: Math.random() * 1.8 + 0.6,
          drift: Math.random() * 0.3 + 0.05,
          twinkle: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        };
      });
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const dx = s.x - pointer.current.x;
        const dy = s.y - pointer.current.y;
        const dist = Math.hypot(dx, dy);
        const radius = 120;
        if (dist < radius && dist > 0) {
          const force = (radius - dist) / radius;
          s.x += (dx / dist) * force * 4;
          s.y += (dy / dist) * force * 4;
        } else {
          s.x += (s.baseX - s.x) * 0.02;
          s.y += (s.baseY - s.y) * 0.02;
        }
        s.baseY += s.drift;
        if (s.baseY > H) s.baseY = 0;
        s.twinkle += 0.02;
        const alpha = 0.5 + Math.sin(s.twinkle) * 0.4;

        // renkli hale (dışta yıldızın rengi, içte beyaz çekirdek) -> derinlik
        const glowR = s.size * 3;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);          // merkez: beyaz
        grad.addColorStop(0.4, `rgba(${s.color}, ${alpha * 0.8})`);     // orta: renk
        grad.addColorStop(1, `rgba(${s.color}, 0)`);                    // dış: şeffaf
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // beyaz çekirdek (net nokta)
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      animationId = requestAnimationFrame(drawStars);
    };

    const onMove = (e) => {
      const pt = e.touches ? e.touches[0] : e;
      pointer.current = { x: pt.clientX, y: pt.clientY };
    };
    const onLeave = () => { pointer.current = { x: -9999, y: -9999 }; };

    if (theme === "dark") {
      initStars();
      drawStars();
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("touchend", onLeave);
      window.addEventListener("resize", initStars);
    } else {
      // havuzda bu canvas kullanılmaz (Lilies/CSS hallediyor); temizle
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("resize", initStars);
    };
  }, [canvasRef, theme]);
}

// Havuz hücre ağını BİR KEZ çizen yardımcı (Starfield.jsx kullanır).
export function paintCells(canvas, cell, edgeFactor, color, alpha) {
  const ctx = canvas.getContext("2d");
  const W = (canvas.width = Math.ceil(window.innerWidth * 1.2));
  const H = (canvas.height = Math.ceil(window.innerHeight * 1.2));

  const cols = Math.ceil(W / cell) + 2;
  const rows = Math.ceil(H / cell) + 2;
  const pts = [];
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      pts.push({
        x: i * cell + (Math.random() - 0.5) * cell * 0.6,
        y: j * cell + (Math.random() - 0.5) * cell * 0.6,
      });

  const smooth = cell * 0.5;
  const smin = (a, b, k) => {
    const h = Math.max(0, Math.min(1, 0.5 + 0.5 * (b - a) / k));
    return b * (1 - h) + a * h - k * h * (1 - h);
  };

  const img = ctx.createImageData(W, H);
  const data = img.data;
  const edgeWidth = cell * edgeFactor;
  const [cr, cg, cb] = color;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let d1 = Infinity, d2 = Infinity, d3 = Infinity;
      for (const p of pts) {
        const dx = x - p.x, dy = y - p.y, d = dx * dx + dy * dy;
        if (d < d1) { d3 = d2; d2 = d1; d1 = d; }
        else if (d < d2) { d3 = d2; d2 = d; }
        else if (d < d3) { d3 = d; }
      }
      const s1 = Math.sqrt(d1), s2 = Math.sqrt(d2), s3 = Math.sqrt(d3);
      const edge = smin(s2 - s1, s3 - s1, smooth * 0.22);
      if (edge < edgeWidth) {
        const idx = (y * W + x) * 4;
        data[idx] = cr; data[idx + 1] = cg; data[idx + 2] = cb; data[idx + 3] = alpha;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
}
