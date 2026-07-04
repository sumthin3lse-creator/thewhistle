import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import logo from "@/assets/restaurant-logo.png";

type Mode = "summer" | "july4";

const SUMMER_KEY = "whistlestop-closure-preview-dismissed";
const JULY4_KEY = "whistlestop-july4-popup-dismissed";

function getPreviewMode(): Mode | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search).get("preview");
  if (p === "july4" || p === "summer") return p;
  return null;
}

function computeMode(now: Date): Mode | null {
  // July 4, 2026
  if (now.getFullYear() === 2026 && now.getMonth() === 6 && now.getDate() === 4) {
    return "july4";
  }
  // Summer: before July 9, 2026
  const summerStart = new Date(2026, 6, 9, 0, 0, 0);
  if (now < summerStart) return "summer";
  return null;
}

export function previewClosurePopup(mode: Mode) {
  window.dispatchEvent(
    new CustomEvent("preview-closure-popup", { detail: { mode } })
  );
}

export function ClosurePreviewDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode | null>(null);
  const [previewMode, setPreviewMode] = useState<Mode | null>(null);

  // initial auto-open
  useEffect(() => {
    const pv = getPreviewMode();
    if (pv) {
      setPreviewMode(pv);
      setMode(pv);
      setOpen(true);
      return;
    }
    const m = computeMode(new Date());
    if (!m) return;
    const key = m === "july4" ? JULY4_KEY : SUMMER_KEY;
    if (localStorage.getItem(key) === "1") return;
    const t = setTimeout(() => {
      setMode(m);
      setOpen(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // auto-close summer popup on/after July 9
  useEffect(() => {
    if (previewMode) return;
    if (mode !== "summer") return;
    const check = () => {
      const now = new Date();
      const summerStart = new Date(2026, 6, 9, 0, 0, 0);
      if (now >= summerStart) setOpen(false);
    };
    check();
    const i = setInterval(check, 60_000);
    return () => clearInterval(i);
  }, [mode, previewMode]);

  // preview event listener
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { mode?: Mode };
      if (!detail?.mode) return;
      const key = detail.mode === "july4" ? JULY4_KEY : SUMMER_KEY;
      localStorage.removeItem(key);
      setPreviewMode(detail.mode);
      setMode(detail.mode);
      setOpen(true);
    };
    window.addEventListener("preview-closure-popup", handler);
    return () => window.removeEventListener("preview-closure-popup", handler);
  }, []);

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (!o && mode && !previewMode) {
      const key = mode === "july4" ? JULY4_KEY : SUMMER_KEY;
      localStorage.setItem(key, "1");
    }
  };

  if (!mode) return null;

  if (mode === "july4") {
    return (
      <>
        <style>{`
          @keyframes fw-burst {
            0% { transform: rotate(var(--r, 0deg)) translateX(0); opacity: 1; }
            100% { transform: rotate(var(--r, 0deg)) translateX(42px); opacity: 0; }
          }
          .fw-ray {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 3px;
            height: 3px;
            border-radius: 9999px;
            animation: fw-burst 1.6s ease-out infinite;
          }
        `}</style>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-gradient-to-br from-[#0a1a3d] via-[#122a5e] to-[#7a1414]">
            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
                  style={{
                    top: `${(i * 37) % 100}%`,
                    left: `${(i * 53) % 100}%`,
                    animationDelay: `${(i % 6) * 0.3}s`,
                  }}
                />
              ))}
            </div>
            {/* Fireworks */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { top: "15%", left: "20%", delay: "0s", color: "#ff3b3b" },
                { top: "25%", left: "75%", delay: "0.6s", color: "#ffffff" },
                { top: "55%", left: "15%", delay: "1.2s", color: "#4ea8ff" },
                { top: "45%", left: "80%", delay: "1.8s", color: "#ffd447" },
                { top: "70%", left: "50%", delay: "2.4s", color: "#ff8bd1" },
              ].map((fw, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{ top: fw.top, left: fw.left, width: 0, height: 0 }}
                >
                  {Array.from({ length: 12 }).map((_, r) => (
                    <span
                      key={r}
                      className="fw-ray"
                      style={{
                        ["--r" as any]: `${r * 30}deg`,
                        background: fw.color,
                        boxShadow: `0 0 6px ${fw.color}, 0 0 12px ${fw.color}`,
                        animationDelay: fw.delay,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="relative z-10 p-8 text-center text-white">
              <div className="mx-auto w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                <img src={logo} alt="The Whistle Stop" className="w-20 h-20 object-contain" />
              </div>
              <DialogHeader className="mt-5">
                <DialogTitle
                  className="text-white uppercase tracking-widest text-2xl text-center"
                  style={{
                    fontFamily: "'Oswald', 'Playfair Display', serif",
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  }}
                >
                  Closed for July 4th
                </DialogTitle>
                <DialogDescription className="text-white/90 mt-3 text-base leading-relaxed">
                  The Whistle Stop is closed today, July 4th. Happy Independence Day from our crew to yours! We'll see you back on the rails tomorrow.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 text-3xl tracking-widest">🎆 🇺🇸 🎇</div>
            </div>
            <div
              className="relative z-10 h-3"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #b91c1c 0 24px, #ffffff 24px 48px)",
              }}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // summer mode
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
            <img src={logo} alt="The Whistle Stop" className="w-20 h-20 object-contain" />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="text-center font-display text-2xl">
            Summer Break Ahead
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed">
            The Whistle Stop will be closed July 9 through July 14 for a summer break. We reopen Monday, July 15 at 7 AM. Come see us before we go!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
