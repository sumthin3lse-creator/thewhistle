import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Facebook, Twitter, Eye, Heart, MessageCircle, Send, Bookmark, Share2, ThumbsUp, MoreHorizontal, Repeat2 } from "lucide-react";
import { ReactNode } from "react";
import logo from "@/assets/restaurant-logo.png";

interface Ad {
  platform: string;
  headline: string;
  caption: string;
  hashtags: string[];
  call_to_action: string;
  image_url: string | null;
}

interface PlatformPreviewDialogProps {
  ad: Ad;
  trigger: ReactNode;
}

const formatCaption = (caption: string, hashtags: string[]) => {
  const hashtagStr = hashtags?.length > 0 ? "\n\n" + hashtags.map(h => `#${h}`).join(" ") : "";
  return caption + hashtagStr;
};

function InstagramPreview({ ad }: { ad: Ad }) {
  return (
    <div className="bg-white rounded-lg border max-w-[375px] mx-auto shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-8 h-8 rounded-full overflow-hidden border">
          <img src={logo} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-black">thewhistlestopstuart</p>
          <p className="text-[11px] text-gray-500">Port Salerno, FL</p>
        </div>
        <MoreHorizontal className="h-5 w-5 text-black" />
      </div>
      {/* Image */}
      <div className="w-full aspect-square bg-gray-100">
        {ad.image_url ? (
          <img src={ad.image_url} alt={ad.headline} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart className="h-6 w-6 text-black" />
            <MessageCircle className="h-6 w-6 text-black" />
            <Send className="h-6 w-6 text-black" />
          </div>
          <Bookmark className="h-6 w-6 text-black" />
        </div>
        <p className="text-sm font-semibold text-black mb-1">127 likes</p>
        <p className="text-sm text-black">
          <span className="font-semibold">thewhistlestopstuart</span>{" "}
          <span className="whitespace-pre-wrap">{formatCaption(ad.caption, ad.hashtags).slice(0, 200)}</span>
          {ad.caption.length > 200 && <span className="text-gray-500"> ...more</span>}
        </p>
        <p className="text-xs text-gray-500 mt-1">2 HOURS AGO</p>
      </div>
    </div>
  );
}

function FacebookPreview({ ad }: { ad: Ad }) {
  return (
    <div className="bg-white rounded-lg border max-w-[420px] mx-auto shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <img src={logo} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-[15px] font-semibold text-black">The Whistle Stop</p>
          <p className="text-xs text-gray-500">2h · 🌎</p>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </div>
      {/* Caption */}
      <div className="px-3 pb-2">
        <p className="text-[15px] text-black whitespace-pre-wrap">
          {formatCaption(ad.caption, ad.hashtags).slice(0, 280)}
          {ad.caption.length > 280 && <span className="text-blue-600 cursor-pointer"> See more</span>}
        </p>
      </div>
      {/* Image */}
      <div className="w-full aspect-[1.91/1] bg-gray-100">
        {ad.image_url ? (
          <img src={ad.image_url} alt={ad.headline} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      {/* CTA bar */}
      {ad.call_to_action && (
        <div className="bg-gray-50 px-3 py-2 border-t border-b">
          <p className="text-xs text-gray-500 uppercase">thewhistlestopstuart.com</p>
          <p className="text-[15px] font-semibold text-black">{ad.headline}</p>
          <p className="text-xs text-gray-500">{ad.call_to_action}</p>
        </div>
      )}
      {/* Reactions */}
      <div className="px-3 py-2 flex items-center justify-between text-gray-500 text-sm border-t">
        <span>❤️ 42</span>
        <span>8 comments · 3 shares</span>
      </div>
      <div className="flex items-center border-t divide-x">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 text-sm font-medium">
          <ThumbsUp className="h-5 w-5" /> Like
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 text-sm font-medium">
          <MessageCircle className="h-5 w-5" /> Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 text-sm font-medium">
          <Share2 className="h-5 w-5" /> Share
        </button>
      </div>
    </div>
  );
}

function TikTokPreview({ ad }: { ad: Ad }) {
  return (
    <div className="bg-black rounded-lg max-w-[320px] mx-auto shadow-lg overflow-hidden relative" style={{ aspectRatio: "9/16" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        {ad.image_url ? (
          <img src={ad.image_url} alt={ad.headline} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      {/* Right sidebar */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-5 h-5 bg-red-500 rounded-full -mt-2 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">+</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Heart className="h-7 w-7 text-white" />
          <span className="text-white text-[11px] mt-1">2.4K</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle className="h-7 w-7 text-white" />
          <span className="text-white text-[11px] mt-1">89</span>
        </div>
        <div className="flex flex-col items-center">
          <Bookmark className="h-7 w-7 text-white" />
          <span className="text-white text-[11px] mt-1">312</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="h-7 w-7 text-white" />
          <span className="text-white text-[11px] mt-1">45</span>
        </div>
      </div>
      {/* Bottom text */}
      <div className="absolute bottom-4 left-3 right-16">
        <p className="text-white font-semibold text-sm mb-1">@thewhistlestopstuart</p>
        <p className="text-white text-[13px] leading-tight line-clamp-3">
          {ad.caption.slice(0, 150)}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-white text-[11px]">🎵</span>
          <p className="text-white text-[11px] truncate">original sound - thewhistlestopstuart</p>
        </div>
      </div>
    </div>
  );
}

function TwitterPreview({ ad }: { ad: Ad }) {
  return (
    <div className="bg-white rounded-lg border max-w-[420px] mx-auto shadow-sm overflow-hidden">
      <div className="p-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border flex-shrink-0">
            <img src={logo} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[15px] text-black">The Whistle Stop</span>
              <span className="text-gray-500 text-[15px]">@WhistleStopFL · 2h</span>
            </div>
            <p className="text-[15px] text-black whitespace-pre-wrap mt-1">
              {ad.caption.slice(0, 280)}
              {ad.hashtags?.length > 0 && (
                <span className="text-blue-500"> {ad.hashtags.slice(0, 5).map(h => `#${h}`).join(" ")}</span>
              )}
            </p>
            {/* Image */}
            {ad.image_url && (
              <div className="mt-3 rounded-2xl overflow-hidden border">
                <img src={ad.image_url} alt={ad.headline} className="w-full aspect-video object-cover" />
              </div>
            )}
            {/* Actions */}
            <div className="flex items-center justify-between mt-3 max-w-[300px] text-gray-500">
              <div className="flex items-center gap-1 text-sm">
                <MessageCircle className="h-[18px] w-[18px]" />
                <span>12</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Repeat2 className="h-[18px] w-[18px]" />
                <span>8</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Heart className="h-[18px] w-[18px]" />
                <span>94</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Share2 className="h-[18px] w-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformPreviewDialog({ ad, trigger }: PlatformPreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Platform Preview
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="instagram" className="flex items-center gap-1.5">
              <Instagram className="h-4 w-4" /> Instagram
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-1.5">
              <Facebook className="h-4 w-4" /> Facebook
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="flex items-center gap-1.5">
              <span className="font-bold text-xs">TT</span> TikTok
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-1.5">
              <Twitter className="h-4 w-4" /> X
            </TabsTrigger>
          </TabsList>
          <TabsContent value="instagram" className="mt-4">
            <InstagramPreview ad={ad} />
          </TabsContent>
          <TabsContent value="facebook" className="mt-4">
            <FacebookPreview ad={ad} />
          </TabsContent>
          <TabsContent value="tiktok" className="mt-4 flex justify-center">
            <TikTokPreview ad={ad} />
          </TabsContent>
          <TabsContent value="twitter" className="mt-4">
            <TwitterPreview ad={ad} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
