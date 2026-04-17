import type { Match } from "../types";
import MatchCard from "./MatchCard";

interface MatchListProps {
    matches: Match[];
    onBet: (matchId: string) => void;
    bets: Record<string, { home: number; away: number; isNitro: boolean }>;
}

const MatchList = ({ matches, onBet, bets }: MatchListProps) => {
    const upcoming = matches.filter((m) => !m.isFinished);
    const finished = matches.filter((m) => m.isFinished);

    return (
        <div className="space-y-8">
            {upcoming.length > 0 && (
                <section>
                    <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">
                        Nadchodzące mecze
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {upcoming.map((match) => (
                            <MatchCard key={match.id} match={match} onBet={onBet} existingBet={bets[match.id]} />
                        ))}
                    </div>
                </section>
            )}
            {finished.length > 0 && (
                <section>
                    <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Wyniki</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {finished.map((match) => (
                            <MatchCard key={match.id} match={match} onBet={onBet} existingBet={bets[match.id]} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MatchList;
