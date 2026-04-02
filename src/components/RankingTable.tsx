import { mockUsers } from "../data/users";

const RankingTable = () => {
    const sorted = [...mockUsers].sort((a, b) => b.totalPoints - a.totalPoints);

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Ranking graczy</h2>
            </div>
            <ul>
                {sorted.map((user, index) => (
                    <li
                        key={user.id}
                        className="flex items-center gap-4 px-5 py-3 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                        {/* Pozycja */}
                        <span
                            className={`text-sm font-bold w-5 text-center ${
                                index === 0
                                    ? "text-yellow-500"
                                    : index === 1
                                      ? "text-zinc-400 dark:text-zinc-300"
                                      : index === 2
                                        ? "text-amber-600"
                                        : "text-zinc-400 dark:text-zinc-600"
                            }`}
                        >
                            {index + 1}
                        </span>

                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-900 dark:text-white">
                            {user.username.charAt(0).toUpperCase()}
                        </div>

                        {/* Nazwa */}
                        <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-white">{user.username}</span>

                        {/* Punkty */}
                        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-300">{user.totalPoints} pkt</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RankingTable;
