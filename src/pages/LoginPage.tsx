import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
    onLogin: (username: string, password: string) => Promise<boolean>;
    error: string | null;
    clearError: () => void;
}

const LoginPage = ({ onLogin, error, clearError }: LoginPageProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        setIsLoading(true);
        await onLogin(username, password);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center px-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
                <div className="w-7 h-7 rounded-md bg-red-500 flex items-center justify-center">
                    <span className="text-white font-black text-xs">EB</span>
                </div>
                <span className="font-bold tracking-tight text-zinc-900 dark:text-white">
                    Ekstra<span className="font-black text-red-500">Bet</span>
                </span>
            </div>

            {/* Karta logowania */}
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">Zaloguj się</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Typuj wyniki meczów PGE Ekstraligi i 2 Ekstraligi</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Login */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Login
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                clearError();
                            }}
                            placeholder="Twój login"
                            autoComplete="username"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-sm"
                        />
                    </div>

                    {/* Hasło */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Hasło
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearError();
                                }}
                                placeholder="Twoje hasło"
                                autoComplete="current-password"
                                required
                                className="w-full px-4 py-2.5 pr-11 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Błąd logowania */}
                    {error && (
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Przycisk */}
                    <button
                        type="submit"
                        disabled={isLoading || !username || !password}
                        className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Logowanie...
                            </span>
                        ) : (
                            "Zaloguj się"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
