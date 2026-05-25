import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// The Whistle Stop branding and menu data
const RESTAURANT_DATA = {
  name: "The Whistle Stop by Ariel Seafoods",
  tagline: "A Port Salerno tradition, elevated.",
  phone: "(772) 220-1020",
  address: "4920 SE Dixie Hwy, Stuart, FL 34997",
  email: "thewhistlestopstuart@gmail.com",
  website: "https://thewhistle.lovable.app",
  menuUrl: "https://thewhistlestop.menu/",
  doordashUrl: "https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/",
  hours: {
    weekdays: "7:00 AM - 3:00 PM",
    saturday: "8:00 AM - 2:00 PM",
    sunday: "Closed"
  },
  cuisineTypes: ["American", "Seafood", "Deli", "Sandwiches", "Breakfast"],
  signatureDishes: [
    {
      name: "The Train Wreck",
      description: "Crispy home fries topped with eggs, bacon, sausage, ham, peppers, onions, and smothered in cheese sauce. Our most famous dish."
    },
    {
      name: "Philly Cheesesteaks",
      description: "Legendary Beef Philly, Chicken Philly, or half & half — all loaded with melted cheese and grilled onions on a fresh hoagie roll."
    },
    {
      name: "The Uncle Pumpkin",
      description: "A towering double smash burger with crispy bacon, caramelized onions, melted American cheese, and a golden onion ring on top."
    },
    {
      name: "The Salerno Club",
      description: "Triple-decker club with turkey, ham, crispy bacon, lettuce, tomato, and mayo on toasted bread."
    },
    {
      name: "The Titanic",
      description: "Signature salad — a mountain of fresh tuna salad over crisp mixed greens with cucumbers, tomatoes."
    },
    {
      name: "Fresh Baked Sweets",
      description: "Cinnamon rolls, blueberry muffins, chocolate chip cookies, fudge brownies, and hand-scooped ice cream."
    }
  ],
  uniqueSellingPoints: [
    "Nearly two decades of authentic Philly comfort food",
    "Powered by premium supply chain of Ariel Seafoods",
    "Fresh ingredients made with love",
    "Local Stuart FL favorite",
    "Family-owned tradition"
  ]
};

// Curated real-world photo library hosted on imgbb (album: 9Gvs30).
// AI must pick from these — never generate images.
const PHOTO_LIBRARY: { title: string; url: string; tags: string[] }[] = [
  { title: "The Uncle Pumpkin", url: "https://i.ibb.co/CxTPTS8/The-Uncle-Pumpkin.png", tags: ["burger", "uncle pumpkin", "smash burger", "bacon", "onion ring"] },
  { title: "The Uncle Pumpkin (alt)", url: "https://i.ibb.co/YzfL0D3/The-Uncle-Pumpkin-2.png", tags: ["burger", "uncle pumpkin"] },
  { title: "The Train Wreck", url: "https://i.ibb.co/b5dhbb4J/The-Train-Wreck.png", tags: ["train wreck", "breakfast", "home fries", "eggs", "bacon", "sausage"] },
  { title: "Train Wreck (photo)", url: "https://i.ibb.co/20SgwYhH/Train-Wreck.jpg", tags: ["train wreck", "breakfast"] },
  { title: "Salads — The Titanic", url: "https://i.ibb.co/GfXx357h/Salads.jpg", tags: ["salad", "titanic", "tuna", "healthy", "greens"] },
  { title: "Philly Cheesesteaks", url: "https://i.ibb.co/KjQdrZ1k/Phillys.jpg", tags: ["philly", "cheesesteak", "sandwich", "beef", "chicken"] },
  { title: "Fresh Baked Sweets", url: "https://i.ibb.co/k2Ktzm16/Sweets.jpg", tags: ["sweets", "dessert", "cinnamon roll", "muffin", "cookie", "brownie", "ice cream"] },
  { title: "The Salerno Club", url: "https://i.ibb.co/3986r9sz/Salerno-Club.png", tags: ["club", "salerno", "sandwich", "turkey", "ham", "bacon"] },
  { title: "Whistle Stop Storefront 1", url: "https://i.ibb.co/DPS1cghn/20251226-094425-IMG-STYLE.jpg", tags: ["storefront", "exterior", "diner", "stuart"] },
  { title: "Whistle Stop Storefront 2", url: "https://i.ibb.co/NdtGvMvH/20251226-094406-IMG-STYLE.jpg", tags: ["storefront", "exterior"] },
  { title: "Whistle Stop Interior 1", url: "https://i.ibb.co/1fWBhKxw/20251226-094311-IMG-STYLE.jpg", tags: ["interior", "diner", "rustic"] },
  { title: "Whistle Stop Interior 2", url: "https://i.ibb.co/gZs09TD2/20251226-094336-IMG-STYLE.jpg", tags: ["interior", "diner"] },
  { title: "Food Spread 1", url: "https://i.ibb.co/84rYVcHv/1766830983687.png", tags: ["food", "spread", "menu"] },
  { title: "Food Spread 2", url: "https://i.ibb.co/4ggWpdng/1766576070028-1.png", tags: ["food", "spread"] },
  { title: "Food Spread 3", url: "https://i.ibb.co/v4dY7Wdj/1766575756820.png", tags: ["food", "spread"] },
  { title: "Branded Photo 1", url: "https://i.ibb.co/Ld6syvpZ/Copy-of-1767528845674.avif", tags: ["branded", "promo"] },
  { title: "Branded Photo 2", url: "https://i.ibb.co/1GzB6cC5/Copy-of-1767528844604.avif", tags: ["branded", "promo"] },
  { title: "Branded Photo 3", url: "https://i.ibb.co/TB2d8sTP/Copy-of-1767528629267.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 4", url: "https://i.ibb.co/LzcNYLcF/Copy-of-1767528118231.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 5", url: "https://i.ibb.co/XZsYYPmM/Copy-of-1767527433314.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 6", url: "https://i.ibb.co/3yZXwv27/Copy-of-1767527335740.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 7", url: "https://i.ibb.co/Q7Bq2TQJ/Copy-of-1767527279645.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 8", url: "https://i.ibb.co/ynQtHMH3/Copy-of-1767527013006.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 9", url: "https://i.ibb.co/CK8wWyxt/Copy-of-1767526936940.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 10", url: "https://i.ibb.co/JW15HVKk/Copy-of-1767526873725.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 11", url: "https://i.ibb.co/TM42grhT/Copy-of-1767526793913.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 12", url: "https://i.ibb.co/8DhC1bY4/Copy-of-1767526726058.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 13", url: "https://i.ibb.co/kVzzRNmV/Copy-of-1767526620985.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 14", url: "https://i.ibb.co/Fqxq0MX5/Copy-of-1767526556042.png", tags: ["branded", "promo"] },
  { title: "Branded Photo 15", url: "https://i.ibb.co/xKpXy5n0/Copy-of-1767526456450.png", tags: ["branded", "promo"] },
];

function pickPhotoByTitle(title: string | undefined): string {
  if (title) {
    const exact = PHOTO_LIBRARY.find(p => p.title.toLowerCase() === title.toLowerCase());
    if (exact) return exact.url;
    const partial = PHOTO_LIBRARY.find(p => p.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(p.title.toLowerCase()));
    if (partial) return partial.url;
  }
  return PHOTO_LIBRARY[Math.floor(Math.random() * PHOTO_LIBRARY.length)].url;
}

const PLATFORM_SPECS = {
  instagram: {
    maxCaptionLength: 2200,
    hashtagLimit: 30,
    style: "Visual-first, lifestyle-focused, use emojis moderately, engaging storytelling",
    imageSize: "1080x1080"
  },
  facebook: {
    maxCaptionLength: 63206,
    hashtagLimit: 10,
    style: "Community-focused, informative, can be longer-form, shareable content",
    imageSize: "1200x630"
  },
  tiktok: {
    maxCaptionLength: 2200,
    hashtagLimit: 5,
    style: "Trendy, casual, fun, use current slang appropriately, hook in first line",
    imageSize: "1080x1920"
  },
  twitter: {
    maxCaptionLength: 280,
    hashtagLimit: 3,
    style: "Punchy, witty, concise, conversational",
    imageSize: "1200x675"
  }
};

// Helper to decode base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Verify user is admin
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    
    // Service role client for storage uploads
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { data: roleData } = await supabase.rpc("has_role", {
      _user_id: user.id,
      _role: "admin"
    });

    if (!roleData) {
      throw new Error("Admin access required");
    }

    const { platform, adType, customPrompt, regenerateImageOnly, adId, existingHeadline, existingCaption } = await req.json();

    if (!platform || !PLATFORM_SPECS[platform as keyof typeof PLATFORM_SPECS]) {
      throw new Error("Invalid platform. Must be: instagram, facebook, tiktok, or twitter");
    }

    const platformSpec = PLATFORM_SPECS[platform as keyof typeof PLATFORM_SPECS];

    // Handle image-only regeneration: rotate to a different photo from the library
    if (regenerateImageOnly && adId) {
      console.log("Rotating photo for ad:", adId);

      // Ask AI to pick the best matching photo title for this ad
      const photoList = PHOTO_LIBRARY.map(p => `- ${p.title} [tags: ${p.tags.join(", ")}]`).join("\n");
      const pickRequest = `Restaurant ad headline: "${existingHeadline}"
Caption: "${existingCaption}"

Pick the SINGLE best matching photo title from this library that visually represents the ad. Reply with ONLY the exact title, nothing else.

${photoList}`;

      const pickResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "user", content: pickRequest }],
          temperature: 0.9,
        }),
      });

      let pickedTitle = "";
      if (pickResp.ok) {
        const r = await pickResp.json();
        pickedTitle = (r.choices?.[0]?.message?.content || "").trim().replace(/^["']|["']$/g, "");
      }
      const imageUrl = pickPhotoByTitle(pickedTitle);
      const matchedPhoto = PHOTO_LIBRARY.find(p => p.url === imageUrl);
      const finalTitle = matchedPhoto?.title ?? pickedTitle;

      const { data: updatedAd, error: updateError } = await supabase
        .from("generated_ads")
        .update({ image_url: imageUrl, selected_photo_title: finalTitle, updated_at: new Date().toISOString() })
        .eq("id", adId)
        .select()
        .single();

      if (updateError) {
        throw new Error("Failed to update ad with new image");
      }

      return new Response(JSON.stringify({ success: true, ad: updatedAd, imageOnly: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are a creative social media marketing expert for ${RESTAURANT_DATA.name}, a beloved local restaurant in Stuart, Florida. 

RESTAURANT INFORMATION:
- Name: ${RESTAURANT_DATA.name}
- Tagline: ${RESTAURANT_DATA.tagline}
- Phone: ${RESTAURANT_DATA.phone}
- Address: ${RESTAURANT_DATA.address}
- Website: ${RESTAURANT_DATA.website}
- Order Online: ${RESTAURANT_DATA.doordashUrl}
- Hours: Mon-Fri ${RESTAURANT_DATA.hours.weekdays}, Sat ${RESTAURANT_DATA.hours.saturday}, Sun ${RESTAURANT_DATA.hours.sunday}

SIGNATURE DISHES:
${RESTAURANT_DATA.signatureDishes.map(d => `- ${d.name}: ${d.description}`).join('\n')}

UNIQUE SELLING POINTS:
${RESTAURANT_DATA.uniqueSellingPoints.map(p => `- ${p}`).join('\n')}

You must create ads that feel authentic, local, and appetizing. Always incorporate the restaurant's branding and contact information naturally.`;

    const adTypePrompts: Record<string, string> = {
      promo: "Create a promotional ad for a special deal or discount. Make it urgent and compelling.",
      menu_highlight: "Highlight one of the signature dishes. Make viewers hungry and wanting to visit.",
      seasonal: "Create a seasonal or holiday-themed ad that connects the restaurant to the current time of year.",
      event: "Promote a special event, new menu item launch, or community involvement.",
      trending: "Create a trendy, viral-style ad that could catch attention on social media feeds."
    };

    const userPrompt = `Create a ${platform.toUpperCase()} ad for ${RESTAURANT_DATA.name}.

AD TYPE: ${adType} - ${adTypePrompts[adType] || adTypePrompts.menu_highlight}

PLATFORM REQUIREMENTS:
- Style: ${platformSpec.style}
- Max caption length: ${platformSpec.maxCaptionLength} characters
- Max hashtags: ${platformSpec.hashtagLimit}

${customPrompt ? `ADDITIONAL INSTRUCTIONS: ${customPrompt}` : ''}

AVAILABLE REAL PHOTOS (you MUST pick one — never invent a title):
${PHOTO_LIBRARY.map(p => `- ${p.title} [tags: ${p.tags.join(", ")}]`).join("\n")}

Respond with a JSON object containing:
{
  "headline": "A catchy headline (max 60 chars)",
  "caption": "The full ad caption with natural line breaks",
  "hashtags": ["array", "of", "relevant", "hashtags"],
  "callToAction": "A clear call to action",
  "menuItemsFeatured": ["Array of menu items mentioned"],
  "selectedPhotoTitle": "EXACT title from the AVAILABLE REAL PHOTOS list above that best visually matches this ad",
  "reasoning": "Brief explanation of why this ad would perform well and why this photo was chosen"
}`;

    console.log("Generating ad copy...");
    
    // Step 1: Generate ad copy
    const copyResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!copyResponse.ok) {
      if (copyResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (copyResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await copyResponse.text();
      console.error("AI Gateway error:", copyResponse.status, errorText);
      throw new Error(`AI Gateway error: ${copyResponse.status}`);
    }

    const aiResponse = await copyResponse.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from response
    let adData;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      adData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Step 2: Pick the best matching real photo from the imgbb library
    const imageUrl: string = pickPhotoByTitle(adData.selectedPhotoTitle);
    const matchedPhoto = PHOTO_LIBRARY.find(p => p.url === imageUrl);
    const finalPhotoTitle: string = matchedPhoto?.title ?? adData.selectedPhotoTitle ?? "";
    console.log("Selected photo:", finalPhotoTitle, "->", imageUrl);

    // Step 3: Save to database
    const { data: savedAd, error: saveError } = await supabase
      .from("generated_ads")
      .insert({
        platform,
        ad_type: adType,
        headline: adData.headline,
        caption: adData.caption,
        hashtags: adData.hashtags,
        call_to_action: adData.callToAction,
        menu_items_featured: adData.menuItemsFeatured,
        ai_reasoning: adData.reasoning,
        image_url: imageUrl,
        selected_photo_title: finalPhotoTitle,
        created_by: user.id,
        status: "draft"
      })
      .select()
      .single();

    if (saveError) {
      console.error("Save error:", saveError);
      throw new Error("Failed to save generated ad");
    }

    return new Response(JSON.stringify({
      success: true,
      ad: savedAd,
      selectedPhoto: adData.selectedPhotoTitle
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error generating ad:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
