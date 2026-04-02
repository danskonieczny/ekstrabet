import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { currentUser } from "./data/users";
import { useTheme } from "./hooks/useTheme";

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
                <Navbar currentUser={currentUser} toggleTheme={toggleTheme} theme={theme} />
                <main className="max-w-5xl mx-auto px-6 pt-20 pb-12">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profil" element={<ProfilePage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
