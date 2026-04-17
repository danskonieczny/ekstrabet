import type { Match, League } from "../types";
import type { DataSource } from "./dataSource";

import teamsRaw from "./teams.json";
import matchesRaw from "./matches.json";

interface TeamRaw {
    id: number;
    shortName: string;
    name: string;
    league: League;
    logo: string;
}

interface MatchRaw {
    id: string;
    round: number;
    homeTeamId: string;
    awayTeamId: string;
    date: string;
    league: League;
    isFinished: boolean;
    homeScore?: number;
    awayScore?: number;
}

export const dataSource: DataSource = {
    pgee: "https://ekstraliga.pl/se/terminarz-i-wyniki/pgee/2026",
    m2e: "https://ekstraliga.pl/se/terminarz-i-wyniki/m2e/2026",
    lastUpdated: "2026-04-17",
    isStatic: true,
};

export const teams = teamsRaw as TeamRaw[];

const teamMap = Object.fromEntries(teams.map((t) => [t.shortName, t]));

const t = (shortName: string): TeamRaw => {
    const team = teamMap[shortName];
    if (!team) throw new Error(`Team not found: ${shortName}`);
    return team;
};

export const matches: Match[] = (matchesRaw as MatchRaw[]).map((raw) => ({
    id: raw.id,
    round: raw.round,
    homeTeam: t(raw.homeTeamId),
    awayTeam: t(raw.awayTeamId),
    date: raw.date,
    league: raw.league,
    isFinished: raw.isFinished,
    ...(raw.homeScore !== undefined && { homeScore: raw.homeScore }),
    ...(raw.awayScore !== undefined && { awayScore: raw.awayScore }),
}));
