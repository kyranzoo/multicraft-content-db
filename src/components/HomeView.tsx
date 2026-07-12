import { Globe, Video, UserPlus, ChevronLeft, ChevronRight, ArrowRight, Star, Download, Bolt, Palette } from "lucide-react";
import { Mod } from "../types";
import { TEAM_MEMBERS } from "../data";
import { motion } from "motion/react";

interface HomeViewProps {
  mods: Mod[];
  onNavigateToMods: () => void;
  onNavigateToModDetail: (modId: string) => void;
}

export default function HomeView({ mods, onNavigateToMods, onNavigateToModDetail }: HomeViewProps) {
  // Get featured/trending mods (pin or first 4)
  const featuredMods = mods.filter(m => m.isFeatured).slice(0, 4);
  const displayMods = featuredMods.length > 0 ? featuredMods : mods.slice(0, 4);

  return (
    <div className="space-y-16 py-8" id="home-view-container">
      {/* Hero Section: Kyranzo Profile Card */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-4"
        id="hero-profile-section"
      >
        <div className="bg-[#201f1f]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 flex flex-col md:flex-row gap-8 items-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#c8f16d]/5 blur-3xl rounded-full" />
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#c8f16d]/5 blur-3xl rounded-full" />

          {/* Avatar Area */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#c8f16d] to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-zinc-700 overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt="Kyranzo portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmuijTmPSZf2n_ibWrtjZpty0596tSUvegMvVdkS6MJ8DxZvnMxODgFp_Bs82fpqceY06nelLuxAk6IzO5_NYOVHVPczDOCrPqjvjxhpkHwmSyKZ4dzTk33w5mgdS3BAOiXA1LwC3DS6N5Ikni3z_wJ62usGr28tcg1N63R0YqcekqzoWlPfavjK_a55KAmV4aGXQrB5Y-va9QasO0xXkE3D5IRpbO5Eo2L5vbwa8XkEUXVQmrP-BuLw"
              />
            </div>
          </div>

          {/* Description text area */}
          <div className="flex-1 space-y-4 text-center md:text-left z-10">
            <div className="inline-flex px-4 py-1 rounded-full bg-[#c8f16d]/20 text-[#c8f16d] text-xs font-semibold uppercase tracking-wider border border-[#c8f16d]/20">
              Master Modder
            </div>
            <h1 className="font-display-lg text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
              Kyranzo
            </h1>
            <p className="font-body-lg text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
              Architect of digital worlds and lead developer at MultiCraft. I specialize in high-performance shaders, complex script injections, and expansive texture overhauls that bridge the gap between imagination and gameplay.
            </p>

            {/* Social handles */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <a 
                href="#" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 text-[#c8f16d] hover:bg-[#c8f16d] hover:text-zinc-950 transition-all transform hover:scale-105 active:scale-95"
                title="Website"
                id="social-web"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 text-[#c8f16d] hover:bg-[#c8f16d] hover:text-zinc-950 transition-all transform hover:scale-105 active:scale-95"
                title="YouTube / Stream"
                id="social-video"
              >
                <Video className="w-5 h-5" />
              </a>
              <button 
                className="bg-[#c8f16d] text-zinc-950 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c8f16d]/10"
                onClick={() => alert("Following Kyranzo!")}
                id="follow-btn"
              >
                <UserPlus className="w-4 h-4" />
                Follow Kyranzo
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Media & Text Showcase Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        id="updates-showcase-section"
      >
        <div className="order-2 lg:order-1 space-y-6">
          <h2 className="font-headline-lg text-3xl font-bold text-[#c8f16d]">
            MultiCraft v4.2 Update
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#c8f16d]/10 flex items-center justify-center shrink-0 border border-[#c8f16d]/20 text-[#c8f16d]">
                <Bolt className="w-5 h-5" />
              </div>
              <p className="font-body-md text-gray-300 leading-relaxed">
                <strong className="text-white block text-lg">Lightning Fast</strong>
                Optimized script core reduces load times by 40% across all compatible mobile, tablet, and desktop platforms.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#c8f16d]/10 flex items-center justify-center shrink-0 border border-[#c8f16d]/20 text-[#c8f16d]">
                <Palette className="w-5 h-5" />
              </div>
              <p className="font-body-md text-gray-300 leading-relaxed">
                <strong className="text-white block text-lg">Extended Palette</strong>
                Over 500+ new high-fidelity textures added to the base library for creative sandbox builders.
              </p>
            </div>
          </div>
          <button 
            className="border-2 border-[#c8f16d] text-[#c8f16d] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#c8f16d]/10 transition-all active:scale-95"
            onClick={() => alert("Release notes are available in the game manifest!")}
            id="release-notes-btn"
          >
            Read Release Notes
          </button>
        </div>

        {/* Update Image Graphic */}
        <div className="order-1 lg:order-2 relative aspect-video rounded-3xl overflow-hidden bg-[#201f1f] border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group">
          <img 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            alt="MultiCraft Graphics showcase"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-mTd9ryhhY9UJJAlAN8Z7sX3mjmCMPEtG51pho71REyE-epe2yQpBrMmmmlOp9DvlP6NPcjf4gE52MxZZxG5LuGtrbPOjxufVHvsZCA4WG1AQmnUyFha05PF05nIXPbb1LcVlPKezFQy0ECsXlBO6YZZH-5OCdKRfZ2w_JTI-SQe27Z2XkSuj-VdJbV0pRXlKmjOhND3Oes6VfC6toMbJWjecfFpf98BCjQwkaDpd4QN1XABLxhlM1A"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#201f1f]/80 backdrop-blur-md border border-white/10 rounded-2xl flex justify-between items-center">
            <span className="font-label-md text-sm text-[#c8f16d] font-bold">New Shader Preview</span>
            <span className="text-[#c8f16d] text-xs font-semibold flex items-center gap-1 bg-[#c8f16d]/10 px-3 py-1 rounded-full">
              Live updates
            </span>
          </div>
        </div>
      </motion.section>

      {/* Featured Mods Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
        id="trending-mods-section"
      >
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-3xl font-bold text-white tracking-tight">
              Trending Mods
            </h2>
            <p className="text-gray-400 font-body-md">Hand-picked by our community curators</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={onNavigateToMods}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#c8f16d]/20 hover:text-[#c8f16d] transition-colors"
              id="slider-left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={onNavigateToMods}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#c8f16d]/20 hover:text-[#c8f16d] transition-colors"
              id="slider-right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mod Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayMods.map((mod) => (
            <div 
              key={mod.id}
              onClick={() => onNavigateToModDetail(mod.id)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#c8f16d]/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
              id={`featured-card-${mod.id}`}
            >
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" 
                alt={mod.name}
                src={mod.screenshotUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-4 space-y-1">
                <div className="px-2 py-0.5 rounded bg-[#c8f16d]/90 text-zinc-950 text-[10px] font-bold uppercase inline-block">
                  {mod.category === "texture" ? "Texture Pack" : mod.category}
                </div>
                <h3 className="font-label-md text-white text-base font-bold tracking-tight line-clamp-1">
                  {mod.name}
                </h3>
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#c8f16d] text-[#c8f16d]" />
                    <span className="text-[#c8f16d] font-bold">{mod.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>{mod.downloads >= 1000 ? `${(mod.downloads / 1000).toFixed(1)}k` : mod.downloads}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Container */}
        <div className="flex flex-col items-center py-10 bg-[#c8f16d]/5 rounded-3xl border border-[#c8f16d]/10 shadow-inner mt-8">
          <h3 className="font-headline-md text-xl md:text-2xl mb-4 text-center text-white font-bold">
            Ready to transform your world?
          </h3>
          <button 
            onClick={onNavigateToMods}
            className="bg-[#c8f16d] text-zinc-950 px-8 py-4 rounded-full font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            id="view-all-mods-cta"
          >
            View All Mods & Textures
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.section>
    </div>
  );
}
