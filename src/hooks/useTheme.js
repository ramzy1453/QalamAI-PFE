import { useEffect, useState } from "react";

export default function useTheme() {
  const initTheme = () => {
    const localTheme = window.localStorage.getItem("theme");
    return localTheme ? localTheme : "night";
  };
  const [theme, setTheme] = useState(initTheme());

  const toggleTheme = () => {
    const newTheme = theme === "night" ? "winter" : "night";
    document.querySelector("#root").setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.querySelector("#root").setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme, isDark: theme === "night" };
}
