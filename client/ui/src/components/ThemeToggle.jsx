import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "qnex-theme";

function getInitialTheme() {
    if (typeof window === "undefined") return "dark";

    const savedTheme = window.localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return "dark";
}

function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);
    const isLight = theme === "light";

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
    };

    return (
        <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
            title={`Switch to ${isLight ? "dark" : "light"} mode`}
        >
            <span className="theme-toggle__track" aria-hidden="true">
                <span className="theme-toggle__thumb">
                    {isLight ? <Sun size={16} /> : <Moon size={16} />}
                </span>
            </span>
            <span className="theme-toggle__text">{isLight ? "Light" : "Dark"}</span>
        </button>
    );
}

export { ThemeToggle };
