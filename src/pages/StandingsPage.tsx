import { useState } from "react";
import StandingsTable from "../components/StandingsTable";
import { pgeeStandings, m2eStandings } from "../data/standings";
import type { League } from "../types";

const StandingsPage = () => {
    const [activeLeague, setActiveLeague] = useState<League>("PGE Ekstraliga");

    const standings = activeLeague === "PGE Ekstraliga" ? pgeeStandings : m2eStandings;

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">Tabela</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Sezon 2026 – faza zasadnicza</p>
            </div>

            {/* Zakładki */}
            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit mb-6">
                {(["PGE Ekstraliga", "2 Ekstraliga"] as League[]).map((league) => (
                    <button
                        key={league}
                        onClick={() => setActiveLeague(league)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeLeague === league
                                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                        {league}
                    </button>
                ))}
            </div>

            <StandingsTable standings={standings} />
        </>
    );
};

export default StandingsPage;
