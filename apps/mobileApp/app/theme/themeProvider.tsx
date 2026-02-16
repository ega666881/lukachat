import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const darkTheme = {
  background: "#1E1E1E",
  text: "#ffffff",
  headerBg: "#1a1a1a",
  headerText: "#ffffff",
  card: "#1c1c1e",
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    systemTheme || "light",
  );

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        setCurrentTheme("dark");
      } catch (e) {
        console.error("Ошибка загрузки темы:", e);
      }
    };
    loadSavedTheme();
  }, [systemTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
export const useColors = () => {
  return darkTheme;
};
