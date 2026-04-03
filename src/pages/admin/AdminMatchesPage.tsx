import { useState } from "react";
import { matches as initialMatches } from "../../data/matches";
import { teams } from "../../data/matches";
import type { Match, League } from "../../types";
import { Pencil, Trash2, Plus, Trophy } from "lucide-react";

type TeamMap = Record<string, { id: number; shortName: string; name: string; league: "PGE Ekstraliga" | "2 Ekstraliga"; logo: string }>;

const allTeams: TeamMap = Object.fromEntries(teams.map((t) => [t.shortName, t]));

const emptyForm = {
    homeTeamId: "",
    awayTeamId: "",
    date: "",
    time: "",
    league: "PGE Ekstraliga" as League,
    round: 1,
    homeScore: "",
    awayScore: "",
    isFinished: false,
};

type MatchForm = typeof emptyForm;

const AdminMatchesPage = () => {
    const [matches, setMatches] = useState<Match[]>(initialMatches);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<MatchForm>(emptyForm);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMatch, setNewMatch] = useState<MatchForm>(emptyForm);
    const [filterLeague, setFilterLeague] = useState<League>("PGE Ekstraliga");

    // ── Pomocnicze ────────────────────────────────────────────
    const formToMatch = (form: MatchForm, id: number): Match => {
        const homeTeam = allTeams[form.homeTeamId];
        const awayTeam = allTeams[form.awayTeamId];
        return {
            id,
            round: Number(form.round),
            homeTeam,
            awayTeam,
            date: `${form.date}T${form.time || "18:00"}`,
            league: form.league,
            isFinished: form.isFinished,
            homeScore: form.isFinished ? Number(form.homeScore) : undefined,
            awayScore: form.isFinished ? Number(form.awayScore) : undefined,
        };
    };

    const matchToForm = (match: Match): MatchForm => ({
        homeTeamId: match.homeTeam.shortName, // ← było: match.homeTeam.id
        awayTeamId: match.awayTeam.shortName,
        date: match.date.split("T")[0],
        time: match.date.split("T")[1]?.slice(0, 5) ?? "18:00",
        league: match.league,
        round: match.round,
        homeScore: match.homeScore?.toString() ?? "",
        awayScore: match.awayScore?.toString() ?? "",
        isFinished: match.isFinished,
    });

    const teamsForLeague = (league: League) => Object.values(allTeams).filter((t) => t.league === league);

    // ── Akcje ─────────────────────────────────────────────────
    const startEdit = (match: Match) => {
        setEditingId(match.id);
        setEditForm(matchToForm(match));
        setShowAddForm(false);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm(emptyForm);
    };

    const saveEdit = () => {
        if (!editingId) return;
        // TODO: zastąpić → PATCH /api/admin/matches/:id
        setMatches((prev) => prev.map((m) => (m.id === editingId ? formToMatch(editForm, editingId) : m)));
        cancelEdit();
    };

    const deleteMatch = (id: number) => {
        // TODO: zastąpić → DELETE /api/admin/matches/:id
        if (!confirm("Na pewno usunąć ten mecz?")) return;
        setMatches((prev) => prev.filter((m) => m.id !== id));
    };

    const addMatch = () => {
        if (!newMatch.homeTeamId || !newMatch.awayTeamId || !newMatch.date) return;
        // TODO: zastąpić → POST /api/admin/matches
        const id = Math.max(0, ...matches.map((m) => m.id)) + 1;
        setMatches((prev) => [...prev, formToMatch(newMatch, id)]);
        setNewMatch(emptyForm);
        setShowAddForm(false);
    };

    const filteredMatches = matches.filter((m) => m.league === filterLeague);

    const sortedMatches = [...filteredMatches].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // ── Formularz ─────────────────────────────────────────────
    const MatchForm = ({
        form,
        onChange,
        onSave,
        onCancel,
        saveLabel,
    }: {
        form: MatchForm;
        onChange: (f: MatchForm) => void;
        onSave: () => void;
        onCancel: () => void;
        saveLabel: string;
    }) => {
        const teams = teamsForLeague(form.league);
        const isValid = form.homeTeamId && form.awayTeamId && form.homeTeamId !== form.awayTeamId && form.date;

        return (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Liga */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                            Liga
                        </label>
                        <select
                            value={form.league}
                            onChange={(e) =>
                                onChange({
                                    ...form,
                                    league: e.target.value as League,
                                    homeTeamId: "",
                                    awayTeamId: "",
                                })
                            }
                            className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        >
                            <option value="PGE Ekstraliga">PGE Ekstraliga</option>
                            <option value="2 Ekstraliga">2 Ekstraliga</option>
                        </select>
                    </div>

                    {/* Runda */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                            Runda
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={form.round}
                            onChange={(e) => onChange({ ...form, round: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        />
                    </div>

                    {/* Data */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                            Data
                        </label>
                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) => onChange({ ...form, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        />
                    </div>

                    {/* Godzina */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                            Godzina
                        </label>
                        <input
                            type="time"
                            value={form.time}
                            onChange={(e) => onChange({ ...form, time: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        />
                    </div>

                    {/* Gospodarz */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                            Gospodarz
                        </label>
                        <select
                            value={form.homeTeamId}
                            onChange={(e) => onChange({ ...form, homeTeamId: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        >
                            <option value="">Wybierz...</option>
                            {teams
                                .filter((t) => t.shortName !== form.awayTeamId)
                                .map((t) => (
                                    <option key={t.shortName} value={t.shortName}>
                                        {" "}
                                        {t.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Gość */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                            Gość
                        </label>
                        <select
                            value={form.awayTeamId}
                            onChange={(e) => onChange({ ...form, awayTeamId: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        >
                            <option value="">Wybierz...</option>
                            {teams
                                .filter((t) => t.shortName !== form.homeTeamId)
                                .map((t) => (
                                    <option key={t.shortName} value={t.shortName}>
                                        {t.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Mecz zakończony */}
                    <div className="flex items-center gap-3 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div
                                onClick={() => onChange({ ...form, isFinished: !form.isFinished })}
                                className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                                    form.isFinished ? "bg-zinc-900 dark:bg-white" : "bg-zinc-300 dark:bg-zinc-600"
                                }`}
                            >
                                <div
                                    className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                                        form.isFinished ? "left-5 bg-white dark:bg-zinc-900" : "left-0.5 bg-white dark:bg-zinc-400"
                                    }`}
                                />
                            </div>
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Mecz zakończony</span>
                        </label>
                    </div>

                    {/* Wynik – tylko gdy zakończony */}
                    {form.isFinished && (
                        <>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                                    Wynik gospodarza
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    max={90}
                                    value={form.homeScore}
                                    onChange={(e) =>
                                        onChange({
                                            ...form,
                                            homeScore: e.target.value,
                                            awayScore: String(90 - Number(e.target.value)),
                                        })
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-widest">
                                    Wynik gościa
                                </label>
                                <input
                                    type="number"
                                    value={form.awayScore}
                                    readOnly
                                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 text-sm cursor-not-allowed"
                                />
                                <p className="text-xs text-zinc-400 mt-1">Wyliczane automatycznie (90 – wynik gosp.)</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Przyciski */}
                <div className="flex gap-3 mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                        onClick={onSave}
                        disabled={!isValid}
                        className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-40 active:scale-95 transition-all"
                    >
                        {saveLabel}
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                        Anuluj
                    </button>
                </div>
            </div>
        );
    };

    // ── Render ────────────────────────────────────────────────
    return (
        <>
            {/* Nagłówek */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">Mecze</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{filteredMatches.length} meczów</p>
                </div>
                <button
                    onClick={() => {
                        setShowAddForm((p) => !p);
                        cancelEdit();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-95 transition-all"
                >
                    <Plus size={15} />
                    Dodaj mecz
                </button>
            </div>

            {/* Formularz dodawania */}
            {showAddForm && (
                <MatchForm
                    form={newMatch}
                    onChange={setNewMatch}
                    onSave={addMatch}
                    onCancel={() => setShowAddForm(false)}
                    saveLabel="Dodaj mecz"
                />
            )}

            {/* Filtr ligowy */}
            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit mb-6">
                {(["PGE Ekstraliga", "2 Ekstraliga"] as const).map((l) => (
                    <button
                        key={l}
                        onClick={() => setFilterLeague(l)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            filterLeague === l
                                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {/* Lista meczów */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                {sortedMatches.length === 0 && <p className="text-center text-zinc-400 dark:text-zinc-500 text-sm py-10">Brak meczów</p>}
                {sortedMatches.map((match, index) => {
                    const isEditing = editingId === match.id;
                    const isLast = index === sortedMatches.length - 1;
                    const matchDate = new Date(match.date);

                    return (
                        <div key={match.id}>
                            {/* Wiersz meczu */}
                            {!isEditing && (
                                <div
                                    className={`flex items-center gap-4 px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${
                                        !isLast ? "border-b border-zinc-100 dark:border-zinc-800" : ""
                                    }`}
                                >
                                    {/* Runda – pierwsza kolumna */}
                                    <div className="w-14 shrink-0 text-center">
                                        <span className="text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
                                            R{match.round}
                                        </span>
                                    </div>

                                    {/* Data */}
                                    <div className="w-20 shrink-0 text-center">
                                        <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                                            {matchDate.toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                                        </p>
                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                            {matchDate.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>

                                    {/* Mecz */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                                            {match.homeTeam.name} vs {match.awayTeam.name}
                                        </p>
                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{match.league}</p>
                                    </div>

                                    {/* Wynik lub status */}
                                    <div className="w-24 text-center shrink-0">
                                        {match.isFinished ? (
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Trophy size={11} className="text-yellow-500" />
                                                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                                                    {match.homeScore}:{match.awayScore}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                                                Planowany
                                            </span>
                                        )}
                                    </div>

                                    {/* Akcje */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <button
                                            onClick={() => startEdit(match)}
                                            className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                            aria-label="Edytuj"
                                        >
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            onClick={() => deleteMatch(match.id)}
                                            className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-red-100 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors"
                                            aria-label="Usuń"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Formularz edycji inline */}
                            {isEditing && (
                                <div
                                    className={`p-5 bg-zinc-50 dark:bg-zinc-800/30 ${
                                        !isLast ? "border-b border-zinc-100 dark:border-zinc-800" : ""
                                    }`}
                                >
                                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">
                                        Edytujesz: {match.homeTeam.name} vs {match.awayTeam.name}
                                    </p>
                                    <MatchForm
                                        form={editForm}
                                        onChange={setEditForm}
                                        onSave={saveEdit}
                                        onCancel={cancelEdit}
                                        saveLabel="Zapisz zmiany"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AdminMatchesPage;
