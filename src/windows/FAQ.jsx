import { useState } from "react";

const FAQS = [
  { q: "Komisyon alıyor musun?", a: "Evet, müsaitlik durumuma göre komisyon alıyorum. İletişim sekmesinden bana yazabilirsin." },
  { q: "Hangi araçları kullanıyorsun?", a: "Çoğunlukla dijital boyama yapıyorum; Procreate ve Photoshop başlıca araçlarım." },
  { q: "Baskı satışın var mı?", a: "Şu an için yok ama yakında bir baskı mağazası açmayı planlıyorum. Takipte kal!" },
  { q: "Çizimleri ne kadar sürede teslim ediyorsun?", a: "İşin büyüklüğüne göre değişir, genelde 1-2 hafta içinde." },
];

export default function FAQ() {
  // o an açık olan sorunun index'i (null = hepsi kapalı)
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((cur) => (cur === i ? null : i)); // aynısına basınca kapat
  };

  return (
    <div className="stack">
      {FAQS.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="faq-item">
            <button
              className="faq-q"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span>{f.q}</span>
              <span className="faq-chevron">{isOpen ? "−" : "+"}</span>
            </button>
            <div className={"faq-a-wrap" + (isOpen ? " open" : "")}>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}