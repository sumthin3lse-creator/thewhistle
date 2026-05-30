import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, ShieldOff, ArrowLeft, RefreshCw, Search } from "lucide-react";

interface UserRow {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
  isAdmin: boolean;
}

export default function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (!isAdmin) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      setCurrentUserId(user.id);
      await load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setLoading(true);
    const [{ data: profiles, error: pErr }, { data: roles, error: rErr }] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name, created_at").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
    ]);
    if (pErr || rErr) {
      toast({ title: "Failed to load users", description: pErr?.message || rErr?.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const adminSet = new Set((roles || []).map((r: { user_id: string }) => r.user_id));
    setUsers((profiles || []).map((p) => ({ ...p, isAdmin: adminSet.has(p.id) })) as UserRow[]);
    setLoading(false);
  };

  const grant = async (u: UserRow) => {
    setBusyId(u.id);
    const { error } = await supabase.from("user_roles").insert({ user_id: u.id, role: "admin" });
    if (error) {
      toast({ title: "Could not grant admin", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Admin granted", description: u.email || u.full_name || u.id });
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, isAdmin: true } : x)));
    }
    setBusyId(null);
  };

  const revoke = async (u: UserRow) => {
    if (u.id === currentUserId) {
      toast({ title: "Action blocked", description: "You can't revoke your own admin role.", variant: "destructive" });
      return;
    }
    if (!confirm(`Revoke admin from ${u.email || u.full_name || u.id}?`)) return;
    setBusyId(u.id);
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", u.id)
      .eq("role", "admin");
    if (error) {
      toast({ title: "Could not revoke admin", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Admin revoked", description: u.email || u.full_name || u.id });
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, isAdmin: false } : x)));
    }
    setBusyId(null);
  };

  const filtered = users.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (u.email || "").toLowerCase().includes(q) || (u.full_name || "").toLowerCase().includes(q);
  });

  return (
    <>
      <Helmet>
        <title>User Management | Admin — The Whistle Stop</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://thewhistlestopstuart.com/admin/users" />
      </Helmet>
      <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="font-display text-xl font-bold">User Management</h1>
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Manage admins</CardTitle>
            <CardDescription>
              Grant or revoke admin access. Users must sign up at <code>/admin/login</code> first
              before they appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No users found.</CardContent></Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((u) => (
              <Card key={u.id}>
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium truncate">{u.full_name || "(no name)"}</span>
                      {u.isAdmin && <Badge variant="default" className="gap-1"><ShieldCheck className="h-3 w-3" /> Admin</Badge>}
                      {u.id === currentUserId && <Badge variant="outline">You</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{u.email || u.id}</p>
                  </div>
                  <div className="shrink-0">
                    {u.isAdmin ? (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={busyId === u.id || u.id === currentUserId}
                        onClick={() => revoke(u)}
                      >
                        {busyId === u.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShieldOff className="h-4 w-4 mr-1" /> Revoke</>}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        disabled={busyId === u.id}
                        onClick={() => grant(u)}
                      >
                        {busyId === u.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShieldCheck className="h-4 w-4 mr-1" /> Make admin</>}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
    </>
  );
}
