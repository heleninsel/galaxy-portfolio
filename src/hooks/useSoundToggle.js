import { useState, useEffect } from "react";

export function useSoundToggle() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("soundEnabled") !== "false";
  });

  useEffect(() => {
    localStorage.setItem("soundEnabled", enabled ? "true" : "false");
  }, [enabled]);

  const toggleSound = () => setEnabled((v) => !v);
  return { soundEnabled: enabled, toggleSound };
}