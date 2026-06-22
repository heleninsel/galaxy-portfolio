import Card from "../components/Card";

const WORKS = [
  { id: 1, title: "Yıldız Haritası", desc: "İnteraktif gece gökyüzü illüstrasyonu." },
  { id: 2, title: "Orman Serisi", desc: "Dijital boyama koleksiyonu." },
  { id: 3, title: "Portfolyo Sitesi", desc: "Şu an içinde gezdiğin React projesi." },
];

export default function Works() {
  return (
    <div className="stack">
      {WORKS.map((w) => (
        <Card key={w.id} title={w.title}>{w.desc}</Card>
      ))}
    </div>
  );
}