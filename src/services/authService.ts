import type { Session } from "../types";
import { mockUsers } from "../data/users";

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
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 dni

// Generuje prosty token (mock) – docelowo JWT z serwera
const generateMockToken = (userId: string): string => {
    return `mock_token_${userId}_${Date.now()}`;
};

export const authService = {
    // ── LOGIN ──────────────────────────────────────────────
    // TODO: zastąpić → POST /api/auth/login
    async login(username: string, password: string): Promise<{ session: Session | null; error: string | null }> {
        // Symulacja opóźnienia sieciowego
        await new Promise((r) => setTimeout(r, 600));

        const credentials = MOCK_CREDENTIALS[username.toLowerCase()];
        if (!credentials || credentials.password !== password) {
            return { session: null, error: "Nieprawidłowy login lub hasło" };
        }

        const user = mockUsers.find((u) => u.id === credentials.userId);
        if (!user) {
            return { session: null, error: "Użytkownik nie istnieje" };
        }

        const session: Session = {
            user,
            token: generateMockToken(user.id),
            expiresAt: Date.now() + SESSION_DURATION_MS,
        };

        // Zapisz sesję lokalnie
        authService.saveSession(session);

        return { session, error: null };
    },

    // ── LOGOUT ─────────────────────────────────────────────
    // TODO: zastąpić → POST /api/auth/logout (unieważnienie tokenu)
    async logout(): Promise<void> {
        await new Promise((r) => setTimeout(r, 200));
        authService.clearSession();
    },

    // ── ODŚWIEŻ SESJĘ (przy wejściu na stronę) ─────────────
    // TODO: zastąpić → GET /api/auth/me (weryfikacja tokenu przez serwer)
    async restoreSession(): Promise<Session | null> {
        const session = authService.getSession();
        if (!session) return null;

        // Sprawdź czy sesja nie wygasła
        if (Date.now() > session.expiresAt) {
            authService.clearSession();
            return null;
        }

        // Symulacja weryfikacji tokenu przez serwer
        await new Promise((r) => setTimeout(r, 300));

        // TODO: tutaj fetch('/api/auth/me', { headers: { Authorization: `Bearer ${session.token}` } })
        return session;
    },

    // ── HELPERS – zapis/odczyt sesji ───────────────────────
    saveSession(session: Session): void {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch {
            // localStorage może być zablokowany (tryb prywatny)
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

    // ── TOKEN do przyszłych requestów API ──────────────────
    getToken(): string | null {
        return authService.getSession()?.token ?? null;
    },
};
