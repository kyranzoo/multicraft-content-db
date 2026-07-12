import { useState, useEffect } from "react";
import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "./firebase";
import { NavigationState, ViewType } from "./types";
import { useMods } from "./hooks/useMods";

// View Imports
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import ModsView from "./components/ModsView";
import ModDetailView from "./components/ModDetailView";
import ToolsView from "./components/ToolsView";
import CreditsView from "./components/CreditsView";
import AdminView from "./components/AdminView";

// Animation imports
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Hammer, Heart, Shield, Terminal } from "lucide-react";

export default function App() {
  const { mods, loading } = useMods();
  const [navigation, setNavigation] = useState<NavigationState>({ view: "home" });

  // Critical constraint: Validate connection to Firestore on boot
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, "test", "connection"));
        console.log("Firestore connection test completed.");
      } catch (error) {
        if (error instanceof Error && error.message.includes("the client is offline")) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  const handleNavigate = (view: ViewType) => {
    setNavigation({ view });
  };

  const handleNavigateToModDetail = (modId: string) => {
    setNavigation({ view: "mod-detail", selectedModId: modId });
  };

  const renderActiveView = () => {
    switch (navigation.view) {
      case "home":
        return (
          <HomeView
            mods={mods}
            onNavigateToMods={() => handleNavigate("mods")}
            onNavigateToModDetail={handleNavigateToModDetail}
          />
        );
      case "mods":
        return (
          <ModsView
            mods={mods}
            onNavigateToModDetail={handleNavigateToModDetail}
          />
        );
      case "mod-detail":
        const selectedMod = mods.find((m) => m.id === navigation.selectedModId);
        if (!selectedMod) {
          return (
            <div className="text-center py-24 text-gray-400">
              <p>Mod not found. Redirecting to directory...</p>
              <button 
                onClick={() => handleNavigate("mods")}
                className="mt-4 px-6 py-2.5 bg-[#c8f16d] text-zinc-950 rounded-full font-bold text-sm"
              >
                Go to Mods
              </button>
            </div>
          );
        }
        return (
          <ModDetailView
            mod={selectedMod}
            onNavigateToMods={() => handleNavigate("mods")}
          />
        );
      case "tools":
        return <ToolsView />;
      case "credits":
        return <CreditsView />;
      case "admin":
        return (
          <AdminView
            mods={mods}
            onNavigateToHome={() => handleNavigate("home")}
          />
        );
      default:
        return (
          <HomeView
            mods={mods}
            onNavigateToMods={() => handleNavigate("mods")}
            onNavigateToModDetail={handleNavigateToModDetail}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-white font-sans flex flex-col selection:bg-[#c8f16d] selection:text-zinc-950">
      {/* Dynamic Navigation Header */}
      <Navbar currentView={navigation.view} onNavigate={handleNavigate} />

      {/* Main Content stage area with animations */}
      <main className="flex-grow pt-20 pb-24 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 text-gray-400">
            <RefreshCw className="w-10 h-10 animate-spin text-[#c8f16d] mb-4" />
            <h3 className="font-headline-md text-lg text-white font-bold mb-1">
              Synchronizing with Firestore
            </h3>
            <p className="text-sm text-gray-400">Loading MultiCraft mods and assets...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={navigation.view + (navigation.selectedModId || "")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Premium Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c8f16d]/10 flex items-center justify-center border border-[#c8f16d]/20 text-[#c8f16d] font-bold text-sm">
              M
            </div>
            <p className="font-semibold text-white">
              MultiCraft <span className="text-[#c8f16d]">Mods</span>
            </p>
          </div>
          <p className="text-center md:text-right font-body-sm text-xs">
            © {new Date().getFullYear()} MultiCraft Community. All rights reserved. Built securely with Firebase.
          </p>
        </div>
      </footer>
    </div>
  );
}
