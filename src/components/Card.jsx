// Yeniden kullanılabilir kart. Proje ve blog öğelerinde kullanacağız.
export default function Card({ title, children, footer }) {
  return (
    <article className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </article>
  );
}