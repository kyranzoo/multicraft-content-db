import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, Download, Sparkles } from "lucide-react";
import { Mod } from "../types";
import { motion } from "motion/react";

interface ModsViewProps {
  mods: Mod[];
  onNavigateToModDetail: (modId: string) => void;
}

export default function ModsView({ mods, onNavigateToModDetail }: ModsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Assets" },
    { id: "texture", label: "Texture Packs" },
    { id: "script", label: "Scripts" },
    { id: "world", label: "Worlds" },
    { id: "mobs", label: "Mobs" },
    { id: "tools", label: "Tools" },
    { id: "weather", label: "Weather" },
  ];

  // Case-insensitive filtering
  const filteredMods = useMemo(() => {
    return mods.filter((mod) => {
      const matchesSearch =
        mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || mod.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [mods, searchTerm, selectedCategory]);

  return (
    <div className="space-y-12 py-8" id="mods-directory-container">
      {/* Hero Title Container */}
      <section className="bg-[#201f1f]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl" id="mods-hero">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#c8f16d]/10 blur-3xl rounded-full" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#c8f16d]/5 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-3xl">
          <h2 className="font-display-lg text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Infinite Creation at Your Fingertips.
          </h2>
          <p className="font-body-lg text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
            Discover, download, and manage the most innovative mods and texture packs for your MultiCraft universe. From ultra-realistic lighting to whimsical block shapes, your next build starts here.
          </p>

          {/* Search & Filter Inputs */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="relative flex-grow group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c8f16d] transition-colors w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search mods, textures, or creators..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950 border-2 border-white/5 focus:border-[#c8f16d]/30 focus:ring-1 focus:ring-[#c8f16d]/30 transition-all outline-none text-sm text-white shadow-sm font-body-md"
                id="search-input"
              />
            </div>
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-6 py-4 bg-[#c8f16d] text-zinc-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#c8f16d]/10"
              id="clear-filters-btn"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <div className="flex flex-wrap gap-8 px-4 py-2 border-y border-white/5 bg-zinc-950/20 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-[#c8f16d] font-bold text-2xl">{mods.length + 1254}</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Mods</span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-8">
          <span className="text-[#c8f16d] font-bold text-2xl">24.5k</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Downloads Today</span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-8">
          <span className="text-[#c8f16d] font-bold text-2xl">99.8%</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verified Files</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth" id="category-filter-chips">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? "bg-[#c8f16d] text-zinc-950 border-[#c8f16d] shadow-lg shadow-[#c8f16d]/5"
                : "bg-[#201f1f]/50 text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
            }`}
            id={`filter-pill-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="space-y-6" id="directory-mods-grid-container">
        {filteredMods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMods.map((mod) => (
              <div
                key={mod.id}
                onClick={() => onNavigateToModDetail(mod.id)}
                className="flex flex-col bg-[#201f1f]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-[#c8f16d]/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01] shadow-lg cursor-pointer group"
                id={`mod-card-${mod.id}`}
              >
                {/* Screenshot view */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800 border-b border-white/5">
                  <img
                    alt={mod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={mod.screenshotUrl}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-zinc-950/80 backdrop-blur-md text-[#c8f16d] border border-white/5 rounded-full text-[10px] font-bold shadow-sm uppercase tracking-wider">
                      {mod.category === "texture" ? "Texture Pack" : mod.category}
                    </span>
                  </div>
                </div>

                {/* Mod details */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-headline-md text-lg text-white font-bold mb-1 group-hover:text-[#c8f16d] transition-colors line-clamp-1">
                    {mod.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 font-semibold">
                    By <span className="text-gray-300">{mod.author}</span>
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1 text-[#c8f16d]">
                      <Star className="w-4 h-4 fill-[#c8f16d] text-[#c8f16d]" />
                      <span className="font-bold text-sm">{mod.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Download className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {mod.downloads >= 1000 ? `${(mod.downloads / 1000).toFixed(1)}k` : mod.downloads}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#201f1f]/20 rounded-3xl border border-white/5 p-8" id="empty-state">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="font-headline-lg text-xl text-white font-bold mb-1">
              No mods found
            </h3>
            <p className="text-gray-400 max-w-md text-sm">
              Try adjusting your search terms, clearing keywords, or choosing a different category chip.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
