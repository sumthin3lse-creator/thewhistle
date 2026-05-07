import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ADMIN_PIN = Deno.env.get("ADMIN_PIN");
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!ADMIN_PIN || !ADMIN_EMAIL) throw new Error("Admin PIN not configured");

    const { pin } = await req.json();
    if (!pin || String(pin) !== String(ADMIN_PIN)) {
      return new Response(JSON.stringify({ error: "Invalid PIN" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Generate a magiclink — we extract the token_hash so the client can verify it
    const { data, error } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: ADMIN_EMAIL,
    });
    if (error) throw error;

    const token_hash = (data?.properties as { hashed_token?: string } | undefined)?.hashed_token;
    if (!token_hash) throw new Error("Failed to issue session token");

    return new Response(
      JSON.stringify({ email: ADMIN_EMAIL, token_hash }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
