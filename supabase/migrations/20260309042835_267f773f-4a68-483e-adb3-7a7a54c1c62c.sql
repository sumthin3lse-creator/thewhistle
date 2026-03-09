-- Create table for storing generated social media ads
CREATE TABLE public.generated_ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL CHECK (platform IN ('instagram', 'facebook', 'tiktok', 'twitter')),
  ad_type text NOT NULL CHECK (ad_type IN ('promo', 'menu_highlight', 'seasonal', 'event', 'trending')),
  headline text NOT NULL,
  caption text NOT NULL,
  image_url text,
  hashtags text[],
  call_to_action text,
  menu_items_featured text[],
  ai_reasoning text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.generated_ads ENABLE ROW LEVEL SECURITY;

-- Only admins can manage ads
CREATE POLICY "Admins can manage all ads"
ON public.generated_ads
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_generated_ads_updated_at
  BEFORE UPDATE ON public.generated_ads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger for auto-creating profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();