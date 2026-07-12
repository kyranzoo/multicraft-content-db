import { useEffect, useState } from "react";
import { collection, onSnapshot, setDoc, doc, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";
import { Mod } from "../types";
import { DEFAULT_MODS } from "../data";

export function useMods() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const modsCollection = collection(db, "mods");
    
    const unsubscribe = onSnapshot(modsCollection, async (snapshot) => {
      const list: Mod[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as Mod);
      });

      // Sort by download counts desc
      list.sort((a, b) => b.downloads - a.downloads);

      if (snapshot.empty) {
        // Seeding database
        console.log("Mods database is empty. Auto-seeding default mods to Firestore...");
        try {
          // Loop and write defaults
          for (const defaultMod of DEFAULT_MODS) {
            await setDoc(doc(db, "mods", defaultMod.id), defaultMod);
          }
        } catch (err) {
          console.error("Auto-seeding skipped or failed (unauthorized yet):", err);
          // If Firestore is still being provisioned or locked, render local defaults directly
          setMods(DEFAULT_MODS);
          setLoading(false);
        }
      } else {
        setMods(list);
        setLoading(false);
      }
    }, (err) => {
      console.warn("Firestore listener failed or restricted, falling back to local dataset:", err);
      setMods(DEFAULT_MODS);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { mods, loading };
}
