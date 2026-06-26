import { useState } from "react";

// Blog yazıları — içerikleri kendi yazılarınla değiştir
const POSTS = [
  {
    id: 1,
    title: "Portfolyo Yolculuğum",
    date: "Haziran 2026",
    excerpt: "Bu siteyi nasıl ve neden yaptığımı anlatıyorum.",
    body: `Bu portfolyo sitesini üniversite final projesi olarak yapmaya başladım.
İlham kaynağım masaüstü/pencere tarzı arayüzlerdi.

React öğrenirken çok şey deneyimledim: bileşenler, hook'lar, API çağrıları...
Buraya kendi yazını yazabilirsin, istediğin kadar uzun olabilir.`,
  },
  {
    id: 2,
    title: "Çizim ve Kod",
    date: "Mayıs 2026",
    excerpt: "İllüstrasyon ile yazılımı nasıl birleştiriyorum.",
    body: `Hem çizim yapmayı hem kod yazmayı seviyorum.
Bu ikisini birleştirince ortaya bu site gibi şeyler çıkıyor.

Buraya bu konudaki düşüncelerini, sürecini yazabilirsin.`,
  },
];

export default function Blog() {
  const [selected, setSelected] = useState(null); // açık yazı

  // Bir yazı açıksa: tam içeriği göster
  if (selected) {
    return (
      <div className="blog-post">
        <button className="blog-back" onClick={() => setSelected(null)}>
          ← Geri
        </button>
        <h2 className="blog-post-title">{selected.title}</h2>
        <p className="blog-post-date">{selected.date}</p>
        <div className="blog-post-body">
          {selected.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    );
  }

  // Yazı listesi
  return (
    <div className="stack">
      {POSTS.map((post) => (
        <article key={post.id} className="card blog-card">
          <h3 className="card-title">{post.title}</h3>
          <p className="blog-date">{post.date}</p>
          <p className="card-body">{post.excerpt}</p>
          <button className="blog-readmore" onClick={() => setSelected(post)}>
            Devamını oku →
          </button>
        </article>
      ))}
    </div>
  );
}