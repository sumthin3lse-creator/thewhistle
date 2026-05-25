CREATE TABLE public.ad_photo_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id UUID NOT NULL,
  changed_by UUID,
  changed_by_email TEXT,
  previous_image_url TEXT,
  previous_photo_title TEXT,
  new_image_url TEXT,
  new_photo_title TEXT,
  source TEXT NOT NULL DEFAULT 'manual_override',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_ad_photo_audit_log_ad_id ON public.ad_photo_audit_log(ad_id);
CREATE INDEX idx_ad_photo_audit_log_created_at ON public.ad_photo_audit_log(created_at DESC);

ALTER TABLE public.ad_photo_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit log"
ON public.ad_photo_audit_log
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert audit log"
ON public.ad_photo_audit_log
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND (changed_by IS NULL OR changed_by = auth.uid()));