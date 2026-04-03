// ============================================================
// Tabele ligowe – dane statyczne na start sezonu 2026
// Docelowo pobierane z API: GET /api/standings/:league
// Źródło: https://ekstraliga.pl/se/tabela/pgee/2026
//         https://ekstraliga.pl/se/tabela/m2e/2026
// Ostatnia aktualizacja: 2026-04-02
// ============================================================

export interface StandingRow {
    position: number;
    teamId: string;
    teamName: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    bonus: number;
    points: number;
    diff: number;
    isPlayoff?: boolean; // strefa play-off
    isPlaydown?: boolean; // strefa play-down
    isRelegation?: boolean; // strefa spadkowa
}

export interface LeagueStandings {
    league: "PGE Ekstraliga" | "2 Ekstraliga";
    season: number;
    rows: StandingRow[];
    lastUpdated: string;
}

export const pgeeStandings: LeagueStandings = {
    league: "PGE Ekstraliga",
    season: 2026,
    lastUpdated: "2026-04-02",
    rows: [
        {
            position: 1,
            teamId: "TOR",
            teamName: "Apator Toruń",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isPlayoff: true,
        },
        {
            position: 2,
            teamId: "LUB",
            teamName: "Motor Lublin",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isPlayoff: true,
        },
        {
            position: 3,
            teamId: "WRO",
            teamName: "Betard Sparta Wrocław",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isPlayoff: true,
        },
        {
            position: 4,
            teamId: "GRU",
            teamName: "GKM Grudziądz",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isPlayoff: true,
        },
        {
            position: 5,
            teamId: "ZIE",
            teamName: "Falubaz Zielona Góra",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
        },
        {
            position: 6,
            teamId: "CZE",
            teamName: "Włókniarz Częstochowa",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
        },
        {
            position: 7,
            teamId: "GOR",
            teamName: "ROW Rybnik",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isPlaydown: true,
        },
        {
            position: 8,
            teamId: "LES",
            teamName: "Unia Leszno",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isRelegation: true,
        },
    ],
};

export const m2eStandings: LeagueStandings = {
    league: "2 Ekstraliga",
    season: 2026,
    lastUpdated: "2026-04-02",
    rows: [
        {
            position: 1,
            teamId: "RYB",
            teamName: "ROW Rybnik II",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isPlayoff: true,
        },
        {
            position: 2,
            teamId: "BYD",
            teamName: "Polonia Bydgoszcz",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isPlayoff: true,
        },
        { position: 3, teamId: "KRO", teamName: "Kolejarz Rawicz", played: 0, won: 0, drawn: 0, lost: 0, bonus: 0, points: 0, diff: 0 },
        { position: 4, teamId: "RZE", teamName: "Stal Rzeszów", played: 0, won: 0, drawn: 0, lost: 0, bonus: 0, points: 0, diff: 0 },
        { position: 5, teamId: "POZ", teamName: "Polonia Poznań", played: 0, won: 0, drawn: 0, lost: 0, bonus: 0, points: 0, diff: 0 },
        {
            position: 6,
            teamId: "OST",
            teamName: "Ostrovia Ostrów Wlkp.",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
        },
        { position: 7, teamId: "LOD", teamName: "Orzeł Łódź", played: 0, won: 0, drawn: 0, lost: 0, bonus: 0, points: 0, diff: 0 },
        {
            position: 8,
            teamId: "PIL",
            teamName: "Unia Piła",
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            bonus: 0,
            points: 0,
            diff: 0,
            isRelegation: true,
        },
    ],
};
