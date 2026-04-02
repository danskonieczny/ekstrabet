export type League = "PGE Ekstraliga" | "2 Ekstraliga";

export interface Team {
    id: string; // skrót drużyny np. 'LES', 'CZE'
    name: string;
    logo?: string;
    league: League;
}

export interface Match {
    id: number;
    round: number; // numer rundy
    homeTeam: Team;
    awayTeam: Team;
    date: string;
    league: League;
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
    avatar?: string;
    totalPoints: number;
}
