import { useState } from "react";
import type { Match } from "../types";

interface BetModalProps {
    match: Match;
    userId: string;
    canUseNitro: boolean; // 👈 nowe
    existingIsNitro?: boolean; // 👈 nowe — czy obecny bet już ma NITRO
    onClose: () => void;
    onConfirm: (matchId: string, homeScore: number, awayScore: number, isNitro: boolean) => void;
}

const BetModal = ({ match, userId, canUseNitro, existingIsNitro, onClose, onConfirm }: BetModalProps) => {
    const [homeScore, setHomeScore] = useState<number>(45);
    const [awayScore, setAwayScore] = useState<number>(45);
    const [nitro, setNitro] = useState<boolean>(existingIsNitro ?? false);

    const matchDate = new Date(match.date);
    const formattedDate = matchDate.toLocaleDateString("pl-PL", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const handleConfirm = () => {
        if (new Date(match.date) <= new Date()) {
            alert("Nie można już oddać typowania — mecz się rozpoczął.");
            onClose();
            return;
        }

        const payload = {
            matchId: match.id,
            userId,
            predictedHome: homeScore,
            predictedAway: awayScore,
            isNitro: nitro,
        };

        console.log("📦 POST /api/bets — payload:", JSON.stringify(payload, null, 2));

        onConfirm(match.id, homeScore, awayScore, nitro);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Nagłówek */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">{match.league}</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">{formattedDate}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Drużyny i suwaki */}
                <div className="space-y-6 mb-8">
                    {/* Gospodarz */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-zinc-900 dark:text-white">{match.homeTeam.name}</span>
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white w-12 text-center">{homeScore}</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={90}
                            value={homeScore}
                            onChange={(e) => setHomeScore(Number(e.target.value))}
                            className="w-full accent-zinc-900 dark:accent-white cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-600 mt-1">
                            <span>0</span>
                            <span>90</span>
                        </div>
                    </div>

                    {/* Gość */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-zinc-900 dark:text-white">{match.awayTeam.name}</span>
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white w-12 text-center">{awayScore}</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={90}
                            value={awayScore}
                            onChange={(e) => setAwayScore(Number(e.target.value))}
                            className="w-full accent-zinc-900 dark:accent-white cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-600 mt-1">
                            <span>0</span>
                            <span>90</span>
                        </div>
                    </div>
                </div>

                {/* NITRO toggle */}
                {(canUseNitro || existingIsNitro) && (
                    <button
                        onClick={() => setNitro((prev) => !prev)}
                        className={`w-full py-3 rounded-xl mb-4 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 border-2 ${
                            nitro
                                ? "bg-yellow-400 border-yellow-400 text-zinc-900 shadow-lg shadow-yellow-400/30"
                                : "bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-yellow-400 hover:text-yellow-500"
                        }`}
                    >
                        <span className="text-lg">⚡</span>
                        {nitro ? "NITRO aktywne — punkty ×2!" : "Aktywuj NITRO (×2 punkty)"}
                    </button>
                )}

                {/* Zablokowany NITRO - już użyty w tej rundzie */}
                {!canUseNitro && !existingIsNitro && (
                    <div className="w-full py-3 rounded-xl mb-4 text-sm font-medium flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border-2 border-transparent">
                        <span className="text-lg">⚡</span>
                        NITRO użyte w tej rundzie
                    </div>
                )}

                {/* Podgląd typowania */}
                <div
                    className={`rounded-xl p-4 mb-6 text-center transition-colors ${
                        nitro
                            ? "bg-yellow-50 dark:bg-yellow-400/10 border border-yellow-300 dark:border-yellow-400/30"
                            : "bg-zinc-100 dark:bg-zinc-800"
                    }`}
                >
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Twoje typowanie</p>
                    <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {homeScore} – {awayScore}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                        {homeScore > awayScore
                            ? `Wygrywa ${match.homeTeam.name}`
                            : homeScore < awayScore
                              ? `Wygrywa ${match.awayTeam.name}`
                              : "Remis"}
                    </p>
                    {nitro && <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400 mt-1">⚡ Punkty zostaną podwojone</p>}
                </div>

                {/* Przyciski */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Anuluj
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold active:scale-95 transition-all duration-150 ${
                            nitro
                                ? "bg-yellow-400 text-zinc-900 hover:bg-yellow-300"
                                : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200"
                        }`}
                    >
                        {nitro ? "⚡ Potwierdź z NITRO" : "Potwierdź typowanie"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BetModal;
