const RulesPage = () => {
    return (
        <div className="max-w-2xl mx-auto pb-12">
            {/* Nagłówek */}
            <div className="mb-10">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Zasady typowania</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Jak działa typowanie meczów żużlowych i jak zdobywamy punkty.</p>
            </div>

            {/* Sekcja: Jak to działa */}
            <section className="mb-8">
                <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Jak to działa?</h2>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Przed każdym meczem PGE Ekstraligi i 2 Ekstraligi obstawiasz wynik spotkania — czyli ile punktów zdobędzie każda z
                        drużyn. W żużlu wynik meczu zawsze sumuje się do{" "}
                        <span className="font-semibold text-zinc-900 dark:text-white">90 punktów</span> (np. 50:40, 48:42).
                    </p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Typowanie jest możliwe wyłącznie{" "}
                        <span className="font-semibold text-zinc-900 dark:text-white">przed rozpoczęciem meczu</span>. Po starcie spotkania
                        żadne zmiany ani nowe typy nie są przyjmowane. Jeśli nie oddasz typu przed startem — mecz przepada.
                    </p>
                </div>
            </section>

            {/* Sekcja: Punktacja */}
            <section className="mb-8">
                <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Punktacja</h2>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                    {/* Zwycięzca / remis */}
                    <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">1. Trafienie zwycięzcy lub remisu</p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Prawidłowy zwycięzca</span>
                                <span className="text-sm font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
                                    +2 pkt
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Prawidłowy remis (45:45)</span>
                                <span className="text-sm font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
                                    +4 pkt
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Dokładność wyniku */}
                    <div className="px-6 py-5">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">2. Dokładność typowanego wyniku</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                            Liczona jako suma wartości bezwzględnych różnic dla obu drużyn:
                            <br />
                            <span className="font-mono text-zinc-700 dark:text-zinc-300">
                                |typ_gosp − wynik_gosp| + |typ_gość − wynik_gość|
                            </span>
                        </p>
                        <div className="space-y-2">
                            {[
                                { label: "Dokładny wynik", diff: "różnica = 0", points: "+10 pkt", highlight: true },
                                { label: "Bardzo blisko", diff: "różnica 1–2 pkt", points: "+6 pkt", highlight: false },
                                { label: "Blisko", diff: "różnica 3–4 pkt", points: "+4 pkt", highlight: false },
                                { label: "Niedaleko", diff: "różnica 5–6 pkt", points: "+2 pkt", highlight: false },
                                { label: "Daleko", diff: "różnica 7+ pkt", points: "+0 pkt", highlight: false },
                            ].map((row) => (
                                <div
                                    key={row.label}
                                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${
                                        row.highlight
                                            ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50"
                                            : "bg-zinc-50 dark:bg-zinc-800/50"
                                    }`}
                                >
                                    <div>
                                        <span className="text-sm font-medium text-zinc-900 dark:text-white">{row.label}</span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">({row.diff})</span>
                                    </div>
                                    <span
                                        className={`text-sm font-bold px-3 py-1 rounded-lg ${
                                            row.highlight
                                                ? "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40"
                                                : "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-700"
                                        }`}
                                    >
                                        {row.points}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja: Maksimum punktów */}
            <section className="mb-8">
                <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">
                    Maksymalna punktacja za mecz
                </h2>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Zwycięzca (lub remis) + dokładny wynik</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">
                            2 + 10 = <span className="text-green-600 dark:text-green-400">12 pkt</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Prawidłowy remis + dokładny wynik</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">
                            4 + 10 = <span className="text-green-600 dark:text-green-400">14 pkt</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* Sekcja: NITRO */}
            <section className="mb-8">
                <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">⚡ Tryb NITRO</h2>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-400/10 border border-yellow-200 dark:border-yellow-400/30 rounded-xl">
                        <span className="text-2xl">⚡</span>
                        <div>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                                NITRO podwaja wszystkie punkty za dany mecz
                            </p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Jeżeli aktywujesz NITRO na mecz i trafisz zwycięzcę oraz wynik, zamiast np. 12 pkt dostajesz{" "}
                                <span className="font-bold text-yellow-600 dark:text-yellow-400">24 pkt</span>.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { icon: "🎯", text: "Każdy gracz ma 1 NITRO na rundę w PGE Ekstralidze i 1 NITRO na rundę w 2 Ekstralidze." },
                            { icon: "⏱️", text: "NITRO możesz aktywować tylko przed rozpoczęciem meczu — razem z typowaniem wyniku." },
                            {
                                icon: "🔒",
                                text: "Po użyciu NITRO w danej rundzie i lidze — żaden inny mecz tej rundy i ligi nie może dostać NITRO.",
                            },
                            {
                                icon: "❌",
                                text: "Jeśli nie trafisz zwycięzcy ani wyniku, NITRO i tak zostaje zużyte — nie przechodzi na następną rundę.",
                            },
                        ].map((item) => (
                            <div key={item.icon} className="flex items-start gap-3">
                                <span className="text-base mt-0.5">{item.icon}</span>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sekcja: Przykład */}
            <section>
                <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">
                    Przykład obliczenia
                </h2>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Mecz: Częstochowa vs Wrocław</p>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 text-center">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Twój typ</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-white">50 – 40</p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 text-center">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Wynik meczu</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-white">48 – 42</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                            <span>Zwycięzca (Częstochowa ✓)</span>
                            <span className="font-semibold text-zinc-900 dark:text-white">+2 pkt</span>
                        </div>
                        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                            <span>Różnica: |50−48| + |40−42| = 2+2 = 4 → zakres 3–4</span>
                            <span className="font-semibold text-zinc-900 dark:text-white">+4 pkt</span>
                        </div>
                        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
                        <div className="flex justify-between font-bold">
                            <span className="text-zinc-900 dark:text-white">Łącznie</span>
                            <span className="text-green-600 dark:text-green-400">+6 pkt</span>
                        </div>
                        <div className="flex justify-between text-yellow-600 dark:text-yellow-400 font-bold">
                            <span>⚡ Z NITRO (×2)</span>
                            <span>+12 pkt</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RulesPage;
