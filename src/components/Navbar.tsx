import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import type { User } from "../types";
import type { Theme } from "../hooks/useTheme";

interface NavbarProps {
    currentUser: User;
    toggleTheme: () => void;
    theme: Theme;
}

const Navbar = ({ currentUser, toggleTheme, theme }: NavbarProps) => {
    const location = useLocation();

    const navLinks = [
        { to: "/", label: "Mecze" },
        { to: "/tabela", label: "Tabela" },
        { to: "/profil", label: "Ranking" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-md bg-red-500 flex items-center justify-center">
                        <span className="text-white font-black text-xs">EB</span>
                    </div>
                    <span className="font-bold tracking-tight text-zinc-900 dark:text-white">
                        Ekstra<span className="font-black text-red-500">Bet</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`transition-colors ${
                                    isActive
                                        ? "text-zinc-900 dark:text-white font-medium"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Przełącznik motywu */}
                    <button
                        onClick={toggleTheme}
                        className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        aria-label="Zmień motyw"
                    >
                        {theme === "dark" ? <Sun size={15} className="text-zinc-400" /> : <Moon size={15} className="text-zinc-500" />}
                    </button>

                    <Link to="/profil" className="flex items-center gap-3">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block">{currentUser.totalPoints} pkt</span>
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-900 dark:text-white">
                            {currentUser.username.charAt(0).toUpperCase()}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
