import avatar from "../assets/hero.jpeg"; // kendi görselinle değiştirebilirsin

export default function About() {
  return (
    <div className="about">
      {/* Üst kısım: solda avatar, sağda kısa bilgi (yan yana) */}
      <div className="about-top">
        <img className="about-avatar-img" src={avatar} alt="Profil" />
        <div className="about-intro">
          <h3 className="about-name">Helen İNSEL</h3>
          <p className="about-tagline">İllüstratör &amp; geliştirici</p>
          <p className="about-short">
            Bilgisayar Mühendisliği öğrencisi
          </p>
        </div>
      </div>

      {/* Alt kısım: kaydırılabilir uzun metin */}
      <div className="about-scroll">
        <p>
          Merhaba! Ben Helen.
        </p>
        <p>
          Bilgisayar Mühendisliği öğrencisiyim ve özellikle yazılım, siber güvenlik ve bilgisayar sistemleri alanlarına ilgi duyuyorum. Teknolojiyi yalnızca bir kariyer alanı olarak değil, sürekli öğrenebileceğim ve kendimi geliştirebileceğim bir alan olarak görüyorum.

</p><p>Bilgisayar bilimlerinin yanında matematik ve uzay bilimleri de ilgimi çekiyor. Karmaşık sistemlerin nasıl çalıştığını anlamak, yeni bilgiler öğrenmek ve farklı problemler üzerinde düşünmekten keyif alıyorum. Üniversite eğitimimin yanında çeşitli TÜBİTAK projelerinde yer alıyor, Sustain2Solve ekibinde görev alıyor ve gönüllü olarak temel yazılım eğitimleri veriyorum. Teknik becerilerimi geliştirmenin yanı sıra, bilgi paylaşımının ve ekip çalışmasının da önemli olduğuna inanıyorum.

</p><p>Yeni teknolojileri öğrenmek, farklı alanlarda araştırmalar yapmak ve kendimi sürekli geliştirmek günlük hayatımın önemli bir parçası. Siber güvenlik, bilgisayar mimarisi ve yazılım geliştirme alanlarında çalışmalarımı sürdürürken aynı zamanda matematik ve uzay bilimleri gibi konulara da ilgi duyuyorum.

</p><p>Teknoloji dışında fotoğrafçılık, çizim ve doğa ile ilgileniyorum. Bu uğraşlar hem yaratıcılığımı besliyor hem de farklı bakış açıları kazanmama yardımcı oluyor.
        </p>
        <p>
         Bu portfolyo; üzerinde çalıştığım projeleri, katıldığım çalışmalarını ve öğrenme yolculuğum boyunca edindiğim deneyimleri paylaşmak amacıyla oluşturduğum kişisel alanımdır.
        </p>
      </div>
    </div>
  );
}