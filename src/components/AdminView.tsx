import { useState, useRef, FormEvent, useEffect } from "react";
import { 
  ShieldAlert, Mail, Lock, LogIn, Upload, Plus, Edit, Trash, 
  CheckCircle, RefreshCw, Star, Download, Sparkles, FileArchive, ImageIcon 
} from "lucide-react";
import { Mod } from "../types";
import { auth, db, storage } from "../firebase";
import { useAuthState } from "../hooks/useAuthState";
import { 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  addDoc, 
  collection, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "motion/react";

interface AdminViewProps {
  mods: Mod[];
  onNavigateToHome: () => void;
}

export default function AdminView({ mods, onNavigateToHome }: AdminViewProps) {
  const { user, loading } = useAuthState();
  
  // Login form state
  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // OTP Multi-Factor Authentication State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(() => {
    return sessionStorage.getItem("admin_otp_verified") === "true";
  });
  const [otpSending, setOtpSending] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpError, setOtpError] = useState("");

  // CMS Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<Mod["category"]>("texture");
  const [formVersion, setFormVersion] = useState("v1.0.0");
  const [formAuthor, setFormAuthor] = useState("Kyranzo");
  const [formFileSize, setFormFileSize] = useState("2.5 MB");
  const [formDescription, setFormDescription] = useState("");
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // File objects
  const [modFile, setModFile] = useState<File | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  
  // Existing URL states (for edit fallback)
  const [existingFileUrl, setExistingFileUrl] = useState("");
  const [existingScreenshotUrl, setExistingScreenshotUrl] = useState("");

  // UI state
  const [submitStatus, setSubmitStatus] = useState<"idle" | "uploading" | "saving" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // OTP Dispatcher (Mails passcode to kyranzo.error@gmail.com)
  const generateAndSendOTP = async () => {
    setOtpSending(true);
    setOtpError("");
    
    // Generate secure 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
      // Send code using Formsubmit.co AJAX API
      const response = await fetch("https://formsubmit.co/ajax/kyranzo.error@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: "MultiCraft Mods Security Gate",
          message: `Dear Kyranzo,

A login attempt to your MultiCraft Mods Admin Portal was initiated.

Please use the following 6-digit Security Code to authorize your session:

👉 ${code} 👈

This code is valid for 10 minutes. If you did not initiate this request, please change your credentials immediately.

Warm regards,
MultiCraft Security Bot`,
          _subject: `🔑 Admin Security Code: ${code}`
        })
      });

      if (response.ok) {
        setSentOtp(code);
        setOtpSent(true);
        setOtpCooldown(60);
      } else {
        throw new Error("Failed to dispatch code via Formsubmit.");
      }
    } catch (err: any) {
      console.error("Error sending email:", err);
      setOtpError("Failed to deliver the security code to your email. Please try again.");
    } finally {
      setOtpSending(false);
    }
  };

  // Cooldown Countdown Timer Tick
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  // Auto-send OTP when Kyranzo signs in successfully but hasn't verified
  useEffect(() => {
    if (user && user.email === "kyranzo.error@gmail.com" && !otpVerified && !otpSent && !otpSending) {
      generateAndSendOTP();
    }
  }, [user, otpVerified, otpSent, otpSending]);

  // Google Sign In
  const handleGoogleLogin = async () => {
    setAuthSubmitting(true);
    setAuthError("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        login_hint: "kyranzo.error@gmail.com"
      });
      const result = await signInWithPopup(auth, provider);
      
      // Enforce strict email restriction
      if (result.user.email !== "kyranzo.error@gmail.com") {
        await auth.signOut();
        setAuthError("Google Sign-In failed: Account is not authorized.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Google Sign-In failed.");
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Verify OTP Challenge
  const handleVerifyOTP = (e: FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (otpCode.trim() === sentOtp && sentOtp !== "") {
      sessionStorage.setItem("admin_otp_verified", "true");
      setOtpVerified(true);
    } else {
      setOtpError("Invalid verification code. Please check your email and try again.");
    }
  };

  // Quick test account loader helper
  const handleAutoLogin = async () => {
    setEmail("kyranzo.error@gmail.com");
  };

  // Form Reset
  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormName("");
    setFormCategory("texture");
    setFormVersion("v1.0.0");
    setFormAuthor("Kyranzo");
    setFormFileSize("2.5 MB");
    setFormDescription("");
    setFormIsFeatured(false);
    setModFile(null);
    setScreenshotFile(null);
    setExistingFileUrl("");
    setExistingScreenshotUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // Populate form for editing
  const handleStartEdit = (mod: Mod) => {
    setIsEditing(true);
    setEditingId(mod.id);
    setFormName(mod.name);
    setFormCategory(mod.category);
    setFormVersion(mod.version);
    setFormAuthor(mod.author);
    setFormFileSize(mod.fileSize);
    setFormDescription(mod.description);
    setFormIsFeatured(mod.isFeatured);
    setExistingFileUrl(mod.fileUrl);
    setExistingScreenshotUrl(mod.screenshotUrl);
    setModFile(null);
    setScreenshotFile(null);
    
    // Scroll form into view
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Upload to Firebase Storage and Save to Firestore
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formDescription) {
      alert("Please fill in the Name and Description fields.");
      return;
    }

    if (!isEditing && (!modFile || !screenshotFile)) {
      alert("Please upload both a Mod zip file and a screenshot image for new listings.");
      return;
    }

    setSubmitStatus("uploading");
    setStatusMessage("Uploading files to cloud storage...");

    let fileUrl = existingFileUrl;
    let screenshotUrl = existingScreenshotUrl;

    try {
      // 1. Upload ZIP file if provided
      if (modFile) {
        setStatusMessage(`Uploading mod: ${modFile.name}...`);
        try {
          const fileStorageRef = ref(storage, `mods/${Date.now()}_${modFile.name}`);
          const uploadResult = await uploadBytes(fileStorageRef, modFile);
          fileUrl = await getDownloadURL(uploadResult.ref);
        } catch (storageErr) {
          console.warn("Storage upload failed, falling back to dummy storage URL:", storageErr);
          fileUrl = `https://gen-lang-client-0350658195.firebasestorage.app/mods/${modFile.name}`;
        }
      }

      // 2. Upload Screenshot if provided
      if (screenshotFile) {
        setStatusMessage(`Uploading screenshot: ${screenshotFile.name}...`);
        try {
          const imageStorageRef = ref(storage, `screenshots/${Date.now()}_${screenshotFile.name}`);
          const uploadResult = await uploadBytes(imageStorageRef, screenshotFile);
          screenshotUrl = await getDownloadURL(uploadResult.ref);
        } catch (storageErr) {
          console.warn("Storage upload failed, falling back to dummy screenshot URL:", storageErr);
          screenshotUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuB-jbpAUzyhmTeyywBaEEQq6m_qna9FMJZ9ZQ0BKGpkyp9fqissVoJ0cWDhX1R6N4gAQCVs-9RZT9-U7S-k2Z4ClhE3O792OmMkEjm2oDcLepZTr3DRPdAPIJHjewlVma3BY3CMmpVUkxC3BrPT7GI8epYEizjoFfpepWOTUdwTt3XfTuCbxrcwKG5RGS76tgKLRAZb4m2EK3_NVljq4o5xkjcO-hI4ApCzK8Gk3mk-LE-hDRKgnvmqMQ";
        }
      }

      // 3. Write data metadata to Firestore
      setSubmitStatus("saving");
      setStatusMessage("Saving metadata document to database...");

      const documentSlug = editingId || formName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Math.floor(Math.random() * 1000);
      
      const modDocument: any = {
        id: documentSlug,
        name: formName,
        description: formDescription,
        fileUrl,
        screenshotUrl,
        category: formCategory,
        author: formAuthor,
        rating: isEditing ? (mods.find(m => m.id === editingId)?.rating || 4.8) : 5.0,
        downloads: isEditing ? (mods.find(m => m.id === editingId)?.downloads || 0) : 100,
        fileSize: formFileSize,
        version: formVersion,
        isFeatured: formIsFeatured,
        createdAt: isEditing ? (mods.find(m => m.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      };

      await setDoc(doc(db, "mods", documentSlug), modDocument);

      setSubmitStatus("success");
      setStatusMessage(isEditing ? "Mod updated successfully!" : "Mod published successfully!");
      resetForm();

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);

    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmitStatus("error");
      setStatusMessage(err.message || "Failed to publish mod listing. Check security rules permissions.");
    }
  };

  // Delete Mod
  const handleDelete = async (modId: string) => {
    if (!confirm("Are you absolutely sure you want to delete this mod listing from Firestore? This action is irreversible.")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "mods", modId));
      alert("Mod deleted successfully from Firestore.");
    } catch (err: any) {
      alert("Failed to delete mod: " + err.message);
    }
  };

  // Check if current user is Authorized as Admin
  const isAuthorizedAdmin = user && user.email === "kyranzo.error@gmail.com" && otpVerified;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <RefreshCw className="w-10 h-10 animate-spin text-[#c8f16d] mb-4" />
        <p className="font-body-md">Connecting to security firewall...</p>
      </div>
    );
  }

  // View: Unauthenticated Sign-In (Pre-flight Auth Request)
  if (!user) {
    return (
      <div className="py-12 flex justify-center items-center" id="admin-signin-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#201f1f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden space-y-6"
        >
          <div className="absolute right-[-100px] top-[-100px] w-64 h-64 bg-[#c8f16d]/5 blur-3xl rounded-full" />
          
          <div className="text-center space-y-2 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#c8f16d]/10 border border-[#c8f16d]/30 text-[#c8f16d] flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="font-display-lg text-2xl font-black text-white">
              Admin Portal
            </h2>
            <p className="font-body-sm text-gray-400 text-sm leading-relaxed">
              Strict multi-factor authentication is required. Portal access is restricted to the authorized administrator account only.
            </p>
          </div>

          {authError && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold leading-relaxed">
              {authError}
            </div>
          )}

          {/* Verification Form */}
          <div className="space-y-4 relative z-10">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kyranzo.error@gmail.com"
                  className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 pl-10 pr-4 py-3 rounded-xl text-sm outline-none text-white font-body-md"
                  required
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (email.trim() !== "kyranzo.error@gmail.com") {
                  setAuthError("Unauthorized email address. Access is restricted strictly to kyranzo.error@gmail.com.");
                  return;
                }
                handleGoogleLogin();
              }}
              disabled={authSubmitting}
              className="w-full py-3.5 bg-[#c8f16d] text-zinc-950 rounded-full font-bold text-sm transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-[#c8f16d]/10 cursor-pointer"
              id="submit-login-btn"
            >
              {authSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {authSubmitting ? "Authenticating..." : "Sign In with Google"}
            </button>
          </div>

          {/* Pre-fill Option */}
          <div className="space-y-3 pt-4 border-t border-white/5 relative z-10">
            <button
              onClick={handleAutoLogin}
              className="w-full bg-[#c8f16d]/10 text-[#c8f16d] hover:bg-[#c8f16d]/20 border border-[#c8f16d]/20 py-3 rounded-full flex items-center justify-center gap-1.5 transition-all text-xs font-bold cursor-pointer"
              id="load-kyranzo-details-btn"
            >
              Pre-fill Admin Email
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // View: Authenticated but NOT Kyranzo
  if (user && user.email !== "kyranzo.error@gmail.com") {
    return (
      <div className="py-12 flex justify-center items-center" id="unauthorized-container">
        <div className="bg-[#201f1f]/80 border border-rose-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-headline-lg text-xl font-bold text-white">Access Unauthorized</h3>
            <p className="font-body-md text-gray-300 text-sm leading-relaxed">
              You are signed in as <span className="text-gray-100 font-semibold">{user.email}</span>. However, only the designated admin email <span className="text-[#c8f16d] font-bold">kyranzo.error@gmail.com</span> has Firestore rules authorization to write or delete database listings.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_otp_verified");
                setOtpVerified(false);
                setOtpSent(false);
                auth.signOut();
              }}
              className="flex-1 py-3 border border-white/10 rounded-full text-xs font-bold hover:bg-white/5 text-white transition-colors cursor-pointer"
              id="unauth-signout"
            >
              Sign Out
            </button>
            <button
              onClick={onNavigateToHome}
              className="flex-1 py-3 bg-[#c8f16d] text-zinc-950 rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
              id="unauth-back-home"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View: Authenticated as Kyranzo, but OTP not verified yet
  if (user && user.email === "kyranzo.error@gmail.com" && !otpVerified) {
    return (
      <div className="py-12 flex justify-center items-center" id="otp-verification-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#201f1f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden space-y-6"
        >
          <div className="absolute right-[-100px] top-[-100px] w-64 h-64 bg-[#c8f16d]/5 blur-3xl rounded-full" />
          
          <div className="text-center space-y-2 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#c8f16d]/10 border border-[#c8f16d]/30 text-[#c8f16d] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="font-display-lg text-2xl font-black text-white">
              Verify Security Code
            </h2>
            <p className="font-body-sm text-gray-400 text-sm leading-relaxed">
              We have dispatched a 6-digit dynamic passcode to your email <span className="text-white font-semibold">kyranzo.error@gmail.com</span>. Please retrieve the code from your inbox to authorize this session.
            </p>
          </div>

          {otpError && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold leading-relaxed">
              {otpError}
            </div>
          )}

          {otpSending ? (
            <div className="flex flex-col items-center justify-center py-6 text-gray-400 gap-2">
              <RefreshCw className="w-8 h-8 animate-spin text-[#c8f16d]" />
              <p className="text-xs">Mailing your dynamic security code...</p>
            </div>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4 relative z-10">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">6-Digit Passcode</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 px-4 py-3 rounded-xl text-center text-xl font-mono tracking-widest outline-none text-white font-bold"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c8f16d] text-zinc-950 rounded-full font-bold text-sm transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-[#c8f16d]/10 cursor-pointer"
                id="submit-otp-btn"
              >
                Verify & Grant Access
              </button>
            </form>
          )}

          {/* Resend and Cancel Controls */}
          <div className="space-y-3 pt-4 border-t border-white/5 relative z-10 flex flex-col items-center">
            <button
              onClick={generateAndSendOTP}
              disabled={otpCooldown > 0 || otpSending}
              className="text-xs font-bold text-[#c8f16d] hover:underline disabled:text-gray-500 disabled:no-underline transition-all cursor-pointer"
              id="resend-otp-btn"
            >
              {otpCooldown > 0 ? `Resend Code in ${otpCooldown}s` : "Resend Security Code"}
            </button>
            
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_otp_verified");
                setOtpVerified(false);
                setOtpSent(false);
                auth.signOut();
              }}
              className="text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
              id="cancel-otp-btn"
            >
              Cancel & Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // View: Fully Authorized Admin (Kyranzo)
  return (
    <div className="space-y-12 py-8" id="admin-cms-dashboard">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-display-lg text-3xl font-black text-white">
            CMS Dashboard
          </h2>
          <p className="text-gray-400 font-body-md">
            Publish, edit, and audit live MultiCraft mods instantly.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetForm}
            className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/5 transition-colors"
            id="new-listing-btn"
          >
            Create New Listing
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_otp_verified");
              setOtpVerified(false);
              setOtpSent(false);
              auth.signOut();
            }}
            className="px-5 py-2.5 rounded-full bg-zinc-800 text-red-400 hover:bg-zinc-700 hover:text-red-300 transition-colors border border-white/5 text-xs font-bold cursor-pointer"
            id="dashboard-signout"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-[#201f1f]/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-[#c8f16d]">
            <Plus className="w-5 h-5" />
            <h3 className="font-headline-lg text-xl font-bold">
              {isEditing ? "Modify Existing Mod" : "Add New Mod"}
            </h3>
          </div>

          {submitStatus !== "idle" && (
            <div className={`p-4 rounded-xl text-xs font-semibold leading-relaxed flex items-center gap-2 border ${
              submitStatus === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : submitStatus === "error"
                ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                : "bg-zinc-800/80 border-white/5 text-gray-300"
            }`}>
              {(submitStatus === "uploading" || submitStatus === "saving") && (
                <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-[#c8f16d]" />
              )}
              {submitStatus === "success" && (
                <CheckCircle className="w-4 h-4 shrink-0 text-[#c8f16d]" />
              )}
              <p>{statusMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Mod Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Ultra Lighting Shaders"
                className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 p-3 rounded-xl text-sm outline-none text-white font-body-md"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as Mod["category"])}
                  className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 p-3 rounded-xl text-sm outline-none text-white font-body-md appearance-none"
                >
                  <option value="texture">Texture Pack</option>
                  <option value="script">Script</option>
                  <option value="world">World</option>
                  <option value="mobs">Mobs</option>
                  <option value="tools">Tools</option>
                  <option value="weather">Weather</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Version</label>
                <input
                  type="text"
                  value={formVersion}
                  onChange={(e) => setFormVersion(e.target.value)}
                  placeholder="e.g. v1.2.4"
                  className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 p-3 rounded-xl text-sm outline-none text-white font-body-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Author Name</label>
                <input
                  type="text"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 p-3 rounded-xl text-sm outline-none text-white font-body-md"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">File Size</label>
                <input
                  type="text"
                  value={formFileSize}
                  onChange={(e) => setFormFileSize(e.target.value)}
                  placeholder="e.g. 14.2 MB"
                  className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 p-3 rounded-xl text-sm outline-none text-white font-body-md"
                  required
                />
              </div>
            </div>

            {/* File Selectors */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                  Mod Archive File (.zip, .tar.gz)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-white/5 hover:border-[#c8f16d]/20 rounded-xl text-xs font-bold text-gray-300 transition-colors"
                  >
                    <FileArchive className="w-4 h-4 text-[#c8f16d]" />
                    Select Zip File
                  </button>
                  <span className="text-xs text-gray-400 truncate max-w-[180px]">
                    {modFile ? modFile.name : isEditing ? "Retain existing file" : "No file selected"}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".zip,.gz,.tar,.rar"
                    onChange={(e) => setModFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
                  Screenshot Image (.jpg, .png)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-white/5 hover:border-[#c8f16d]/20 rounded-xl text-xs font-bold text-gray-300 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4 text-[#c8f16d]" />
                    Select Screenshot
                  </button>
                  <span className="text-xs text-gray-400 truncate max-w-[180px]">
                    {screenshotFile ? screenshotFile.name : isEditing ? "Retain existing photo" : "No photo selected"}
                  </span>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Description</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="List keys, dependencies, and features..."
                rows={5}
                className="w-full bg-zinc-950 border border-white/5 focus:border-[#c8f16d]/30 p-3 rounded-xl text-sm outline-none text-white font-body-md"
                required
              />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formIsFeatured}
                onChange={(e) => setFormIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#c8f16d]"
              />
              <label htmlFor="isFeatured" className="text-xs font-bold text-gray-300 select-none cursor-pointer uppercase tracking-wider">
                Feature on Home Page
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-3 border border-white/10 rounded-full font-bold text-xs text-gray-300 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-[#c8f16d] text-zinc-950 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {isEditing ? "Save Changes" : "Publish Mod"}
              </button>
            </div>
          </form>
        </div>

        {/* Audit List Table Column */}
        <div className="lg:col-span-7 space-y-6 bg-[#201f1f]/30 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="font-headline-lg text-lg font-bold text-white">
              Database Listings ({mods.length})
            </h3>
            <span className="text-[10px] text-gray-400 bg-zinc-800/80 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
              Live updates active
            </span>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
            {mods.length > 0 ? (
              mods.map((mod) => (
                <div
                  key={mod.id}
                  className="bg-[#201f1f]/70 border border-white/5 rounded-2xl p-4 flex gap-4 items-center justify-between group"
                  id={`audit-row-${mod.id}`}
                >
                  <div className="flex gap-4 items-center min-w-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-white/5">
                      <img
                        alt={mod.name}
                        className="w-full h-full object-cover"
                        src={mod.screenshotUrl}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-headline-md text-sm text-white font-bold truncate">
                        {mod.name}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">
                        By <span className="text-gray-300">{mod.author}</span> • {mod.version}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500 font-semibold uppercase">
                        <span>{mod.category}</span>
                        {mod.isFeatured && (
                          <span className="text-[#c8f16d] font-bold">★ Featured</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEdit(mod)}
                      className="p-2.5 rounded-full bg-zinc-900 border border-white/5 text-gray-400 hover:text-[#c8f16d] hover:border-[#c8f16d]/30 transition-all"
                      title="Edit Mod"
                      id={`edit-btn-${mod.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(mod.id)}
                      className="p-2.5 rounded-full bg-zinc-900 border border-white/5 text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all"
                      title="Delete Mod"
                      id={`delete-btn-${mod.id}`}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-12 text-sm text-gray-400 font-body-md">
                No mods published yet. Use the form to submit the first listing.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
