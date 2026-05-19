// Curated imgbb photo library (album 9Gvs30).
// Keep in sync with supabase/functions/generate-ad/index.ts PHOTO_LIBRARY.
export interface LibraryPhoto {
  title: string;
  url: string;
  tags: string[];
}

export const PHOTO_LIBRARY: LibraryPhoto[] = [
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

export function findPhotoByUrl(url: string | null | undefined): LibraryPhoto | undefined {
  if (!url) return undefined;
  return PHOTO_LIBRARY.find((p) => p.url === url);
}
