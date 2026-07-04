import { useEffect, useState } from "react";
import { X } from "lucide-react";

type BannerConfig = {
  key: string;
  message: string;
  active: () => boolean;
};

const BANNERS: BannerConfig[] = [
  {
    key: "whistlestop-banner-july4-2026",
    message: "WE ARE CLOSED TODAY, JULY 4TH. HAPPY INDEPENDENCE DAY!",
    active: () => {
      const now = new Date();
      return (
        now.getFullYear() === 2026 &&
        now.getMonth() === 6 &&
        now.getDate() === 4
      );
    },
  },
  {
    key: "whistlestop-banner-summer-2026",
    message:
      "WE ARE CLOSED JULY 9 THROUGH JULY 14 FOR A SUMMER BREAK. WE REOPEN MONDAY JULY 15 AT 7 AM.",
    active: () => {
      const now = new Date();
      return (
        now.getFullYear() === 2026 &&
        now.getMonth() === 6 &&
        now.getDate() >= 9 &&
        now.getDate() <= 14
      );
    },
  },
];

export function AnnouncementBanner() {
  const [activeBanner, setActiveBanner] = useState<BannerConfig | null>(null);

  useEffect(() => {
    const found = BANNERS.find(
      (b) => b.active() && localStorage.getItem(b.key) !== "1"
    );
    setActiveBanner(found ?? null);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const el = document.getElementById("announcement-banner");
      const h = el ? `${el.offsetHeight}px` : "0px";
      document.documentElement.style.setProperty("--banner-height", h);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      document.documentElement.style.setProperty("--banner-height", "0px");
    };
  }, [activeBanner]);

  if (!activeBanner) return null;

  return (
    <div
      id="announcement-banner"
      role="banner"
      className="fixed top-0 left-0 right-0 z-[60] bg-red-700 text-white"
    >
      <div className="relative px-4 py-2 pr-10 text-center text-sm font-semibold tracking-wide">
        {activeBanner.message}
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            localStorage.setItem(activeBanner.key, "1");
            setActiveBanner(null);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
