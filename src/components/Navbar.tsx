import { Home, Grid, Hammer, Heart, Shield, LogOut, LogIn } from "lucide-react";
import { ViewType } from "../types";
import { auth } from "../firebase";
import { useAuthState } from "../hooks/useAuthState";
import { signOut } from "firebase/auth";

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const { user } = useAuthState();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onNavigate("home");
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "mods", label: "Mods", icon: Grid },
    { id: "tools", label: "Tools", icon: Hammer },
    { id: "credits", label: "Credits", icon: Heart },
    { id: "admin", label: user ? "Admin Panel" : "Admin", icon: Shield },
  ] as const;

  return (
    <>
      {/* Top Navbar for Desktop */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center px-4 md:px-8 max-w-7xl mx-auto h-20">
          <div 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-full bg-[#c8f16d]/20 flex items-center justify-center border border-[#c8f16d]/30">
              <span className="text-[#c8f16d] text-xl font-bold">M</span>
            </div>
            <h1 className="font-headline-md text-xl md:text-2xl font-bold text-white tracking-tight">
              MultiCraft <span className="text-[#c8f16d]">Mods</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === "mods" && currentView === "mod-detail");
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-label-md text-sm transition-all relative py-2 ${
                    isActive
                      ? "text-[#c8f16d] font-bold"
                      : "text-gray-400 hover:text-[#c8f16d] hover:scale-105"
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c8f16d] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white leading-tight">
                    {user.email === "kyranzo.error@gmail.com" ? "Kyranzo" : user.displayName || "Admin"}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {user.email === "kyranzo.error@gmail.com" ? "Super Admin" : "Contributor"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#c8f16d]/30 overflow-hidden bg-zinc-800">
                  <img
                    alt="User avatar"
                    className="w-full h-full object-cover"
                    src={
                      user.email === "kyranzo.error@gmail.com"
                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBpRnVjb-ULC3i3_7-nftlFhfFMoavwYI0NA73IyhWghRZCR2V3Vnf4wTuO7-etuo4W2EKrUWseYq4KaMb-P4TY2k196HH3RgF-gaVR7i_R-P6S29ECDgcDp4hAo-Pk5SY504JBUxgWYie8_737FOZmKP1ze6TooHBgF6e03tS7-JbmKkMTLu_nYi6wQyRON8ari77YSNFUoYci0ml7xIckj0O6Sa9uepef4tfeLpRGkBPLlBjThCOIPA"
                        : "https://lh3.googleusercontent.com/aida-public/AB6AXuCpp45k_11oSTIeVeR2UKFBhz5FOUGUTM7-LC0s9MeYp46kIBu7-OfoL01gqmzH8Rb8DLPFLbtno1N8Z566IK2gMDTCXQqoXecM4JbMElV3_g76gE-Yi7SgTcuUwsXuqQ-TB-ehy-q0bg2Gpy5Ip5wR797HAkO1ryTaef7b5bVDoNowIVe5gFOjnXiP_B7BI7Lv8ckSeQXSx3jw4WPPkJWA4aAfkbFcG5uGxJ2CH6GEWc2HmAxn6LKuzg"
                    }
                  />
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors"
                  title="Sign Out"
                  id="nav-logout-btn"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate("admin")}
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 hover:border-[#c8f16d]/30 transition-all cursor-pointer"
                title="Admin Login"
                id="nav-login-btn"
              >
                <LogIn className="w-4 h-4 text-gray-300 hover:text-[#c8f16d]" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Nav Bar for Mobile devices */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#1a1a1a]/95 backdrop-blur-2xl border-t border-white/5 shadow-[0_-8px_32px_0_rgba(0,0,0,0.5)] rounded-t-2xl pb-safe-bottom">
        <div className="flex justify-around items-center px-4 py-2 pb-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === "mods" && currentView === "mod-detail");
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                  isActive
                    ? "text-[#c8f16d] bg-[#c8f16d]/10 font-bold px-4 py-1.5"
                    : "text-gray-400 hover:text-[#c8f16d] active:scale-90"
                }`}
                id={`mobile-nav-${item.id}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-label-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
