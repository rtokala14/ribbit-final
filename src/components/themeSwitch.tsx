"use client";

import { Moon, MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      asChild
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <MoonIcon className="h-10 w-10 p-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <Sun className="rotate-0 h-10 w-10 p-2 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
    </Button>
  );
}

export default ThemeChanger;
