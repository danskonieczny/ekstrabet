import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
// import StandingsPage from "./pages/StandingsPage";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminMatchesPage from "./pages/admin/AdminMatchesPage";
import type { User } from "./types";
import RulesPage from "./pages/RulesPage";

function App() {
    const { theme, toggleTheme } = useTheme();
    const { user, isAuthenticated, isLoading, error, login, logout, clearError } = useAuth();

    const AdminRoute = ({ user, children }: { user: User; children: React.ReactNode }) => {
        if (user.role !== "admin") return <Navigate to="/" replace />;
        return <>{children}</>;
    };

    // Ekran ładowania – przywracanie sesji z localStorage
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-7 h-7 rounded-md bg-red-500 flex items-center justify-center">
                        <span className="text-white font-black text-xs">EB</span>
                    </div>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Niezalogowany → ekran logowania
    if (!isAuthenticated || !user) {
        return (
            <div className={theme}>
                <LoginPage onLogin={login} error={error} clearError={clearError} />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
                <Navbar currentUser={user} toggleTheme={toggleTheme} theme={theme} onLogout={logout} />
                <main className="max-w-5xl mx-auto px-6 pt-20 pb-12">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profile" element={<ProfilePage currentUser={user} />} />
                        <Route path="/rules" element={<RulesPage />} />
                        {/* <Route path="/tabela" element={<StandingsPage />} /> */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                        <Route
                            path="/admin/users"
                            element={
                                <AdminRoute user={user}>
                                    <AdminUsersPage />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin/matches"
                            element={
                                <AdminRoute user={user}>
                                    <AdminMatchesPage />
                                </AdminRoute>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
