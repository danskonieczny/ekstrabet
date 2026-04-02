import { currentUser, mockUsers } from "../data/users";
import { matches } from "../data/matches";

const mockBets: Record<number, { home: number; away: number }> = {
    1: { home: 52, away: 38 },
    3: { home: 48, away: 42 },
};

const ProfilePage = () => {
    const sortedUsers = [...mockUsers].sort((a, b) => b.totalPoints - a.totalPoints);
    const userRank = sortedUsers.findIndex((u) => u.id === currentUser.id) + 1;

    const bettedMatches = matches.filter((m) => mockBets[m.id]);

    return (
        <>
            {/* Nagłówek profilu */}
            <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-2xl font-bold text-zinc-900 dark:text-white">
                    {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{currentUser.username}</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Miejsce w rankingu: #{userRank}</p>
                </div>
            </div>

            {/* Statystyki */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                    { label: "Punkty", value: currentUser.totalPoints },
                    { label: "Typowań", value: Object.keys(mockBets).length },
                    { label: "Ranking", value: `#${userRank}` },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center"
                    >
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Historia typowań */}
            <div>
                <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Historia typowań</h2>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                    {bettedMatches.length === 0 && (
                        <p className="text-zinc-400 dark:text-zinc-500 text-sm text-center py-8">Brak typowań</p>
                    )}
                    {bettedMatches.map((match, index) => {
                        const bet = mockBets[match.id];
                        const isLast = index === bettedMatches.length - 1;
                        return (
                            <div
                                key={match.id}
                                className={`flex items-center justify-between px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${
                                    !isLast ? "border-b border-zinc-100 dark:border-zinc-800" : ""
                                }`}
                            >
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                                        {match.homeTeam.name} vs {match.awayTeam.name}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">{match.league}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">
                                        {bet.home} – {bet.away}
                                    </p>
                                    {match.isFinished ? (
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            Wynik: {match.homeScore} – {match.awayScore}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Oczekuje</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
