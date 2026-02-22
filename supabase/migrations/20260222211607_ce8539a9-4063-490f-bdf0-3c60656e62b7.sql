
-- Drop order_items table (depends on orders)
DROP TABLE IF EXISTS public.order_items CASCADE;

-- Drop orders table
DROP TABLE IF EXISTS public.orders CASCADE;

-- Drop the create_validated_order function
DROP FUNCTION IF EXISTS public.create_validated_order;

-- Drop the order_status enum
DROP TYPE IF EXISTS public.order_status CASCADE;
