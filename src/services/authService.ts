import type { Session } from "../types";
import { mockUsers } from "../data/users";
import { mockBets } from "../data/bets";

// ============================================================
// MOCK – dane na sztywno, zastąpić API
// ============================================================
const MOCK_CREDENTIALS: Record<string, { password: string; userId: string }> = {
    daniel: { password: "Marik1234", userId: "1" },
    mateusz: { password: "Marik1234", userId: "2" },
    maciej: { password: "Marik1234", userId: "3" },
    jakub: { password: "Marik1234", userId: "4" },
};

const SESSION_KEY = "ekstrabet_session";

export const authService = {
    // ── LOGIN ──────────────────────────────────────────────
    // TODO: zastąpić → POST /api/auth/login
    async login(username: string, password: string): Promise<{ session: Session | null; error: string | null }> {
        await new Promise((r) => setTimeout(r, 600));

        const credentials = MOCK_CREDENTIALS[username.toLowerCase()];
        if (!credentials || credentials.password !== password) {
            return { session: null, error: "Nieprawidłowy login lub hasło" };
        }

        const user = mockUsers.find((u) => u.id === credentials.userId);
        if (!user) {
            return { session: null, error: "Użytkownik nie istnieje" };
        }

        const session: Session = { user };
        authService.saveSession(session);

        // 👇 Bety zalogowanego użytkownika – zastąpić → GET /api/bets?userId=...
        const userBets = mockBets.filter((b) => b.userId === user.id);
        console.log(`🎯 Bety użytkownika "${user.username}" (${userBets.length}):`, JSON.stringify(userBets, null, 2));

        return { session, error: null };
    },

    // ── LOGOUT ─────────────────────────────────────────────
    // TODO: zastąpić → POST /api/auth/logout
    async logout(): Promise<void> {
        await new Promise((r) => setTimeout(r, 200));
        authService.clearSession();
    },

    // ── ODŚWIEŻ SESJĘ (przy wejściu na stronę) ─────────────
    // TODO: zastąpić → GET /api/auth/me
    async restoreSession(): Promise<Session | null> {
        await new Promise((r) => setTimeout(r, 300));
        return authService.getSession();
    },

    // ── HELPERS ────────────────────────────────────────────
    saveSession(session: Session): void {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        }
    },

    getSession(): Session | null {
        try {
            const raw = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    clearSession(): void {
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY);
    },
};
