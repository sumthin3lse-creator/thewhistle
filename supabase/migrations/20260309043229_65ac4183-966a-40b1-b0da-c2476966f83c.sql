-- Create storage bucket for generated ad images
INSERT INTO storage.buckets (id, name, public)
VALUES ('ad-images', 'ad-images', true);

-- Allow authenticated users to upload to ad-images bucket
CREATE POLICY "Admins can upload ad images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'ad-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Allow public read access to ad images
CREATE POLICY "Public can view ad images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ad-images');