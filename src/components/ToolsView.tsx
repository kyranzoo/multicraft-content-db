import { useState, useMemo } from "react";
import { Search, Hammer, Sparkles, ExternalLink, Activity, Info, CheckCircle } from "lucide-react";
import { TOOLS } from "../data";
import { ToolItem } from "../types";
import { motion } from "motion/react";

export default function ToolsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Texture", "Data & Logic", "Sound", "Optimization"];

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-12 py-8" id="tools-panel-container">
      {/* Hero Header Section */}
      <section className="text-center max-w-2xl mx-auto space-y-4" id="tools-hero">
        <span className="bg-[#c8f16d]/20 text-[#c8f16d] px-4 py-1.5 rounded-full text-xs font-semibold inline-block border border-[#c8f16d]/20 tracking-wider uppercase">
          Developer Toolkit
        </span>
        <h2 className="font-display-lg text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
          Craft Beyond Limits
        </h2>
        <p className="font-body-lg text-gray-300 leading-relaxed text-base md:text-lg">
          Access a curated suite of specialized tools designed to streamline your MultiCraft modding workflow—from procedural texture generation to JSON schema validation.
        </p>
      </section>

      {/* Tool Search & Filter Pills */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full" id="tools-filter-controls">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a tool, compiler, or analyzer..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-[#201f1f] text-white shadow-sm focus:ring-2 focus:ring-[#c8f16d]/30 outline-none font-body-md text-sm"
            id="tool-search-input"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-[#c8f16d] text-zinc-950 border-[#c8f16d] shadow-lg shadow-[#c8f16d]/5"
                  : "bg-[#201f1f]/50 text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
              }`}
              id={`tool-filter-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Utility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="tools-bento-grid">
        {/* Large Feature Card: Procedural Texture Builder */}
        <div className="md:col-span-8 bg-[#201f1f]/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col justify-between">
          <div className="relative h-60 md:h-72 overflow-hidden bg-zinc-900 border-b border-white/5">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              alt="Procedural Texture Builder UI screenshot"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG10sw1PRED_au2bSJP2L1bVGKlf62YAH0GOhBnpDEYEOKeIhcr0P3o8FTeKsE2ZsGeVhNKze4GCdy3oqwSOp3vgb--UhLasbXdqMxKJZj9F_MM78taMqG53ik0WWS1-qAxj0UaQYnO9xbZPCrg2ygckQuzjQEx0AD_shdVNnb9rZA1mTgZlA0xkB_Db2Qp4ceKLPpyTnQLEDW46Nv1XXYuL9VL1Tq645gzLT-LoWSSrPq8Le48WvImQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-[#c8f16d] text-zinc-950 px-3 py-1 rounded-full text-[10px] font-bold mb-2 inline-block uppercase tracking-wider">
                Popular
              </span>
              <h3 className="font-headline-lg text-2xl md:text-3xl font-bold text-white">
                Procedural Texture Builder
              </h3>
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="font-body-md text-gray-300 max-w-md text-sm md:text-base leading-relaxed">
              Create high-resolution, game-ready textures using our intuitive node-based editor. Export directly to .PNG or .TGA formats.
            </p>
            <button
              onClick={() => alert("Launching node builder sandbox...")}
              className="bg-[#c8f16d] text-zinc-950 px-6 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-[#c8f16d]/10 whitespace-nowrap"
              id="launch-texture-builder"
            >
              Launch Tool
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Card: JSON Schema Validator */}
        <div className="md:col-span-4 bg-[#201f1f]/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-white/10 shadow-2xl">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-[#c8f16d]">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="font-headline-md text-xl font-bold text-white">
              JSON Schema Validator
            </h3>
            <p className="font-body-md text-gray-300 text-sm leading-relaxed">
              Validate your mod manifests and localization files against official sandbox schemas to prevent client loading crashes.
            </p>
          </div>
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
            <span className="text-xs text-gray-500 font-semibold uppercase">v2.4.0</span>
            <button
              onClick={() => alert("Opening manifest validator portal...")}
              className="text-[#c8f16d] font-bold text-sm hover:underline"
              id="launch-validator"
            >
              Open Online
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Other Filtered Tools */}
      {filteredTools.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="filtered-tools-grid">
          {filteredTools.map((tool) => {
            if (tool.id === "procedural-texture-builder" || tool.id === "json-schema-validator") {
              return null; // Skip main hero elements so they don't repeat
            }
            return (
              <div
                key={tool.id}
                className="bg-[#201f1f]/40 p-6 md:p-8 rounded-2xl flex flex-col justify-between border border-white/5 hover:border-[#c8f16d]/20 transition-all shadow-xl"
                id={`tool-card-${tool.id}`}
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-[#c8f16d]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-white leading-snug">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{tool.category}</p>
                  <p className="font-body-md text-gray-300 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Launching utility: ${tool.name}`)}
                  className="mt-6 w-full bg-zinc-800 text-white hover:bg-[#c8f16d] hover:text-zinc-950 px-4 py-2.5 rounded-xl font-bold text-xs text-center transition-all"
                  id={`launch-btn-${tool.id}`}
                >
                  {tool.launchText}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tool Progress / Activity Showcase */}
      <section className="py-6" id="processing-dashboard">
        <h3 className="font-headline-lg text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#c8f16d]" />
          Current Processing
        </h3>
        <div className="bg-[#201f1f]/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white font-label-md">
                Optimizing Texture Pack: "Neon_Obsidian_HD"
              </span>
              <span className="font-bold text-[#c8f16d] font-label-md">84%</span>
            </div>
            {/* Custom progress bar */}
            <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden border border-white/5 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#c8f16d] to-emerald-500 rounded-full relative"
                style={{ width: "84%" }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#c8f16d]/10 rounded-2xl border border-[#c8f16d]/20 text-gray-300">
            <Info className="w-5 h-5 text-[#c8f16d] shrink-0" />
            <p className="font-body-md text-sm leading-relaxed">
              Batch asset optimization reduces compiled zip file sizes by an average of 40% without losing visual voxel resolution.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
