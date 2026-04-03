import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, LogOut, Users, Shield } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { User } from "../types";
import type { Theme } from "../hooks/useTheme";

interface NavbarProps {
    currentUser: User;
    toggleTheme: () => void;
    theme: Theme;
    onLogout: () => void;
}

const Navbar = ({ currentUser, toggleTheme, theme, onLogout }: NavbarProps) => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { to: "/", label: "Mecze" },
        // { to: "/tabela", label: "Tabela" },
        { to: "/profil", label: "Ranking" },
    ];

    // Zamknij menu po kliknięciu poza nim
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Zamknij menu przy zmianie strony
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
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
                    <button
                        onClick={toggleTheme}
                        className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        aria-label="Zmień motyw"
                    >
                        {theme === "dark" ? <Sun size={15} className="text-zinc-400" /> : <Moon size={15} className="text-zinc-500" />}
                    </button>

                    {/* Avatar z menu */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                            aria-label="Menu użytkownika"
                        >
                            <span className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block">{currentUser.username}</span>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-zinc-900 dark:text-white transition-all ${
                                    menuOpen ? "bg-zinc-300 dark:bg-zinc-600" : "bg-zinc-200 dark:bg-zinc-700"
                                }`}
                            >
                                {currentUser.username.charAt(0).toUpperCase()}
                            </div>
                        </button>

                        {/* Dropdown menu */}
                        {menuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-hidden z-50">
                                {/* Info o userze */}
                                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{currentUser.username}</p>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 capitalize">
                                        {currentUser.role === "admin" ? "Administrator" : "Użytkownik"}
                                    </p>
                                </div>

                                {/* Link do profilu */}
                                <Link
                                    to="/profil"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Mój profil
                                </Link>

                                {/* Admin – tylko dla roli admin */}
                                {currentUser.role === "admin" && (
                                    <>
                                        <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
                                        <div className="px-4 py-2">
                                            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                                Panel admina
                                            </p>
                                        </div>
                                        <Link
                                            to="/admin/users"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                        >
                                            <Users size={15} className="text-zinc-400" />
                                            Użytkownicy
                                        </Link>
                                        <Link
                                            to="/admin/matches"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                        >
                                            <Shield size={15} className="text-zinc-400" />
                                            Mecze
                                        </Link>
                                    </>
                                )}

                                {/* Wyloguj */}
                                <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
                                <button
                                    onClick={onLogout}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full text-left"
                                >
                                    <LogOut size={15} />
                                    Wyloguj się
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
