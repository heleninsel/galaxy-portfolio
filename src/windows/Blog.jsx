import Card from "../components/Card";

const POSTS = [
  { id: 1, title: "Uzayı çizmek", date: "12 Haz 2026", excerpt: "Yıldız alanlarını nasıl boyuyorum..." },
  { id: 2, title: "Renk paletleri", date: "3 Haz 2026", excerpt: "Sınırlı palet kullanmanın gücü..." },
];

export default function Blog() {
  return (
    <div className="stack">
      {POSTS.map((post) => (
        <Card key={post.id} title={post.title} footer={<small>{post.date}</small>}>
          {post.excerpt}
        </Card>
      ))}
    </div>
  );
}