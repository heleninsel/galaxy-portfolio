import { useState, useEffect } from "react";

// Light/dark tema yönetimi + localStorage kalıcılığı.
export function useTheme() {
  // başlangıçta kayıtlı tercihi oku, yoksa "dark" (uzay) varsayılan
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // tema değişince <html>'e yaz ve localStorage'a kaydet
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggle };
}