import { useState } from "react";
import { ChevronRight, Download, Heart, Share2, Mail, CheckCircle, Calendar, ShieldCheck, HardDrive } from "lucide-react";
import { Mod } from "../types";
import { motion } from "motion/react";

interface ModDetailViewProps {
  mod: Mod;
  onNavigateToMods: () => void;
}

export default function ModDetailView({ mod, onNavigateToMods }: ModDetailViewProps) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDownload = () => {
    if (downloadComplete) return;

    setDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setDownloadComplete(true);
          
          // Actually trigger the file download in the browser!
          // Since the fileUrl is stored, we can trigger an anchor click:
          try {
            const link = document.createElement("a");
            link.href = mod.fileUrl;
            link.setAttribute("download", `${mod.id}.zip`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (err) {
            console.error("Failed to trigger native download:", err);
          }

          return 100;
        }
        return next;
      });
    }, 200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mod.name,
        text: mod.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Human-friendly date formatting
  const formattedDate = new Date(mod.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="py-8 space-y-8" id="mod-detail-view-container">
      {/* Breadcrumbs Navigation */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 font-label-md">
        <button 
          onClick={onNavigateToMods}
          className="hover:text-[#c8f16d] transition-colors"
          id="breadcrumb-mods"
        >
          Mods
        </button>
        <ChevronRight className="w-4 h-4 text-zinc-600" />
        <span className="text-[#c8f16d] font-bold">{mod.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left column: Image Showcase & Description */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h1 className="font-display-lg text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
              {mod.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className="bg-zinc-800 text-gray-300 border border-white/5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {mod.category === "texture" ? "Texture Pack" : mod.category}
              </span>
              <span className="bg-zinc-800 text-gray-300 border border-white/5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {mod.version}
              </span>
              <span className="bg-[#c8f16d]/10 text-[#c8f16d] border border-[#c8f16d]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Stable Verified
              </span>
            </div>
          </div>

          {/* Screenshot Card Container */}
          <div className="bg-[#201f1f]/70 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="aspect-video relative overflow-hidden bg-zinc-950">
              <img
                alt={mod.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                src={mod.screenshotUrl}
              />
            </div>
          </div>

          {/* Description details content */}
          <article className="bg-[#201f1f]/40 border border-white/5 p-6 md:p-8 rounded-3xl space-y-6 shadow-xl">
            <h3 className="font-headline-lg text-2xl text-[#c8f16d] font-bold border-b border-white/5 pb-4">
              About this mod
            </h3>
            <div className="font-body-lg text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
              {mod.description}
            </div>
          </article>
        </div>

        {/* Right column: Action panel & Metadata card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action container details card */}
          <div className="bg-[#201f1f]/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl sticky top-24 space-y-6">
            <div className="space-y-4 border-b border-white/5 pb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 font-label-md flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-gray-500" />
                  File Size
                </span>
                <span className="font-bold text-white font-label-md">{mod.fileSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 font-label-md flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-gray-500" />
                  Downloads
                </span>
                <span className="font-bold text-white font-label-md">
                  {mod.downloads.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 font-label-md flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Last Updated
                </span>
                <span className="font-bold text-white font-label-md">{formattedDate}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              {/* Main CTA Download button */}
              <button
                disabled={downloading}
                onClick={handleDownload}
                className={`w-full py-4 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group ${
                  downloadComplete
                    ? "bg-[#c8f16d]/20 text-[#c8f16d] border border-[#c8f16d]/30"
                    : "bg-[#c8f16d] text-zinc-950 hover:shadow-lg hover:shadow-[#c8f16d]/20 hover:scale-[1.03] active:scale-[0.97]"
                }`}
                id="main-download-btn"
              >
                {downloadComplete ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Downloaded!
                  </>
                ) : downloading ? (
                  `Downloading ${progress}%...`
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download .zip
                  </>
                )}
                
                {/* Visual shiny overlay on download hover */}
                {!downloading && !downloadComplete && (
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                )}
              </button>

              {/* Progress Bar Container */}
              {downloading && (
                <div className="space-y-2" id="download-progress-row">
                  <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-[#c8f16d] rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Favorites and Share row buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 border py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all text-xs font-bold ${
                    isFavorite
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      : "border-white/10 text-white hover:bg-white/5"
                  }`}
                  id="fav-btn"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500" : ""}`} />
                  {isFavorite ? "Favorited" : "Favorite"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 border border-white/10 text-white hover:bg-white/5 py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all text-xs font-bold"
                  id="share-btn"
                >
                  <Share2 className="w-4 h-4" />
                  Share Mod
                </button>
              </div>
            </div>
          </div>

          {/* Creator Details Card */}
          <div className="bg-[#201f1f]/40 p-5 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10">
              <div className="text-xl font-bold text-[#c8f16d] uppercase">
                {mod.author.slice(0, 2)}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Created by</p>
              <p className="font-bold text-sm text-white font-label-md leading-snug">{mod.author}</p>
            </div>
            <button 
              onClick={() => alert(`Connecting you to the mod author: ${mod.author}`)}
              className="ml-auto p-2.5 rounded-full hover:bg-[#c8f16d]/10 text-gray-400 hover:text-[#c8f16d] transition-all border border-white/5 hover:border-[#c8f16d]/20"
              id="message-creator-btn"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
