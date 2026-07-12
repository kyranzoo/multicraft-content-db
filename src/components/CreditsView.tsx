import { Mail, Globe, Heart, Quote, MessageSquare, Sparkles } from "lucide-react";
import { TEAM_MEMBERS, TECHNICAL_CONTRIBUTORS } from "../data";
import { motion } from "motion/react";

export default function CreditsView() {
  return (
    <div className="space-y-16 py-8" id="credits-page-container">
      {/* Intro Header Section */}
      <section className="text-center max-w-2xl mx-auto space-y-4" id="credits-hero">
        <span className="bg-[#c8f16d]/20 text-[#c8f16d] px-4 py-1.5 rounded-full text-xs font-semibold inline-block border border-[#c8f16d]/20 tracking-wider uppercase">
          Co-Creators & Owners
        </span>
        <h2 className="font-display-lg text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
          Behind MultiCraft Mods
        </h2>
        <p className="font-body-lg text-gray-300 leading-relaxed text-base md:text-lg">
          We are a decentralized community of architects, graphic designers, and core systems developers working together to make voxel creations more expressive.
        </p>
      </section>

      {/* Core Team Members Masonry Grid */}
      <section className="space-y-6" id="core-team-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.name}
              className="bg-[#201f1f]/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#c8f16d]/20 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden"
              id={`team-card-${index}`}
            >
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#c8f16d]/30 overflow-hidden bg-zinc-800 shrink-0">
                    <img
                      alt={member.name}
                      className="w-full h-full object-cover"
                      src={member.avatar}
                    />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-white font-bold leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#c8f16d] font-semibold uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded bg-zinc-950/80 text-gray-400 border border-white/5 text-[10px] font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="font-body-md text-gray-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* Action Rows */}
              <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                <button
                  onClick={() => alert(`Sending mail to ${member.name}`)}
                  className="p-2 rounded-full bg-zinc-900 border border-white/5 hover:border-[#c8f16d]/20 text-gray-400 hover:text-[#c8f16d] transition-all"
                  id={`contact-team-${index}`}
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`Launching profile view for ${member.name}`)}
                  className="flex-grow bg-zinc-900 border border-white/5 hover:bg-[#c8f16d] hover:text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold text-center text-white transition-all"
                  id={`profile-team-${index}`}
                >
                  View Creations
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Contrast Technical Contributors List */}
      <section className="space-y-8" id="contributors-section">
        <div>
          <h3 className="font-headline-lg text-2xl font-bold text-white tracking-tight">
            Technical Contributors
          </h3>
          <p className="text-gray-400 font-body-md">Engineers and auditors powering stable mod delivery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TECHNICAL_CONTRIBUTORS.map((contrib, index) => (
            <div
              key={contrib.name}
              className="bg-[#201f1f]/40 p-4 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-[#c8f16d]/10 transition-colors"
              id={`contrib-card-${index}`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-white/5 shrink-0">
                <img
                  alt={contrib.name}
                  className="w-full h-full object-cover"
                  src={contrib.avatar}
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-headline-md text-sm text-white font-bold">{contrib.name}</h4>
                <p className="text-[10px] text-[#c8f16d] font-semibold uppercase tracking-wider">{contrib.role}</p>
                <p className="font-body-sm text-gray-400 text-xs mt-1 line-clamp-1">{contrib.description}</p>
              </div>
              <button
                onClick={() => alert(`Thanking contributor ${contrib.name}!`)}
                className="p-2 rounded-full hover:bg-zinc-800 text-gray-500 hover:text-white transition-colors border border-transparent hover:border-white/5"
                id={`thank-contrib-${index}`}
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* "Letter to our Crafters" Segment */}
      <section className="bg-gradient-to-br from-[#201f1f] to-zinc-950 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl" id="letter-to-crafters">
        <div className="absolute right-0 top-0 w-84 h-84 bg-[#c8f16d]/5 blur-3xl rounded-full" />
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="flex gap-4 items-center">
            <Quote className="w-10 h-10 text-[#c8f16d] opacity-50 shrink-0" />
            <h3 className="font-display-lg text-2xl md:text-3xl font-black text-white">
              A Letter to our Crafters
            </h3>
          </div>
          
          <div className="font-body-lg text-gray-300 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              When we started MultiCraft Mods, we set out with a simple but ambitious goal: to build a central hub where creative players could find tools, share techniques, and download files that are tested, secure, and ready to go.
            </p>
            <p>
              Every pixel, mesh, and code block published here is a testament to the community's creative energy. As co-owners, our commitment is to keep this space open, accessible, and fast. Thank you for carving out a section of your digital journey to build with us.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-wrap gap-6 justify-between items-center text-xs text-gray-400">
            <div>
              <p className="font-bold text-white font-label-md">With gratitude,</p>
              <p className="font-semibold text-gray-400 mt-1">Kyranzo, Alex "Void" Chen, & Sarah "Luna" J.</p>
            </div>
            <button
              onClick={() => alert("Launching forum / feedback board...")}
              className="bg-[#c8f16d] text-zinc-950 px-5 py-3 rounded-full font-bold text-xs flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
              id="join-community-btn"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Join the Chat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
