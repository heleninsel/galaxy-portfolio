import { useSound } from "../hooks/useSound";
import { useState } from "react";

const FAQS = [
  { q: "Bilgisayar mühendisliğini neden seçtin?", a: "Teknolojiye ve bilgisayarların çalışma mantığına olan merakım nedeniyle bu alanı seçtim. Problem çözmeyi, yeni şeyler öğrenmeyi ve fikirleri somut projelere dönüştürmeyi seviyorum." },
  { q: "En çok ilgilendiğin alanlar neler?", a: "Siber güvenlik, yazılım geliştirme, bilgisayar sistemleri ve yapay zeka ilgimi çeken başlıca alanlar. Bunun yanında matematik ve uzay bilimleriyle de yakından ilgileniyorum." },
  { q: "Şu anda ne öğreniyorsun?", a: "Üniversite eğitimimin yanı sıra yazılım geliştirme, siber güvenlik ve çeşitli teknolojiler üzerine kendimi geliştirmeye devam ediyorum. Yeni araçlar ve teknolojiler denemeyi seviyorum." },
  { q: "Kod yazmadığın zamanlarda ne yapıyorsun?", a: "Fotoğraf çekmeyi, çizim yapmayı, doğada vakit geçirmeyi ve ilgimi çeken konular hakkında araştırma yapmayı seviyorum." },
  { q: "Komisyon alıyor musun?", a: "Evet, müsaitlik durumuma göre komisyon alıyorum. İletişim sekmesinden bana yazabilirsin." },
  { q: "Hangi araçları kullanıyorsun?", a: "Çoğunlukla dijital boyama yapıyorum; Krita, Aseprite, Photoshop başlıca araçlarım." },
  { q: "Baskı satışın var mı?", a: "Şu an için yok ama yakında bir baskı mağazası açmayı planlıyorum. Takipte kal!" },
  { q: "Bu portfolyonun amacı ne?", a: "Üzerinde çalıştığım projeleri, öğrendiğim teknolojileri ve kişisel çalışmalarımı tek bir yerde toplamak." },
  { q: "Sana nasıl ulaşabilirim?", a: "İİletişim bölümündeki bağlantılar üzerinden benimle iletişime geçebilirsiniz." },
];

export default function FAQ() {
  // o an açık olan sorunun index'i (null = hepsi kapalı)
  const [openIndex, setOpenIndex] = useState(null); const { play } = useSound();

const toggle = (i) => {
    play("accordion");
    setOpenIndex((cur) => (cur === i ? null : i));
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