import type { Match } from "../types";
import { calculatePoints } from "../utils/scoring";

interface MatchCardProps {
    match: Match;
    onBet?: (matchId: string) => void;
    existingBet?: { home: number; away: number; isNitro: boolean };
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

    const now = new Date();
    const matchStarted = new Date(match.date) <= now;
    const isDarkBg = match.league === "2 Ekstraliga" || match.league === "PGE Ekstraliga";

    const bgColor =
        match.league === "2 Ekstraliga" ? "bg-[#202070]" : match.league === "PGE Ekstraliga" ? "bg-[#471849]" : "bg-white dark:bg-zinc-900";

    const textPrimary = isDarkBg ? "text-white" : "text-zinc-900 dark:text-white";
    const textMuted = isDarkBg ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400";
    const textFaint = isDarkBg ? "text-zinc-400" : "text-zinc-400 dark:text-zinc-500";
    const bgInner = isDarkBg ? "bg-white/10" : "bg-zinc-100 dark:bg-zinc-800";
    const bgBadge = isDarkBg ? "bg-white/10" : "bg-zinc-100 dark:bg-zinc-800";
    const bgBlocked = isDarkBg ? "bg-white/10 text-zinc-300" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500";

    return (
        <div
            className={`${bgColor} border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 flex flex-col`}
        >
            {/* Liga + data */}
            <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-medium uppercase tracking-widest ${textMuted}`}>{match.league}</span>
                <span className={`text-xs ${textFaint}`}>
                    {formattedDate} · {formattedTime}
                </span>
            </div>

            {/* Drużyny */}
            <div className="flex items-center justify-between gap-4 flex-1">
                {/* Gospodarz */}
                <div className="flex-1 text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden ${bgInner}`}>
                        {match.homeTeam.logo ? (
                            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10 object-contain" />
                        ) : (
                            <span className="text-xl">🏟️</span>
                        )}
                    </div>
                    <p className={`font-semibold text-sm leading-tight h-8 flex items-center justify-center px-1 ${textPrimary}`}>
                        <span className="line-clamp-2 text-center wrap-break-word w-full italic">{match.homeTeam.shortName}</span>
                    </p>
                </div>

                {/* Wynik lub VS */}
                <div className="text-center min-w-15 shrink-0">
                    {match.isFinished ? (
                        <div className={`text-2xl font-bold tracking-tight ${textPrimary} italic`}>
                            {match.homeScore} – {match.awayScore}
                        </div>
                    ) : (
                        <div className={`font-semibold text-lg ${textFaint}`}>VS</div>
                    )}
                </div>

                {/* Gość */}
                <div className="flex-1 text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden ${bgInner}`}>
                        {match.awayTeam.logo ? (
                            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 object-contain" />
                        ) : (
                            <span className="text-xl">🏟️</span>
                        )}
                    </div>
                    <p className={`font-semibold text-sm leading-tight h-8 flex items-center justify-center px-1 ${textPrimary}`}>
                        <span className="line-clamp-2 text-center wrap-break-word w-full italic">{match.awayTeam.shortName}</span>
                    </p>
                </div>
            </div>

            {/* Przycisk zawsze na dole */}
            <div className="mt-5">
                {!match.isFinished && (
                    <div className="space-y-2">
                        {existingBet && (
                            <div className={`text-center text-xs rounded-lg py-2 ${bgBadge} ${textMuted}`}>
                                {existingBet.isNitro && <span className="mr-1">⚡</span>}
                                Twój typ:{" "}
                                <span className={`font-semibold ${textPrimary}`}>
                                    {existingBet.home} – {existingBet.away}
                                </span>
                                {existingBet.isNitro && <span className="ml-1 text-yellow-500 font-bold">NITRO</span>}
                            </div>
                        )}

                        {matchStarted ? (
                            <div className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center select-none ${bgBlocked}`}>
                                {existingBet ? "Typowanie zablokowane" : "Nie oddano typowania"}
                            </div>
                        ) : (
                            <button
                                onClick={() => onBet?.(match.id)}
                                className="w-full py-2.5 rounded-xl bg-white/90 text-zinc-900 text-sm font-semibold hover:bg-white active:scale-95 transition-all duration-150"
                            >
                                {existingBet ? "Zmień typowanie" : "Obstaw mecz"}
                            </button>
                        )}
                    </div>
                )}

                {match.isFinished && (
                    <div className="text-center space-y-2">
                        {existingBet &&
                            (() => {
                                const score = calculatePoints(
                                    existingBet.home,
                                    existingBet.away,
                                    match.homeScore!,
                                    match.awayScore!,
                                    existingBet.isNitro,
                                );
                                return (
                                    <div className={`text-xs rounded-lg py-2 px-3 space-y-1 ${bgBadge}`}>
                                        <div className={textMuted}>
                                            Twój typ:{" "}
                                            <span className={`font-semibold ${textPrimary}`}>
                                                {existingBet.home} – {existingBet.away}
                                            </span>
                                        </div>
                                        <div className={`flex items-center justify-center gap-3 ${textMuted}`}>
                                            {existingBet.isNitro && <span className="text-yellow-500 font-bold text-xs">⚡ NITRO ×2</span>}
                                            <span>
                                                Zwycięzca: <span className={`font-semibold ${textPrimary}`}>+{score.winnerPoints}</span>
                                            </span>
                                            <span>·</span>
                                            <span>
                                                Wynik: <span className={`font-semibold ${textPrimary}`}>+{score.accuracyPoints}</span>
                                            </span>
                                            <span>·</span>
                                            <span className="text-green-400 font-bold">{score.total} pkt</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        <span className={`text-xs px-3 py-1 rounded-full ${bgBadge} ${textMuted}`}>Mecz zakończony</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchCard;
