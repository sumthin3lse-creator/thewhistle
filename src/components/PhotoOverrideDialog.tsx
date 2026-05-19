import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { PHOTO_LIBRARY, findPhotoByUrl } from "@/data/photoLibrary";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Props {
  adId: string;
  currentUrl: string | null;
  trigger: React.ReactNode;
  onUpdated?: () => void;
}

export default function PhotoOverrideDialog({ adId, currentUrl, trigger, onUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [savingUrl, setSavingUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const currentPhoto = findPhotoByUrl(currentUrl);

  const filtered = PHOTO_LIBRARY.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const selectPhoto = async (url: string) => {
    setSavingUrl(url);
    const { error } = await supabase
      .from("generated_ads")
      .update({ image_url: url, updated_at: new Date().toISOString() })
      .eq("id", adId);
    setSavingUrl(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Photo updated", description: "Ad image has been overridden." });
    setOpen(false);
    onUpdated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Override Ad Photo</DialogTitle>
          <DialogDescription>
            {currentPhoto ? (
              <>Currently selected: <span className="font-semibold">{currentPhoto.title}</span></>
            ) : currentUrl ? (
              <>Currently set to an image outside the library.</>
            ) : (
              <>No photo currently assigned.</>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 pb-2">
          <Input
            placeholder="Search by title or tag (burger, philly, breakfast...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Badge variant="outline">{filtered.length} / {PHOTO_LIBRARY.length}</Badge>
        </div>

        <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pr-1">
          {filtered.map((p) => {
            const isCurrent = p.url === currentUrl;
            const isSaving = savingUrl === p.url;
            return (
              <button
                key={p.url}
                type="button"
                onClick={() => selectPhoto(p.url)}
                disabled={!!savingUrl}
                className={cn(
                  "group relative rounded-lg overflow-hidden border-2 text-left transition-all",
                  isCurrent ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-primary/60",
                  savingUrl && !isSaving && "opacity-50",
                )}
              >
                <div className="aspect-square bg-muted">
                  <img src={p.url} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                {isCurrent && (
                  <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                {isSaving && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                )}
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-1">{p.title}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{p.tags.slice(0, 3).join(", ")}</p>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-muted-foreground py-12">
              No photos match "{query}".
            </p>
          )}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
