"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div>
      <Switch
        className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80"
        checked={theme === "light"}
        aria-label="Toggle dark mode"
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
};

export default ThemeSwitcher;
