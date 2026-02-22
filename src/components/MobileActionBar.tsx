import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useState, useCallback } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      maximize: () => void;
      minimize: () => void;
      hideWidget: () => void;
      showWidget: () => void;
      isChatMaximized: () => boolean;
    };
  }
}

export function MobileActionBar() {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = useCallback(() => {
    if (!window.Tawk_API) return;
    if (chatOpen) {
      window.Tawk_API.minimize();
      window.Tawk_API.hideWidget();
      setChatOpen(false);
    } else {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
      setChatOpen(true);
    }
  }, [chatOpen]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border warm-shadow">
      <div className="flex items-center h-14">
        {/* Call */}
        <a
          href="tel:7722201020"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span className="text-[10px] font-medium">Call</span>
        </a>

        {/* Divider */}
        <div className="w-px h-8 bg-border" />

        {/* Map */}
        <a
          href="https://maps.google.com/?q=4920+SE+Dixie+Hwy,+Stuart,+FL+34997"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
        >
          <MapPin className="h-4 w-4" />
          <span className="text-[10px] font-medium">Map</span>
        </a>

        {/* Divider */}
        <div className="w-px h-8 bg-border" />

        {/* Chat */}
        <button
          onClick={toggleChat}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-[10px] font-medium">Chat</span>
        </button>
      </div>
    </div>
  );
}
