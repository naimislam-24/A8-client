"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // className="btn btn-ghost btn-circle btn-sm text-white/80 transition-all hover:bg-[#0F766E]/20 hover:text-[#2DD4BF] sm:btn-md"
      className="btn btn-ghost btn-circle btn-sm translate-x-2 text-white/80 transition-all hover:bg-[#0F766E]/20 hover:text-[#2DD4BF] sm:translate-x-0 sm:btn-md"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Moon size={21} /> : <Sun size={21} />}
    </button>
  );
};

export default ThemeToggle;
