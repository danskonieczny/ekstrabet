import { useState } from "react";
import { mockUsers } from "../../data/users";
import type { User } from "../../types";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";

// TODO: zastąpić → GET /api/admin/users
const AdminUsersPage = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<User>>({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({ username: "", role: "user" as User["role"] });

    const startEdit = (user: User) => {
        setEditingId(user.id);
        setEditForm({ username: user.username, role: user.role });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = (id: string) => {
        // TODO: zastąpić → PATCH /api/admin/users/:id
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...editForm } : u)));
        cancelEdit();
    };

    const deleteUser = (id: string) => {
        // TODO: zastąpić → DELETE /api/admin/users/:id
        if (!confirm("Na pewno usunąć tego użytkownika?")) return;
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const addUser = () => {
        if (!newUser.username.trim()) return;
        // TODO: zastąpić → POST /api/admin/users
        const created: User = {
            id: crypto.randomUUID(),
            username: newUser.username.trim(),
            role: newUser.role,
            totalPoints: 0,
        };
        setUsers((prev) => [...prev, created]);
        setNewUser({ username: "", role: "user" });
        setShowAddForm(false);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">Użytkownicy</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {users.length} {users.length === 1 ? "użytkownik" : "użytkowników"}
                    </p>
                </div>
                <button
                    onClick={() => setShowAddForm((prev) => !prev)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-95 transition-all"
                >
                    <Plus size={15} />
                    Dodaj użytkownika
                </button>
            </div>

            {/* Formularz dodawania */}
            {showAddForm && (
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-6">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Nowy użytkownik</h2>
                    <div className="flex gap-3 flex-wrap">
                        <input
                            type="text"
                            placeholder="Login"
                            value={newUser.username}
                            onChange={(e) => setNewUser((prev) => ({ ...prev, username: e.target.value }))}
                            className="flex-1 min-w-[160px] px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        />
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value as User["role"] }))}
                            className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                        >
                            <option value="user">Użytkownik</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            onClick={addUser}
                            disabled={!newUser.username.trim()}
                            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-40 transition-all"
                        >
                            Zapisz
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Anuluj
                        </button>
                    </div>
                </div>
            )}

            {/* Tabela użytkowników */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                {/* Nagłówek */}
                <div className="grid grid-cols-[2rem_1fr_6rem_6rem_6rem] gap-4 px-5 py-3 border-b border-zinc-100 dark:border-zinc-800">
                    {["#", "Login", "Rola", "Punkty", ""].map((h) => (
                        <span key={h} className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            {h}
                        </span>
                    ))}
                </div>

                {/* Wiersze */}
                {users.map((user, index) => {
                    const isEditing = editingId === user.id;
                    const isLast = index === users.length - 1;

                    return (
                        <div
                            key={user.id}
                            className={`grid grid-cols-[2rem_1fr_6rem_6rem_6rem] gap-4 items-center px-5 py-3.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40 ${
                                !isLast ? "border-b border-zinc-100 dark:border-zinc-800" : ""
                            }`}
                        >
                            {/* Pozycja */}
                            <span className="text-sm text-zinc-400 dark:text-zinc-500">{index + 1}</span>

                            {/* Login */}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editForm.username ?? ""}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, username: e.target.value }))}
                                    className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                                    autoFocus
                                />
                            ) : (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-900 dark:text-white shrink-0">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{user.username}</span>
                                </div>
                            )}

                            {/* Rola */}
                            {isEditing ? (
                                <select
                                    value={editForm.role ?? "user"}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value as User["role"] }))}
                                    className="px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white text-sm focus:outline-none"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            ) : (
                                <span
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${
                                        user.role === "admin"
                                            ? "bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                                    }`}
                                >
                                    {user.role === "admin" ? "Admin" : "User"}
                                </span>
                            )}

                            {/* Punkty */}
                            <span className="text-sm font-semibold text-zinc-900 dark:text-white">{user.totalPoints}</span>

                            {/* Akcje */}
                            <div className="flex items-center gap-1.5 justify-end">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => saveEdit(user.id)}
                                            className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                                            aria-label="Zapisz"
                                        >
                                            <Check size={13} />
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                            aria-label="Anuluj"
                                        >
                                            <X size={13} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => startEdit(user)}
                                            className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                            aria-label="Edytuj"
                                        >
                                            <Pencil size={13} />
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-red-100 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors"
                                            aria-label="Usuń"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AdminUsersPage;
