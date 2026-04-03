import { useState, useEffect } from "react";
import type { User, Session } from "../types";
import { authService } from "../services/authService";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthState {
    user: User | null;
    session: Session | null;
    status: AuthStatus;
    error: string | null;
}

export const useAuth = () => {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        session: null,
        status: "idle",
        error: null,
    });

    // Przywróć sesję przy wejściu na stronę
    useEffect(() => {
        const restore = async () => {
            setAuth((prev) => ({ ...prev, status: "loading" }));
            const session = await authService.restoreSession();
            if (session) {
                setAuth({
                    user: session.user,
                    session,
                    status: "authenticated",
                    error: null,
                });
            } else {
                setAuth((prev) => ({ ...prev, status: "unauthenticated" }));
            }
        };
        restore();
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setAuth((prev) => ({ ...prev, status: "loading", error: null }));
        const { session, error } = await authService.login(username, password);
        if (session) {
            setAuth({
                user: session.user,
                session,
                status: "authenticated",
                error: null,
            });
            return true;
        } else {
            setAuth((prev) => ({
                ...prev,
                status: "unauthenticated",
                error: error,
            }));
            return false;
        }
    };

    const logout = async () => {
        await authService.logout();
        setAuth({
            user: null,
            session: null,
            status: "unauthenticated",
            error: null,
        });
    };

    const clearError = () => setAuth((prev) => ({ ...prev, error: null }));

    return {
        user: auth.user,
        session: auth.session,
        isAuthenticated: auth.status === "authenticated",
        isLoading: auth.status === "idle" || auth.status === "loading",
        error: auth.error,
        login,
        logout,
        clearError,
    };
};
