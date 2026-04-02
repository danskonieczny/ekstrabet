import type { League } from "../types";

interface LeagueTabsProps {
    activeLeague: League | "Wszystkie";
    onChange: (league: League | "Wszystkie") => void;
}

const tabs: (League | "Wszystkie")[] = ["Wszystkie", "PGE Ekstraliga", "2 Ekstraliga"];

const LeagueTabs = ({ activeLeague, onChange }: LeagueTabsProps) => {
    return (
        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeLeague === tab ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default LeagueTabs;
