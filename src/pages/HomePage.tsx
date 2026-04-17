import { useState, useEffect } from "react";
import MatchList from "../components/MatchList";
import BetModal from "../components/BetModal";
import LeagueTabs from "../components/LeagueTabs";
import RankingTable from "../components/RankingTable";
import { fetchMatches } from "../data/dataSource";
import { mockBets } from "../data/bets";
import { authService } from "../services/authService";
import type { Match, League } from "../types";
import { canUseNitro } from "../utils/nitro";

const HomePage = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [activeLeague, setActiveLeague] = useState<League | "Wszystkie">("Wszystkie");

    // Pobierz zalogowanego użytkownika z sesji
    const session = authService.getSession();
    const userId = session?.user.id ?? "";

    // Wczytaj bety tylko dla zalogowanego użytkownika
    const userBets = mockBets.filter((b) => b.userId === userId);

    // Stan betów: Record<matchId, { home, away }>
    const [bets, setBets] = useState<Record<string, { home: number; away: number; isNitro: boolean }>>(() =>
        Object.fromEntries(userBets.map((b) => [b.matchId, { home: b.predictedHome, away: b.predictedAway, isNitro: b.isNitro ?? false }])),
    );

    useEffect(() => {
        fetchMatches().then(setMatches);
    }, []);

    const handleBet = (matchId: string) => {
        const match = matches.find((m) => m.id === matchId);
        if (match) setSelectedMatch(match);
    };

    const handleConfirm = (matchId: string, homeScore: number, awayScore: number, isNitro: boolean) => {
        setBets((prev) => ({ ...prev, [matchId]: { home: homeScore, away: awayScore, isNitro } }));
    };

    const filteredMatches = activeLeague === "Wszystkie" ? matches : matches.filter((m) => m.league === activeLeague);

    const upcomingRounds = filteredMatches.filter((m) => !m.isFinished).map((m) => m.round);
    const nextRound = upcomingRounds.length > 0 ? Math.min(...upcomingRounds) : 0;

    const visibleMatches = filteredMatches
        .filter((m) => m.isFinished || m.round <= nextRound + 1)
        .sort((a, b) => {
            const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
            if (dateDiff !== 0) return dateDiff;
            if (a.league === b.league) return 0;
            if (a.league === "PGE Ekstraliga") return -1;
            return 1;
        });

    const totalUpcoming = matches.filter((m) => !m.isFinished).length;
    const betsCount = Object.keys(bets).length;

    const allBetsForNitroCheck = [
        ...mockBets.filter((b) => b.userId !== userId),
        ...Object.entries(bets).map(([matchId, bet], i) => ({
            id: 9000 + i,
            matchId,
            userId,
            predictedHome: bet.home,
            predictedAway: bet.away,
            isNitro: bet.isNitro,
        })),
    ];

    return (
        <>
            {/* Nagłówek */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight mb-1 text-zinc-900 dark:text-white">Typowania</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    Oddanych typowań: <span className="text-zinc-900 dark:text-white font-medium">{betsCount}</span> / {totalUpcoming}
                </p>
            </div>

            {/* Zakładki ligowe */}
            <LeagueTabs activeLeague={activeLeague} onChange={setActiveLeague} />

            {/* Info o rundzie */}
            {nextRound > 0 && (
                <div className="mb-6 flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                        Najbliższa runda:
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                        Runda {nextRound}
                    </span>
                </div>
            )}

            {/* Layout dwukolumnowy */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Lewa kolumna – mecze */}
                <div className="flex-1">
                    {visibleMatches.length === 0 ? (
                        <div className="text-center py-16 text-zinc-400 dark:text-zinc-500 text-sm">Brak meczów do wyświetlenia</div>
                    ) : (
                        <MatchList matches={visibleMatches} onBet={handleBet} bets={bets} />
                    )}
                </div>

                {/* Prawa kolumna – ranking */}
                <div className="lg:w-72 shrink-0">
                    <RankingTable />
                </div>
            </div>

            {/* Modal obstawiania */}
            {selectedMatch && (
                <BetModal
                    match={selectedMatch}
                    userId={userId}
                    canUseNitro={canUseNitro(userId, selectedMatch, allBetsForNitroCheck, matches)}
                    existingIsNitro={bets[selectedMatch.id]?.isNitro ?? false}
                    onClose={() => setSelectedMatch(null)}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
};

export default HomePage;
