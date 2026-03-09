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

    const { platform, adType, customPrompt } = await req.json();

    if (!platform || !PLATFORM_SPECS[platform as keyof typeof PLATFORM_SPECS]) {
      throw new Error("Invalid platform. Must be: instagram, facebook, tiktok, or twitter");
    }

    const platformSpec = PLATFORM_SPECS[platform as keyof typeof PLATFORM_SPECS];

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

Respond with a JSON object containing:
{
  "headline": "A catchy headline (max 60 chars)",
  "caption": "The full ad caption with natural line breaks",
  "hashtags": ["array", "of", "relevant", "hashtags"],
  "callToAction": "A clear call to action",
  "menuItemsFeatured": ["Array of menu items mentioned"],
  "imagePrompt": "A detailed, vivid description for generating an appetizing food photography ad image. Include: specific dish details, plating style, lighting (warm/natural), background (rustic wood, marble, etc), props, camera angle, mood. Make it mouth-watering.",
  "reasoning": "Brief explanation of why this ad would perform well"
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

    console.log("Generating ad image...");

    // Step 2: Generate image using the image prompt
    const imagePrompt = `Professional food photography advertisement for a restaurant called "The Whistle Stop". ${adData.imagePrompt}. 
Style: High-end food photography, appetizing, warm lighting, shallow depth of field. 
Include subtle text overlay: "${adData.headline}" in a modern sans-serif font.
Do NOT include any phone numbers, addresses, or URLs in the image.
Make it look like a professional social media ad that would stop someone scrolling.`;

    let imageUrl: string | null = null;

    try {
      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            {
              role: "user",
              content: imagePrompt
            }
          ],
          modalities: ["image", "text"]
        }),
      });

      if (imageResponse.ok) {
        const imageResult = await imageResponse.json();
        const generatedImage = imageResult.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (generatedImage && generatedImage.startsWith("data:image/")) {
          console.log("Image generated, uploading to storage...");
          
          // Extract base64 data
          const base64Match = generatedImage.match(/^data:image\/(\w+);base64,(.+)$/);
          if (base64Match) {
            const imageFormat = base64Match[1];
            const base64Data = base64Match[2];
            const imageBytes = base64ToUint8Array(base64Data);
            
            // Upload to storage
            const fileName = `${platform}-${adType}-${Date.now()}.${imageFormat}`;
            const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
              .from("ad-images")
              .upload(fileName, imageBytes, {
                contentType: `image/${imageFormat}`,
                upsert: false
              });

            if (uploadError) {
              console.error("Upload error:", uploadError);
            } else {
              // Get public URL
              const { data: urlData } = supabaseAdmin.storage
                .from("ad-images")
                .getPublicUrl(fileName);
              
              imageUrl = urlData.publicUrl;
              console.log("Image uploaded:", imageUrl);
            }
          }
        }
      } else {
        console.error("Image generation failed:", imageResponse.status);
      }
    } catch (imgError) {
      console.error("Image generation error:", imgError);
      // Continue without image - not a fatal error
    }

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
      imagePrompt: adData.imagePrompt
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
