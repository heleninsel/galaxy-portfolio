import lily from "../assets/lily.svg";

// Havuz temasında ekranda yavaşça süzülen nilüferler.
// Birkaç tane, farklı konum/hız/boyutta.
const LILIES = [
  { top: "15%", size: 90,  duration: 28, delay: 0 },
  { top: "45%", size: 64,  duration: 36, delay: -8 },
  { top: "70%", size: 110, duration: 32, delay: -16 },
  { top: "30%", size: 70,  duration: 44, delay: -22 },
];

export default function Lilies() {
  return (
    <div className="lilies" aria-hidden="true">
      {LILIES.map((l, i) => (
        <img
          key={i}
          src={lily}
          className="lily"
          alt=""
          style={{
            top: l.top,
            width: l.size,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}
    </div>
  );
}