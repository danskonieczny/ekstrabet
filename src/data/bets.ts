import type { Bet } from "../types";

// Mock betów – zastąpić → GET /api/bets
// Po stronie logowania filtruj: mockBets.filter(b => b.userId === session.user.id)
export const mockBets: Bet[] = [
    // daniel (userId: "1")
    { id: 1, matchId: "PGEE-R01-M01", userId: "1", predictedHome: 50, predictedAway: 40 },
    { id: 2, matchId: "PGEE-R01-M02", userId: "1", predictedHome: 48, predictedAway: 42 },
    { id: 3, matchId: "PGEE-R01-M03", userId: "1", predictedHome: 50, predictedAway: 40 },
    { id: 4, matchId: "PGEE-R01-M04", userId: "1", predictedHome: 46, predictedAway: 44 },
    { id: 5, matchId: "M2E-R01-M01", userId: "1", predictedHome: 48, predictedAway: 42 },
    { id: 6, matchId: "M2E-R01-M02", userId: "1", predictedHome: 48, predictedAway: 42 },
    { id: 7, matchId: "M2E-R01-M03", userId: "1", predictedHome: 42, predictedAway: 48 },
    { id: 8, matchId: "M2E-R01-M04", userId: "1", predictedHome: 48, predictedAway: 42 },
    { id: 33, matchId: "M2E-R02-M01", userId: "1", predictedHome: 49, predictedAway: 41 },
    { id: 34, matchId: "M2E-R02-M02", userId: "1", predictedHome: 40, predictedAway: 50 },
    { id: 35, matchId: "M2E-R02-M03", userId: "1", predictedHome: 49, predictedAway: 41 },
    // { id: 36, matchId: "M2E-R02-M04", userId: "1", predictedHome: 39, predictedAway: 51 },

    // mateusz (userId: "2")
    { id: 9, matchId: "PGEE-R01-M01", userId: "2", predictedHome: 55, predictedAway: 35 },
    { id: 10, matchId: "PGEE-R01-M02", userId: "2", predictedHome: 55, predictedAway: 35 },
    { id: 11, matchId: "PGEE-R01-M03", userId: "2", predictedHome: 51, predictedAway: 39 },
    { id: 12, matchId: "PGEE-R01-M04", userId: "2", predictedHome: 50, predictedAway: 40 },
    { id: 13, matchId: "M2E-R01-M01", userId: "2", predictedHome: 51, predictedAway: 39 },
    { id: 14, matchId: "M2E-R01-M02", userId: "2", predictedHome: 55, predictedAway: 35 },
    { id: 15, matchId: "M2E-R01-M03", userId: "2", predictedHome: 46, predictedAway: 44 },
    { id: 16, matchId: "M2E-R01-M04", userId: "2", predictedHome: 50, predictedAway: 40 },
    { id: 41, matchId: "M2E-R02-M01", userId: "2", predictedHome: 55, predictedAway: 35 },
    { id: 42, matchId: "M2E-R02-M02", userId: "2", predictedHome: 42, predictedAway: 48 },
    { id: 43, matchId: "M2E-R02-M03", userId: "2", predictedHome: 53, predictedAway: 37 },
    // { id: 44, matchId: "M2E-R02-M04", userId: "2", predictedHome: 39, predictedAway: 51 },

    // maciej (userId: "3")
    { id: 17, matchId: "PGEE-R01-M01", userId: "3", predictedHome: 57, predictedAway: 33 },
    { id: 18, matchId: "PGEE-R01-M02", userId: "3", predictedHome: 56, predictedAway: 34 },
    { id: 19, matchId: "PGEE-R01-M03", userId: "3", predictedHome: 51, predictedAway: 39 },
    { id: 20, matchId: "PGEE-R01-M04", userId: "3", predictedHome: 52, predictedAway: 38 },
    { id: 21, matchId: "M2E-R01-M01", userId: "3", predictedHome: 50, predictedAway: 40 },
    { id: 22, matchId: "M2E-R01-M02", userId: "3", predictedHome: 50, predictedAway: 40 },
    { id: 23, matchId: "M2E-R01-M03", userId: "3", predictedHome: 46, predictedAway: 44 },
    { id: 24, matchId: "M2E-R01-M04", userId: "3", predictedHome: 53, predictedAway: 37 },
    { id: 37, matchId: "M2E-R02-M01", userId: "3", predictedHome: 49, predictedAway: 41 },
    { id: 38, matchId: "M2E-R02-M02", userId: "3", predictedHome: 39, predictedAway: 51 },
    { id: 39, matchId: "M2E-R02-M03", userId: "3", predictedHome: 50, predictedAway: 40 },
    // { id: 40, matchId: "M2E-R02-M04", userId: "3", predictedHome: 39, predictedAway: 51 },

    // jakub (userId: "4")
    // { id: 25, matchId: "PGEE-R01-M01", userId: "4", predictedHome: 48, predictedAway: 42 },
    // { id: 26, matchId: "PGEE-R01-M02", userId: "4", predictedHome: 55, predictedAway: 35 },
    // { id: 27, matchId: "PGEE-R01-M03", userId: "4", predictedHome: 40, predictedAway: 50 },
    // { id: 28, matchId: "PGEE-R01-M04", userId: "4", predictedHome: 48, predictedAway: 42 },
    // { id: 29, matchId: "M2E-R01-M01", userId: "4", predictedHome: 48, predictedAway: 42 },
    // { id: 30, matchId: "M2E-R01-M02", userId: "4", predictedHome: 55, predictedAway: 35 },
    // { id: 31, matchId: "M2E-R01-M03", userId: "4", predictedHome: 40, predictedAway: 50 },
    // { id: 32, matchId: "M2E-R01-M04", userId: "4", predictedHome: 48, predictedAway: 42 },
];
