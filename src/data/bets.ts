import type { Bet } from "../types";

// Mock betów – zastąpić → GET /api/bets
// Po stronie logowania filtruj: mockBets.filter(b => b.userId === session.user.id)
export const mockBets: Bet[] = [
    // daniel (userId: "1")
    { id: 1, matchId: 48, userId: "1", predictedHome: 48, predictedAway: 42 },
    { id: 2, matchId: 85, userId: "1", predictedHome: 48, predictedAway: 42, isNitro: true },
    // { id: 3, matchId: 46, userId: "1", predictedHome: 42, predictedAway: 48 },
    { id: 13, matchId: 47, userId: "1", predictedHome: 48, predictedAway: 42 },

    // mateusz (userId: "2")
    { id: 4, matchId: 48, userId: "2", predictedHome: 48, predictedAway: 42 },
    { id: 5, matchId: 85, userId: "2", predictedHome: 55, predictedAway: 35 },
    { id: 6, matchId: 46, userId: "2", predictedHome: 40, predictedAway: 50 },
    { id: 14, matchId: 47, userId: "2", predictedHome: 48, predictedAway: 42 },

    // maciej (userId: "3")
    { id: 7, matchId: 48, userId: "3", predictedHome: 62, predictedAway: 28 },
    { id: 8, matchId: 85, userId: "3", predictedHome: 44, predictedAway: 46 },
    { id: 9, matchId: 46, userId: "3", predictedHome: 50, predictedAway: 40 },

    // jakub (userId: "4")
    { id: 10, matchId: 48, userId: "4", predictedHome: 52, predictedAway: 38 },
    { id: 11, matchId: 85, userId: "4", predictedHome: 43, predictedAway: 47 },
    { id: 12, matchId: 46, userId: "4", predictedHome: 58, predictedAway: 32 },
    { id: 16, matchId: 47, userId: "4", predictedHome: 50, predictedAway: 40 },
];
