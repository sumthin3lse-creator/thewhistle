ALTER TABLE public.generated_ads
  ADD COLUMN IF NOT EXISTS original_image_url text,
  ADD COLUMN IF NOT EXISTS original_photo_title text;

-- Backfill existing rows: assume the current image is the AI's original choice
UPDATE public.generated_ads
SET original_image_url = image_url,
    original_photo_title = selected_photo_title
WHERE original_image_url IS NULL;