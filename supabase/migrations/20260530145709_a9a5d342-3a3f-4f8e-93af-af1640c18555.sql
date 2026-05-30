
-- Allow users to read their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Lock down has_role: revoke from anon/public, keep for authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Storage policies for ad-images bucket: admin-only UPDATE/DELETE
CREATE POLICY "Admins can update ad images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ad-images' AND public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'ad-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete ad images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'ad-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));
