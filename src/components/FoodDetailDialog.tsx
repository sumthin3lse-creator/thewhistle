import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface FoodItem {
  src: string;
  alt: string;
  label: string;
  description: string;
}

interface FoodDetailDialogProps {
  item: FoodItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FoodDetailDialog({ item, open, onOpenChange }: FoodDetailDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl gap-0">
        <div className="relative">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full aspect-[4/3] object-cover"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-foreground">
              {item.label}
            </DialogTitle>
          </DialogHeader>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
