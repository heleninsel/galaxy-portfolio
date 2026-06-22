import avatar from "../assets/hero.png"; // kendi görselinle değiştirebilirsin

export default function About() {
  return (
    <div className="about">
      {/* Üst kısım: solda avatar, sağda kısa bilgi (yan yana) */}
      <div className="about-top">
        <img className="about-avatar-img" src={avatar} alt="Profil" />
        <div className="about-intro">
          <h3 className="about-name">[İsim]</h3>
          <p className="about-tagline">İllüstratör &amp; geliştirici</p>
          <p className="about-short">
            Uzay, doğa ve fantastik temalarda çizimler yapıyorum.
          </p>
        </div>
      </div>

      {/* Alt kısım: kaydırılabilir uzun metin */}
      <div className="about-scroll">
        <p>
          Merhaba! Ben [İsim]. Buraya kendinle ilgili daha uzun bir yazı
          yazabilirsin — nasıl başladığın, neler yaptığın, ilgi alanların.
        </p>
        <p>
          Bu alan kaydırılabilir, yani istediğin kadar uzun yazabilirsin.
          Çizim tarzın, kullandığın araçlar, ilham kaynakların...
        </p>
        <p>
          Birkaç paragraf daha ekleyerek kaydırmayı test edebilirsin. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}