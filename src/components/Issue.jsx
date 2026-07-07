"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
    BookOpen,
    Archive,
    ChevronRight,
    ChevronLeft,
    Calendar,
    Eye,
    FileText,
    Loader2,
    Search,
    Filter,
    X,
    Tag,
    Layers,
    BookMarked,
    SlidersHorizontal,
    TrendingUp,
    Clock,
    Star,
    Grid,
    List,
    ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {
    useGetPublishedArticlesQuery,
    useGetPublishedYearsQuery,
} from "@/store/apiSlice";

// ─── Constants ────────────────────────────────────────────────────────────────

const MANUSCRIPT_TYPES = [
    "All Types",
    "Review Article",
    "Mini Review",
    "Systematic Review",
    "Research Article",
    "Short Communication",
    "Case Report",
    "Editorial",
];

const SORT_OPTIONS = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "most-viewed", label: "Most viewed" },
];


// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

// Papers from the ad-hoc aggregation pipeline have a nested `issue` object
// embedded directly on the paper (from $lookup + $unwind). React cannot render
// plain objects as children, so we strip / flatten that field out here.
const sanitizePaper = (paper) => {
    if (!paper) return paper;
    const { issue: _embeddedIssue, ...rest } = paper;
    return rest;
};

const sortArticles = (articles, sortBy) => {
    if (!articles) return [];
    const arr = [...articles];
    if (sortBy === "oldest") return arr.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    if (sortBy === "most-viewed") return arr.sort((a, b) => (b.views || 0) - (a.views || 0));
    return arr.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

const filterArticles = (articles, search, typeFilter) => {
    if (!articles) return [];
    return articles.filter((a) => {
        const matchSearch =
            !search ||
            a.title?.toLowerCase().includes(search.toLowerCase()) ||
            a.authors?.some((au) => au.name?.toLowerCase().includes(search.toLowerCase())) ||
            a.keywords?.some((k) => k?.toLowerCase().includes(search.toLowerCase())) ||
            a.discipline?.toLowerCase().includes(search.toLowerCase());
        const matchType = !typeFilter || typeFilter === "All Types" || a.manuscriptType === typeFilter;
        return matchSearch && matchType;
    });
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const Issue = () => {
    const [activeTab, setActiveTab] = useState("current");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [sortBy, setSortBy] = useState("newest");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedAdHocIssue, setSelectedAdHocIssue] = useState(null);
    const limit = 9;
    const currentYear = new Date().getFullYear();
    const debounceRef = useRef(null);

    // Debounce search
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setDebouncedSearch(search), 350);
        return () => clearTimeout(debounceRef.current);
    }, [search]);

    const queryYear = activeTab === "current" ? currentYear : activeTab === "archive" ? selectedYear : undefined;
    const queryType = activeTab === "current" ? undefined : undefined;

    const { data, isLoading, isFetching } = useGetPublishedArticlesQuery({
        year: queryYear,
        page,
        limit,
    });

    const { data: homepageData } = useGetPublishedArticlesQuery({ type: "homepage" });
    const { data: yearsData } = useGetPublishedYearsQuery();

    const availableYears = yearsData?.years || [];
    const rawArticles = data?.articles || [];
    const totalPages = data?.totalPages || 1;

    const totalVolumes = availableYears.length;

    const totalPublished = data?.total || 0;

    const totalDisciplines = new Set(
        (homepageData?.data?.currentIssue || []).map(
            (article) => article.discipline
        )
    ).size;

    const stats = {
        volumes: totalVolumes,
        published: totalPublished,
        disciplines: totalDisciplines,
    };

    // Ad-hoc data from homepage endpoint
    const adHocIssues = homepageData?.data?.adHocIssues || [];

    // Derive current-issue articles from homepage (current month's issue)
    const currentIssueArticles = homepageData?.data?.currentIssue || [];

    const hasCurrentIssue = currentIssueArticles.length > 0;
    const hasSpecialIssues = adHocIssues.length > 0;


    const tabs = useMemo(
        () => [
            ...(hasCurrentIssue
                ? [{ id: "current", label: "Current Issue", icon: Clock }]
                : []),

            { id: "archive", label: "Archive", icon: Archive },

            ...(hasSpecialIssues
                ? [{ id: "adhoc", label: "Special Issues", icon: Star }]
                : []),
        ],
        [hasCurrentIssue, hasSpecialIssues]
    );

    // Compute display articles — sanitize ad-hoc papers to strip the embedded
    // `issue` object that the aggregation pipeline injects onto each paper
    const baseArticles =
        activeTab === "current"
            ? currentIssueArticles
            : activeTab === "adhoc"
                ? selectedAdHocIssue
                    ? (adHocIssues.find((g) => g._id?.toString() === selectedAdHocIssue)?.papers || []).map(sanitizePaper)
                    : adHocIssues.flatMap((g) => (g.papers || []).map(sanitizePaper))
                : rawArticles;

    const filtered = filterArticles(baseArticles, debouncedSearch, typeFilter);
    const sorted = sortArticles(filtered, sortBy);

    // For archive tab we still use server-paginated results; for current/adhoc we handle client-side
    const displayArticles = activeTab === "archive" ? sorted : sorted;
    const clientTotalPages = activeTab === "archive" ? totalPages : Math.ceil(sorted.length / limit);
    const clientPage = activeTab === "archive" ? page : 1; // for archive, use server page; others show all

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1);
        setSearch("");
        setTypeFilter("All Types");
        setSortBy("newest");
        setSelectedAdHocIssue(null);
    };


    useEffect(() => {
        if (!tabs.find((tab) => tab.id === activeTab)) {
            setActiveTab("archive");
        }
    }, [tabs, activeTab]);

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin" />
                    <BookOpen className="absolute inset-0 m-auto text-green-600" size={20} />
                </div>
                <p className="mt-6 text-gray-400 font-medium tracking-wide text-sm animate-pulse">
                    Loading journal repository…
                </p>
            </div>
        );
    }

    return (
        <div id="issue" className="bg-[#FAFAF8] min-h-screen scroll-mt-24">
            {/* ── Page Header ── */}
            <PageHeader stats={stats} />

            {/* ── Tab Navigation ── */}
            <TabBar
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {/* ── Toolbar: search + filters ── */}
            <Toolbar
                search={search}
                onSearch={setSearch}
                typeFilter={typeFilter}
                onTypeFilter={(v) => { setTypeFilter(v); setPage(1); }}
                sortBy={sortBy}
                onSortBy={setSortBy}
                viewMode={viewMode}
                onViewMode={setViewMode}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters((p) => !p)}
                resultCount={filtered.length}
            />

            {/* ── Main content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                {activeTab === "current" && (
                    <CurrentIssueView
                        articles={displayArticles}
                        search={debouncedSearch}
                        typeFilter={typeFilter}
                        sortBy={sortBy}
                        viewMode={viewMode}
                        isFetching={false}
                    />
                )}

                {activeTab === "archive" && (
                    <ArchiveView
                        articles={displayArticles}
                        years={availableYears}
                        selectedYear={selectedYear}
                        onYearSelect={(y) => { setSelectedYear(y); setPage(1); }}
                        page={page}
                        totalPages={clientTotalPages}
                        onPageChange={setPage}
                        viewMode={viewMode}
                        isFetching={isFetching}
                    />
                )}

                {activeTab === "adhoc" && (
                    <AdHocView
                        groups={adHocIssues}
                        articles={displayArticles}
                        selected={selectedAdHocIssue}
                        onSelect={setSelectedAdHocIssue}
                        viewMode={viewMode}
                    />
                )}
            </div>
        </div>
    );
};

// ─── Page Header ──────────────────────────────────────────────────────────────

const PageHeader = ({ stats }) => (
    <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                        <BookOpen size={13} />
                        Open Access Research
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#3B2A10] tracking-tight leading-tight">
                        Journal Archive<br />
                        <span className="text-green-600">&amp; Issues</span>
                    </h1>
                    <p className="mt-4 text-gray-500 text-base max-w-2xl leading-relaxed mx-auto">
                        Explore peer-reviewed research from our global community of scholars. Browse current issues, historical archives, and special collections.
                    </p>
                </div>
   
            </div>
        </div>
    </div>
);

// ─── Tab Bar ──────────────────────────────────────────────────────────────────

const TabBar = ({ tabs, activeTab, onTabChange }) => (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_0_0_#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-0">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => onTabChange(id)}
                        className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-all duration-200 border-b-2 ${activeTab === id
                            ? "border-green-600 text-green-700"
                            : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200"
                            }`}
                    >
                        <Icon size={15} />
                        {label}
                        {activeTab === id && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

// ─── Toolbar ──────────────────────────────────────────────────────────────────

const Toolbar = ({
    search, onSearch,
    typeFilter, onTypeFilter,
    sortBy, onSortBy,
    viewMode, onViewMode,
    showFilters, onToggleFilters,
    resultCount,
}) => {
    const [typeOpen, setTypeOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const typeRef = useRef(null);
    const sortRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (typeRef.current && !typeRef.current.contains(e.target)) setTypeOpen(false);
            if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Search by title, author, keyword…"
                        className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition"
                    />
                    {search && (
                        <button
                            onClick={() => onSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Type filter */}
                <div ref={typeRef} className="relative">
                    <button
                        onClick={() => setTypeOpen((p) => !p)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition ${typeFilter !== "All Types"
                            ? "bg-green-50 border-green-300 text-green-700"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                    >
                        <Tag size={14} />
                        {typeFilter === "All Types" ? "All types" : typeFilter}
                        <ChevronDown size={13} className={`transition-transform ${typeOpen ? "rotate-180" : ""}`} />
                    </button>
                    {typeOpen && (
                        <div className="absolute top-full mt-1 left-0 z-50 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[200px]">
                            {MANUSCRIPT_TYPES.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { onTypeFilter(t); setTypeOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm transition hover:bg-gray-50 ${typeFilter === t ? "text-green-600 font-semibold bg-green-50/50" : "text-gray-700"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sort */}
                <div ref={sortRef} className="relative">
                    <button
                        onClick={() => setSortOpen((p) => !p)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-gray-300 transition"
                    >
                        <SlidersHorizontal size={14} />
                        {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                        <ChevronDown size={13} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                    </button>
                    {sortOpen && (
                        <div className="absolute top-full mt-1 right-0 z-50 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[170px]">
                            {SORT_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => { onSortBy(opt.value); setSortOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm transition hover:bg-gray-50 ${sortBy === opt.value ? "text-green-600 font-semibold" : "text-gray-700"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 ml-auto">
                    {[
                        { mode: "grid", icon: Grid },
                        { mode: "list", icon: List },
                    ].map(({ mode, icon: Icon }) => (
                        <button
                            key={mode}
                            onClick={() => onViewMode(mode)}
                            className={`p-1.5 rounded-lg transition ${viewMode === mode ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <Icon size={16} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Active filter chips */}
            {(search || typeFilter !== "All Types") && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-xs text-gray-400 font-medium">{resultCount} result{resultCount !== 1 ? "s" : ""}:</span>
                    {search && (
                        <FilterChip label={`"${search}"`} onRemove={() => onSearch("")} />
                    )}
                    {typeFilter !== "All Types" && (
                        <FilterChip label={typeFilter} onRemove={() => onTypeFilter("All Types")} />
                    )}
                </div>
            )}
        </div>
    );
};

const FilterChip = ({ label, onRemove }) => (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
        {label}
        <button onClick={onRemove} className="hover:text-green-900 transition">
            <X size={11} />
        </button>
    </span>
);

// ─── Current Issue View ───────────────────────────────────────────────────────

const CurrentIssueView = ({ articles, search, typeFilter, sortBy, viewMode }) => {
    const now = new Date();
    const monthName = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();

    // Current volume/issue label
    const month = now.getMonth() + 1;
    let issueLabel = "";
    if (month >= 4 && month <= 6) issueLabel = "Issue 1 (Apr–Jun)";
    else if (month >= 7 && month <= 9) issueLabel = "Issue 2 (Jul–Sep)";
    else issueLabel = "Issue 3 (Oct–Dec)";

    const filtered = filterArticles(articles, search, typeFilter);
    const sorted = sortArticles(filtered, sortBy);

    return (
        <div className="pt-2">
            {/* Issue Banner */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-100">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Live Issue</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                        Volume 1 · {issueLabel}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">{monthName} {year}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400">
                    <FileText size={14} />
                    <span className="font-medium">{sorted.length} paper{sorted.length !== 1 ? "s" : ""}</span>
                </div>
            </div>

            <ArticleGrid articles={sorted} viewMode={viewMode} emptyMsg="No articles in the current issue yet." />
        </div>
    );
};

// ─── Archive View ─────────────────────────────────────────────────────────────

const ArchiveView = ({ articles, years, selectedYear, onYearSelect, page, totalPages, onPageChange, viewMode, isFetching }) => (
    <div className="grid lg:grid-cols-12 gap-8 pt-2">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                <h3 className="text-xs uppercase tracking-widest font-black text-gray-400 mb-4 flex items-center gap-2">
                    <Calendar size={13} /> Browse by year
                </h3>
                <div className="space-y-1">
                    {years.length === 0 && (
                        <p className="text-sm text-gray-400 py-4 text-center">No archived years yet.</p>
                    )}
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => onYearSelect(year)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${selectedYear === year
                                ? "bg-green-600 text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <span>{year}</span>
                            {selectedYear === year && <ChevronRight size={15} />}
                        </button>
                    ))}
                </div>
            </div>
        </aside>

        {/* Articles */}
        <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-100">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Volume {selectedYear === 2026 ? 1 : selectedYear - 2025}</h2>
                    <p className="text-sm text-gray-400 mt-1">Archive · {selectedYear}</p>
                </div>
            </div>

            {isFetching ? (
                <ArticleGridSkeleton count={9} />
            ) : (
                <>
                    <ArticleGrid articles={articles} viewMode={viewMode} emptyMsg="No articles found for this year." />
                    {totalPages > 1 && (
                        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
                    )}
                </>
            )}
        </div>
    </div>
);

// ─── Ad-Hoc (Special Issues) View ────────────────────────────────────────────

const AdHocView = ({ groups, articles, selected, onSelect, viewMode }) => {
    if (groups.length === 0) {
        return (
            <EmptyState
                icon={Star}
                title="No special issues yet"
                subtitle="Special and ad-hoc issues will appear here once published."
            />
        );
    }

    return (
        <div className="pt-2">
            {/* Special Issue Selector */}
            <div className="mb-8">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Special Collections</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => onSelect(null)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${!selected
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                            }`}
                    >
                        <Layers size={14} />
                        All special issues
                    </button>
                    {groups.map((g) => (
                        <button
                            key={g._id}
                            onClick={() => onSelect(g._id?.toString())}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${selected === g._id?.toString()
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700"
                                }`}
                        >
                            <Star size={13} />
                            {g.issue?.label || `Special Issue`}
                            <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${selected === g._id?.toString() ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                }`}>
                                {g.papers?.length || 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* If one issue selected, show its details */}
            {selected ? (
                (() => {
                    const group = groups.find((g) => g._id?.toString() === selected);
                    const papers = (group?.papers || []).map(sanitizePaper);
                    return (
                        <>
                            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                                <div className="p-2.5 bg-green-50 rounded-xl">
                                    <Star size={18} className="text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-900">{group?.issue?.label}</h2>
                                    <p className="text-sm text-gray-400">
                                        Vol {group?.issue?.volume} · {papers.length} paper{papers.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                            <ArticleGrid articles={papers} viewMode={viewMode} emptyMsg="No papers in this special issue." />
                        </>
                    );
                })()
            ) : (
                /* All issues stacked as library sections */
                <div className="space-y-12">
                    {groups.map((g) => (
                        <IssueSection key={g._id} group={g} onViewAll={() => onSelect(g._id?.toString())} viewMode={viewMode} />
                    ))}
                </div>
            )}
        </div>
    );
};

const IssueSection = ({ group, onViewAll, viewMode }) => {
    const papers = (group.papers || []).slice(0, 3).map(sanitizePaper);
    return (
        <div>
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-green-500 rounded-full" />
                    <div>
                        <h3 className="text-lg font-extrabold text-gray-900">{group.issue?.label}</h3>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">
                            Volume {group.issue?.volume} · {group.papers?.length || 0} papers
                        </p>
                    </div>
                </div>
                {group.papers?.length > 3 && (
                    <button
                        onClick={onViewAll}
                        className="flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700 transition"
                    >
                        View all <ChevronRight size={14} />
                    </button>
                )}
            </div>
            <ArticleGrid articles={papers} viewMode={viewMode} emptyMsg="No papers yet." />
        </div>
    );
};

// ─── Article Grid ─────────────────────────────────────────────────────────────

const ArticleGrid = ({ articles, viewMode, emptyMsg }) => {
    if (!articles || articles.length === 0) {
        return <EmptyState icon={Archive} title={emptyMsg} subtitle="Try adjusting your filters or search terms." />;
    }

    if (viewMode === "list") {
        return (
            <div className="space-y-3">
                {articles.map((article) => (
                    <ArticleListRow key={article._id} article={article} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
            ))}
        </div>
    );
};

const ArticleGridSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 opacity-60 pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="aspect-[16/10] bg-gray-100" />
                <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-5 bg-gray-100 rounded w-full" />
                    <div className="h-5 bg-gray-100 rounded w-4/5" />
                    <div className="h-3 bg-gray-100 rounded w-1/2 mt-4" />
                </div>
            </div>
        ))}
    </div>
);

// ─── Article Card (Grid) ──────────────────────────────────────────────────────

const ArticleCard = ({ article }) => {
    const disciplineColors = {
        default: "bg-green-100 text-green-800",
    };

    return (
        <Link
            href={`/articles/${article._id}`}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-full hover:border-green-200 hover:shadow-[0_8px_30px_-4px_rgba(34,197,94,0.15)] transition-all duration-300"
        >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-50 flex-shrink-0">
                <img
                    src={article?.files?.manuscriptImage || "https://placehold.co/600x338/F3F4F6/9CA3AF?text=MPA+Research"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Discipline badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-green-600/95 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        {article.discipline || "Research"}
                    </span>
                </div>
                {/* Issue badge */}
                {article.volume && (
                    <div className="absolute bottom-3 right-3">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                            Vol {article.volume}.{article.issue}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Type + Date */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                        {article.manuscriptType}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                        {article.publishedAt ? formatDate(article.publishedAt) : "—"}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-extrabold text-gray-900 leading-snug group-hover:text-green-700 transition-colors line-clamp-2 mb-2">
                    {article.title}
                </h3>

                {/* Authors */}
                <p className="text-[13px] text-gray-500 font-medium line-clamp-1 mb-auto">
                    {article.authors?.map((a) => a.name).join(", ") || "Anonymous"}
                </p>

                {/* Keywords */}
                {article.keywords?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 mb-3">
                        {article.keywords.slice(0, 2).map((k, i) => (
                            <span key={i} className="text-[10px] bg-gray-50 text-gray-500 border border-gray-100 px-2 py-0.5 rounded-full">
                                {k.trim()}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-3 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-400">
                            <Eye size={13} />
                            <span className="text-xs font-semibold">{(article.views || 0).toLocaleString()}</span>
                        </div>
                        {article.paperNumber && (
                            <div className="flex items-center gap-1 text-gray-400">
                                <FileText size={12} />
                                <span className="text-[10px] font-bold">{article.paperNumber}</span>
                            </div>
                        )}
                    </div>
                    <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-green-600 flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-200">
                        <ChevronRight size={14} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

// ─── Article List Row ─────────────────────────────────────────────────────────

const ArticleListRow = ({ article }) => (
    <Link
        href={`/articles/${article._id}`}
        className="group flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-[0_4px_20px_-4px_rgba(34,197,94,0.12)] transition-all duration-200"
    >
        {/* Thumbnail */}
        <div className="w-20 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
            <img
                src={article?.files?.manuscriptImage || "https://placehold.co/160x128/F3F4F6/9CA3AF?text=MPA"}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="lazy"
            />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                    {article.manuscriptType}
                </span>
                <span className="text-[11px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-md">
                    {article.discipline}
                </span>
            </div>
            <h3 className="text-[14px] font-extrabold text-gray-900 leading-snug group-hover:text-green-700 transition-colors line-clamp-1 mb-1">
                {article.title}
            </h3>
            <p className="text-[12px] text-gray-400 font-medium line-clamp-1">
                {article.authors?.map((a) => a.name).join(", ") || "Anonymous"} ·{" "}
                {article.publishedAt ? formatDate(article.publishedAt) : ""}
            </p>
        </div>

        {/* Right meta */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-gray-400">
                <Eye size={12} />
                <span className="text-xs font-semibold">{(article.views || 0).toLocaleString()}</span>
            </div>
            {article.volume && (
                <span className="text-[10px] font-bold text-gray-400">
                    Vol {article.volume}.{article.issue}
                </span>
            )}
            <span className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-green-600 flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-200 mt-auto">
                <ChevronRight size={13} />
            </span>
        </div>
    </Link>
);

// ─── Pagination ───────────────────────────────────────────────────────────────

const Pagination = ({ page, totalPages, onPageChange }) => {
    const pages = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (page > 3) pages.push("...");
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
        if (page < totalPages - 2) pages.push("...");
        pages.push(totalPages);
    }

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                disabled={page === 1}
                onClick={() => onPageChange((p) => p - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 disabled:opacity-30 hover:bg-gray-50 hover:text-green-600 transition"
            >
                <ChevronLeft size={15} /> Prev
            </button>
            <div className="flex gap-1">
                {pages.map((p, i) =>
                    p === "..." ? (
                        <span key={i} className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === p
                                ? "bg-green-600 text-white shadow-sm"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>
            <button
                disabled={page === totalPages}
                onClick={() => onPageChange((p) => p + 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 disabled:opacity-30 hover:bg-gray-50 hover:text-green-600 transition"
            >
                Next <ChevronRight size={15} />
            </button>
        </div>
    );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ icon: Icon = Archive, title, subtitle }) => (
    <div className="py-20 text-center">
        <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon size={28} className="text-gray-300" />
        </div>
        <h3 className="text-base font-bold text-gray-400">{title}</h3>
        {subtitle && <p className="text-sm text-gray-300 mt-1">{subtitle}</p>}
    </div>
);

export default Issue;