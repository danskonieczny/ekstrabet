export interface DataSource {
    pgee: string;
    m2e: string;
    lastUpdated: string;
    isStatic: boolean;
}

// Docelowa funkcja do nadpisania gdy backend będzie gotowy
export const fetchMatches = async () => {
    // TODO: zastąpić wywołaniem API gdy backend będzie gotowy
    // return await fetch('/api/matches').then(r => r.json())
    const { matches } = await import("./matches");
    return matches;
};
