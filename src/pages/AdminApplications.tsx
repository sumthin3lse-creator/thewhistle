import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Trash2, Eye, Mail, Phone } from "lucide-react";

type Status = "new" | "reviewed" | "contacted" | "hired" | "rejected";

interface ApplicationRow {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  position: string | null;
  status: Status;
  created_at: string;
  form_data: any;
  employers: any;
  personal_references: any;
  notes: string | null;
}

const statusColors: Record<Status, string> = {
  new: "bg-blue-500",
  reviewed: "bg-amber-500",
  contacted: "bg-purple-500",
  hired: "bg-green-600",
  rejected: "bg-zinc-500",
};

export default function AdminApplications() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState<ApplicationRow[]>([]);
  const [selected, setSelected] = useState<ApplicationRow | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/admin/login");
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (!isAdmin) {
        await supabase.auth.signOut();
        return navigate("/admin/login");
      }
      load();
    })();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setApps((data || []) as ApplicationRow[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: Status) => {
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      if (selected?.id === id) setSelected({ ...selected, status });
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setApps((prev) => prev.filter((a) => a.id !== id));
      setSelected(null);
      toast({ title: "Deleted" });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
            </Button>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Job Applications
            </h1>
          </div>
          <Badge variant="secondary">{apps.length} total</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : apps.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No applications yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apps.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.full_name}</TableCell>
                      <TableCell>{a.position || "—"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {a.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3" />{a.email}</div>}
                        {a.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3" />{a.phone}</div>}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(a.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[a.status]} text-white capitalize`}>
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelected(a)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => remove(a.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between gap-4">
                  <span>{selected.full_name}</span>
                  <Select
                    value={selected.status}
                    onValueChange={(v) => updateStatus(selected.id, v as Status)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 text-sm">
                <Section title="Contact">
                  <Field label="Email" value={selected.email} />
                  <Field label="Phone" value={selected.phone} />
                  <Field label="Address" value={`${selected.form_data?.presentAddress || ""} ${selected.form_data?.city || ""} ${selected.form_data?.state || ""} ${selected.form_data?.zipCode || ""}`.trim() || "—"} />
                </Section>

                <Section title="Position">
                  <Field label="Position" value={selected.position} />
                  <Field label="Date Can Start" value={selected.form_data?.dateCanStart} />
                  <Field label="Currently Employed" value={selected.form_data?.employedNow} />
                  <Field label="Referred By" value={selected.form_data?.referredBy} />
                </Section>

                <Section title="Education">
                  <Field label="High School" value={`${selected.form_data?.highSchool || "—"} (${selected.form_data?.highSchoolYears || "?"} yrs)`} />
                  <Field label="College" value={`${selected.form_data?.college || "—"} (${selected.form_data?.collegeYears || "?"} yrs)`} />
                </Section>

                <Section title="Skills & Background">
                  <Field label="U.S. Authorized" value={selected.form_data?.usCitizen} />
                  <Field label="Special Training" value={selected.form_data?.specialTraining} />
                  <Field label="Special Skills" value={selected.form_data?.specialSkills} />
                  <Field label="Military" value={`${selected.form_data?.militaryService || "—"} ${selected.form_data?.militaryRank ? `(${selected.form_data.militaryRank})` : ""}`} />
                </Section>

                {Array.isArray(selected.employers) && selected.employers.some((e: any) => e?.name) && (
                  <Section title="Former Employers">
                    {selected.employers.filter((e: any) => e?.name).map((e: any, i: number) => (
                      <div key={i} className="border-l-2 border-primary/40 pl-3 mb-3">
                        <p className="font-semibold">{e.name} — {e.position}</p>
                        <p className="text-muted-foreground text-xs">{e.from} – {e.to}</p>
                        <p className="text-xs">Reason: {e.reasonForLeaving || "—"}</p>
                      </div>
                    ))}
                  </Section>
                )}

                {Array.isArray(selected.personal_references) && selected.personal_references.some((r: any) => r?.name) && (
                  <Section title="References">
                    {selected.personal_references.filter((r: any) => r?.name).map((r: any, i: number) => (
                      <div key={i} className="border-l-2 border-primary/40 pl-3 mb-3">
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.address}</p>
                        <p className="text-xs">{r.business} • Known {r.yearsKnown} years</p>
                      </div>
                    ))}
                  </Section>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-semibold text-base mb-2 text-primary">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">{children}</div>
  </div>
);

const Field = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="text-foreground">{value || "—"}</p>
  </div>
);
