export interface Team {
    id: number;
    shortName: string;
    name: string;
    league: "PGE Ekstraliga" | "2 Ekstraliga";
    logo: string;
}

export type League = Team["league"];

export interface Match {
    id: number;
    round: number;
    homeTeam: Team;
    awayTeam: Team;
    date: string;
    league: "PGE Ekstraliga" | "2 Ekstraliga";
    homeScore?: number;
    awayScore?: number;
    isFinished: boolean;
}

export interface Bet {
    id: number;
    matchId: number;
    userId: string;
    predictedHome: number;
    predictedAway: number;
    points?: number;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    avatar?: string;
    totalPoints: number;
    role: "user" | "admin";
}

// Sesja użytkownika
export interface Session {
    user: User;
    token: string;
    expiresAt: number;
}
