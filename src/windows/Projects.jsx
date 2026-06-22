import Card from "../components/Card";

// Örnek proje verisi (sonra kendi projelerinle değiştirirsin)
const PROJECTS = [
  { id: 1, title: "Yıldız Haritası", desc: "İnteraktif gece gökyüzü illüstrasyonu." },
  { id: 2, title: "Orman Serisi", desc: "Dijital boyama çalışmaları koleksiyonu." },
  { id: 3, title: "Portfolyo Sitesi", desc: "Şu an içinde gezdiğin React projesi." },
];

export default function Projects() {
  return (
    <div className="stack">
      {PROJECTS.map((p) => (
        <Card key={p.id} title={p.title}>
          {p.desc}
        </Card>
      ))}
    </div>
  );
}