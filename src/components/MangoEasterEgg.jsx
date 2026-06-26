import { useState, useEffect } from "react";
import mango from "../assets/mango.jpeg";
import { useSound } from "../hooks/useSound";

// Gizli easter egg: klavyede "mango" yazınca Mango belirir.
export default function MangoEasterEgg() {
  const [show, setShow] = useState(false); const { play } = useSound();

  useEffect(() => {
    let typed = "";
    const target = "mango";

    const onKey = (e) => {
      // sadece harfleri takip et
      if (e.key.length === 1) {
        typed += e.key.toLowerCase();
        // son 5 karaktere bak
        if (typed.length > target.length) {
          typed = typed.slice(-target.length);
        }
       if (typed === target) {
          setShow(true);
          play("meow");
          typed = "";
          setTimeout(() => setShow(false), 4000);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!show) return null;

  return (
    <div className="mango-egg" aria-hidden="true">
      <img src={mango} alt="Mango the cat" className="mango-img" />
      <p className="mango-caption">you found mango! 🐱</p>
    </div>
  );
}