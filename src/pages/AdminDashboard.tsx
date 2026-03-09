import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Sparkles, 
  Instagram, 
  Facebook, 
  Twitter, 
  LogOut,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  ImageIcon,
  Download
} from "lucide-react";
import logo from "@/assets/restaurant-logo.png";

type Platform = "instagram" | "facebook" | "tiktok" | "twitter";
type AdType = "promo" | "menu_highlight" | "seasonal" | "event" | "trending";
type AdStatus = "draft" | "approved" | "published" | "archived";

interface GeneratedAd {
  id: string;
  platform: Platform;
  ad_type: AdType;
  headline: string;
  caption: string;
  hashtags: string[];
  call_to_action: string;
  menu_items_featured: string[];
  ai_reasoning: string;
  status: AdStatus;
  created_at: string;
  image_url: string | null;
}

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Instagram className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  tiktok: <span className="font-bold text-sm">TT</span>,
  twitter: <Twitter className="h-4 w-4" />,
};

const platformColors: Record<Platform, string> = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  facebook: "bg-blue-600",
  tiktok: "bg-black",
  twitter: "bg-sky-500",
};

const adTypeLabels: Record<AdType, string> = {
  promo: "Promotional",
  menu_highlight: "Menu Highlight",
  seasonal: "Seasonal",
  event: "Event",
  trending: "Trending",
};

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [ads, setAds] = useState<GeneratedAd[]>([]);
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [adType, setAdType] = useState<AdType>("menu_highlight");
  const [customPrompt, setCustomPrompt] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadAds();
  }, []);

  const checkAuth = async () => {
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
    }
  };

  const loadAds = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("generated_ads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading ads:", error);
    } else {
      setAds((data || []) as GeneratedAd[]);
    }
    setIsLoading(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ad`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            platform,
            adType,
            customPrompt: customPrompt.trim() || undefined,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate ad");
      }

      toast({
        title: "Ad Generated!",
        description: `New ${platform} ${adTypeLabels[adType]} ad created successfully.`,
      });

      loadAds();
      setCustomPrompt("");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Generation failed";
      toast({
        title: "Generation Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (ad: GeneratedAd) => {
    const text = `${ad.caption}\n\n${ad.hashtags.map(h => `#${h}`).join(" ")}`;
    await navigator.clipboard.writeText(text);
    setCopiedId(ad.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Copied!", description: "Ad caption copied to clipboard" });
  };

  const updateStatus = async (id: string, status: AdStatus) => {
    const { error } = await supabase
      .from("generated_ads")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      loadAds();
    }
  };

  const deleteAd = async (id: string) => {
    const { error } = await supabase
      .from("generated_ads")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete ad", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Ad removed successfully" });
      loadAds();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="The Whistle Stop" className="h-10 w-auto" />
            <div>
              <h1 className="font-display text-xl font-bold">Ad Generator</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Generate New Ad
                </CardTitle>
                <CardDescription>
                  AI will create viral-worthy ads with your branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4" /> Instagram
                        </div>
                      </SelectItem>
                      <SelectItem value="facebook">
                        <div className="flex items-center gap-2">
                          <Facebook className="h-4 w-4" /> Facebook
                        </div>
                      </SelectItem>
                      <SelectItem value="tiktok">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">TT</span> TikTok
                        </div>
                      </SelectItem>
                      <SelectItem value="twitter">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4" /> X (Twitter)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ad Type</Label>
                  <Select value={adType} onValueChange={(v) => setAdType(v as AdType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menu_highlight">Menu Highlight</SelectItem>
                      <SelectItem value="promo">Promotional</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="trending">Trending/Viral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Custom Instructions (Optional)</Label>
                  <Textarea
                    placeholder="e.g., Focus on the Train Wreck breakfast, mention weekend hours..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating ad & image...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Ad + Image
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  AI generates caption + image with your branding embedded
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ads List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Generated Ads</h2>
              <Button variant="outline" size="sm" onClick={loadAds} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
              </TabsList>

              {["all", "draft", "approved", "published"].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : ads.filter(ad => tab === "all" || ad.status === tab).length === 0 ? (
                    <Card className="py-12">
                      <CardContent className="text-center text-muted-foreground">
                        No ads found. Generate your first ad!
                      </CardContent>
                    </Card>
                  ) : (
                    ads
                      .filter(ad => tab === "all" || ad.status === tab)
                      .map((ad) => (
                        <Card key={ad.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className={`w-full md:w-1.5 h-1.5 md:h-auto ${platformColors[ad.platform]}`} />
                            
                            {/* Image Section */}
                            {ad.image_url ? (
                              <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 bg-muted relative group">
                                <img 
                                  src={ad.image_url} 
                                  alt={ad.headline}
                                  className="w-full h-full object-cover"
                                />
                                <a
                                  href={ad.image_url}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="absolute bottom-2 right-2 p-2 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Download className="h-4 w-4 text-white" />
                                </a>
                              </div>
                            ) : (
                              <div className="hidden md:flex w-48 h-auto flex-shrink-0 bg-muted items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                              </div>
                            )}
                            
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded ${platformColors[ad.platform]} text-white`}>
                                    {platformIcons[ad.platform]}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{ad.headline}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {adTypeLabels[ad.ad_type]} • {new Date(ad.created_at).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <Badge variant={
                                  ad.status === "published" ? "default" :
                                  ad.status === "approved" ? "secondary" : "outline"
                                }>
                                  {ad.status}
                                </Badge>
                              </div>

                              <p className="text-sm mb-4 whitespace-pre-wrap line-clamp-4">{ad.caption}</p>

                              {ad.hashtags && ad.hashtags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {ad.hashtags.slice(0, 8).map((tag, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      #{tag}
                                    </Badge>
                                  ))}
                                  {ad.hashtags.length > 8 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{ad.hashtags.length - 8} more
                                    </Badge>
                                  )}
                                </div>
                              )}

                              {ad.ai_reasoning && (
                                <p className="text-xs text-muted-foreground italic mb-4">
                                  💡 {ad.ai_reasoning}
                                </p>
                              )}

                              <div className="flex items-center gap-2 flex-wrap">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyToClipboard(ad)}
                                >
                                  {copiedId === ad.id ? (
                                    <Check className="h-4 w-4 mr-1" />
                                  ) : (
                                    <Copy className="h-4 w-4 mr-1" />
                                  )}
                                  Copy
                                </Button>
                                {ad.image_url && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    asChild
                                  >
                                    <a href={ad.image_url} download target="_blank" rel="noopener noreferrer">
                                      <Download className="h-4 w-4 mr-1" />
                                      Image
                                    </a>
                                  </Button>
                                )}
                                {ad.status === "draft" && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => updateStatus(ad.id, "approved")}
                                  >
                                    Approve
                                  </Button>
                                )}
                                {ad.status === "approved" && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateStatus(ad.id, "published")}
                                  >
                                    Mark Published
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => deleteAd(ad.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
