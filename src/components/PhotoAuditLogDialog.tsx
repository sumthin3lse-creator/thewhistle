import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuditEntry {
  id: string;
  ad_id: string;
  changed_by: string | null;
  changed_by_email: string | null;
  previous_image_url: string | null;
  previous_photo_title: string | null;
  new_image_url: string | null;
  new_photo_title: string | null;
  source: string;
  created_at: string;
}

interface Props {
  adId: string;
  trigger: React.ReactNode;
}

export default function PhotoAuditLogDialog({ adId, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) return;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("ad_photo_audit_log")
        .select("*")
        .eq("ad_id", adId)
        .order("created_at", { ascending: false });
      setLoading(false);
      if (error) {
        toast({ title: "Failed to load history", description: error.message, variant: "destructive" });
        return;
      }
      setEntries((data ?? []) as AuditEntry[]);
    };
    load();
  }, [open, adId, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Photo Change History</DialogTitle>
          <DialogDescription>
            Every photo override is tracked here with the admin who made the change.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : entries.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No photo changes recorded for this ad yet.
            </p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="text-sm">
                    <span className="font-semibold">{e.changed_by_email ?? "Unknown admin"}</span>
                    <span className="text-muted-foreground"> · {new Date(e.created_at).toLocaleString()}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{e.source}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Previous</p>
                    <div className="flex items-center gap-2 mt-1">
                      {e.previous_image_url ? (
                        <img src={e.previous_image_url} alt="" className="w-12 h-12 object-cover rounded border" />
                      ) : (
                        <div className="w-12 h-12 rounded border bg-muted" />
                      )}
                      <p className="text-xs truncate">{e.previous_photo_title ?? "—"}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">New</p>
                    <div className="flex items-center gap-2 mt-1">
                      {e.new_image_url ? (
                        <img src={e.new_image_url} alt="" className="w-12 h-12 object-cover rounded border" />
                      ) : (
                        <div className="w-12 h-12 rounded border bg-muted" />
                      )}
                      <p className="text-xs truncate">{e.new_photo_title ?? "—"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
