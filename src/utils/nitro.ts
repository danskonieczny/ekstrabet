import type { Bet, Match } from "../types";

export function canUseNitro(userId: string, match: Match, allBets: Bet[], allMatches: Match[]): boolean {
    return !allBets.some((bet) => {
        if (!bet.isNitro || bet.userId !== userId) return false;
        const betMatch = allMatches.find((m) => m.id === bet.matchId);
        return betMatch?.round === match.round && betMatch?.league === match.league;
    });
}
