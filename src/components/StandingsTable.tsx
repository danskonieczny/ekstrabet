import type { LeagueStandings } from "../data/standings";

interface StandingsTableProps {
    standings: LeagueStandings;
}

const StandingsTable = ({ standings }: StandingsTableProps) => {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            {/* Nagłówek */}
            <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">{standings.league}</h2>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">Sezon {standings.season}</span>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 dark:border-zinc-800">
                            <th className="text-left px-5 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-8">
                                #
                            </th>
                            <th className="text-left px-2 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                Drużyna
                            </th>
                            <th
                                className="text-center px-2 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-10"
                                title="Mecze"
                            >
                                M
                            </th>
                            <th
                                className="text-center px-2 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-10"
                                title="Zwycięstwa"
                            >
                                Z
                            </th>
                            <th
                                className="text-center px-2 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-10"
                                title="Remisy"
                            >
                                R
                            </th>
                            <th
                                className="text-center px-2 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-10"
                                title="Porażki"
                            >
                                P
                            </th>
                            <th
                                className="text-center px-2 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-10"
                                title="Bonusy"
                            >
                                B
                            </th>
                            <th
                                className="text-center px-3 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-14"
                                title="Punkty"
                            >
                                PKT
                            </th>
                            <th
                                className="text-center px-3 py-2.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest w-14 hidden sm:table-cell"
                                title="Różnica punktów"
                            >
                                +/-
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.rows.map((row, index) => {
                            const isLast = index === standings.rows.length - 1;

                            // Kolor paska pozycji
                            const barColor = row.isPlayoff
                                ? "bg-green-500"
                                : row.isPlaydown
                                  ? "bg-yellow-500"
                                  : row.isRelegation
                                    ? "bg-red-500"
                                    : "bg-transparent";

                            return (
                                <tr
                                    key={row.teamId}
                                    className={`
                    hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors
                    ${!isLast ? "border-b border-zinc-100 dark:border-zinc-800" : ""}
                    ${row.isPlayoff ? "bg-green-50/30 dark:bg-green-950/10" : ""}
                    ${row.isRelegation ? "bg-red-50/30 dark:bg-red-950/10" : ""}
                  `}
                                >
                                    {/* Pozycja z paskiem */}
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1 h-4 rounded-full ${barColor}`} />
                                            <span
                                                className={`font-semibold text-sm ${
                                                    row.position <= 3 ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                                                }`}
                                            >
                                                {row.position}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Drużyna */}
                                    <td className="px-2 py-3">
                                        <span className="font-medium text-zinc-900 dark:text-white">{row.teamName}</span>
                                    </td>

                                    {/* Statystyki */}
                                    <td className="px-2 py-3 text-center text-zinc-500 dark:text-zinc-400">{row.played}</td>
                                    <td className="px-2 py-3 text-center text-zinc-500 dark:text-zinc-400">{row.won}</td>
                                    <td className="px-2 py-3 text-center text-zinc-500 dark:text-zinc-400">{row.drawn}</td>
                                    <td className="px-2 py-3 text-center text-zinc-500 dark:text-zinc-400">{row.lost}</td>
                                    <td className="px-2 py-3 text-center text-zinc-500 dark:text-zinc-400">{row.bonus}</td>

                                    {/* Punkty – wyróżnione */}
                                    <td className="px-3 py-3 text-center">
                                        <span className="font-bold text-zinc-900 dark:text-white">{row.points}</span>
                                    </td>

                                    {/* +/- */}
                                    <td className="px-3 py-3 text-center hidden sm:table-cell">
                                        <span
                                            className={`text-sm font-medium ${
                                                row.diff > 0
                                                    ? "text-green-600 dark:text-green-400"
                                                    : row.diff < 0
                                                      ? "text-red-500 dark:text-red-400"
                                                      : "text-zinc-400 dark:text-zinc-500"
                                            }`}
                                        >
                                            {row.diff > 0 ? `+${row.diff}` : row.diff === 0 ? "–" : row.diff}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Legenda */}
            <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">Play-off</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">Play-down / baraże</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">Spadek</span>
                </div>
            </div>
        </div>
    );
};

export default StandingsTable;
