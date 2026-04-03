import type { Match } from "../types";

interface MatchCardProps {
    match: Match;
    onBet?: (matchId: number) => void;
    existingBet?: { home: number; away: number };
}

const MatchCard = ({ match, onBet, existingBet }: MatchCardProps) => {
    const matchDate = new Date(match.date);
    const formattedDate = matchDate.toLocaleDateString("pl-PL", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
    const formattedTime = matchDate.toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 flex flex-col">
            {/* Liga + data */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{match.league}</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {formattedDate} · {formattedTime}
                </span>
            </div>

            {/* Drużyny – flex-1 żeby wypełniały dostępną przestrzeń */}
            <div className="flex items-center justify-between gap-4 flex-1">
                {/* Gospodarz */}
                <div className="flex-1 text-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-2 overflow-hidden">
                        {match.homeTeam.logo ? (
                            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10 object-contain" />
                        ) : (
                            <span className="text-xl">🏟️</span>
                        )}
                    </div>
                    <p className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight h-8 flex items-center justify-center px-1">
                        <span className="line-clamp-2 text-center wrap-break-word w-full">{match.homeTeam.shortName}</span>
                    </p>
                </div>

                {/* Wynik lub VS */}
                <div className="text-center min-w-15 shrink-0">
                    {match.isFinished ? (
                        <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            {match.homeScore} – {match.awayScore}
                        </div>
                    ) : (
                        <div className="text-zinc-400 dark:text-zinc-500 font-semibold text-lg">VS</div>
                    )}
                </div>

                {/* Gość */}
                <div className="flex-1 text-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-2 overflow-hidden">
                        {match.awayTeam.logo ? (
                            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 object-contain" />
                        ) : (
                            <span className="text-xl">🏟️</span>
                        )}
                    </div>
                    <p className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight h-8 flex items-center justify-center px-1">
                        <span className="line-clamp-2 text-center wrap-break-word w-full">{match.awayTeam.shortName}</span>
                    </p>
                </div>
            </div>

            {/* Przycisk zawsze na dole */}
            <div className="mt-5">
                {!match.isFinished && (
                    <div className="space-y-2">
                        {existingBet && (
                            <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg py-2">
                                Twój typ:{" "}
                                <span className="text-zinc-900 dark:text-white font-semibold">
                                    {existingBet.home} – {existingBet.away}
                                </span>
                            </div>
                        )}
                        <button
                            onClick={() => onBet?.(match.id)}
                            className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-95 transition-all duration-150"
                        >
                            {existingBet ? "Zmień typowanie" : "Obstaw mecz"}
                        </button>
                    </div>
                )}

                {match.isFinished && (
                    <div className="text-center">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                            Mecz zakończony
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchCard;
