
-- 1. Fix PUBLIC_DATA_EXPOSURE: Restrict orders SELECT to admins only
DROP POLICY "Anyone can view orders" ON public.orders;
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Restrict order_items SELECT to admins only
DROP POLICY "Anyone can view order items" ON public.order_items;
CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Fix MISSING_RLS: Remove open INSERT policies (RPC will handle inserts)
DROP POLICY "Anyone can create orders" ON public.orders;
DROP POLICY "Anyone can create order items" ON public.order_items;

-- 3. Fix INPUT_VALIDATION: Create validated order RPC with server-side checks
CREATE OR REPLACE FUNCTION public.create_validated_order(
  _customer_name TEXT,
  _customer_phone TEXT,
  _customer_email TEXT DEFAULT NULL,
  _pickup_time TIMESTAMPTZ DEFAULT NULL,
  _special_instructions TEXT DEFAULT NULL,
  _items JSONB DEFAULT '[]'::JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _order_id UUID;
  _total NUMERIC := 0;
  _item JSONB;
  _item_name TEXT;
  _item_price NUMERIC;
  _item_qty INTEGER;
BEGIN
  -- Validate customer name
  IF _customer_name IS NULL OR length(trim(_customer_name)) < 1 OR length(trim(_customer_name)) > 100 THEN
    RAISE EXCEPTION 'Customer name must be between 1 and 100 characters';
  END IF;

  -- Validate phone (digits only, 10-15 chars after stripping non-digits)
  IF _customer_phone IS NULL OR length(regexp_replace(_customer_phone, '\D', '', 'g')) < 7 OR length(regexp_replace(_customer_phone, '\D', '', 'g')) > 15 THEN
    RAISE EXCEPTION 'Invalid phone number';
  END IF;

  -- Validate email if provided
  IF _customer_email IS NOT NULL AND trim(_customer_email) != '' AND _customer_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Normalize empty email to null
  IF _customer_email IS NOT NULL AND trim(_customer_email) = '' THEN
    _customer_email := NULL;
  END IF;

  -- Validate pickup time
  IF _pickup_time IS NULL THEN
    RAISE EXCEPTION 'Pickup time is required';
  END IF;

  -- Validate special instructions length
  IF _special_instructions IS NOT NULL AND length(_special_instructions) > 500 THEN
    RAISE EXCEPTION 'Special instructions must be under 500 characters';
  END IF;

  -- Validate items
  IF _items IS NULL OR jsonb_array_length(_items) = 0 THEN
    RAISE EXCEPTION 'Order must contain at least one item';
  END IF;

  IF jsonb_array_length(_items) > 50 THEN
    RAISE EXCEPTION 'Too many items in order';
  END IF;

  -- Calculate total server-side
  FOR _item IN SELECT * FROM jsonb_array_elements(_items)
  LOOP
    _item_name := _item->>'name';
    _item_price := (_item->>'price')::NUMERIC;
    _item_qty := COALESCE((_item->>'quantity')::INTEGER, 1);

    IF _item_name IS NULL OR length(trim(_item_name)) < 1 OR length(trim(_item_name)) > 200 THEN
      RAISE EXCEPTION 'Invalid item name';
    END IF;

    IF _item_price IS NULL OR _item_price < 0 OR _item_price > 10000 THEN
      RAISE EXCEPTION 'Invalid item price';
    END IF;

    IF _item_qty < 1 OR _item_qty > 100 THEN
      RAISE EXCEPTION 'Invalid item quantity';
    END IF;

    _total := _total + (_item_price * _item_qty);
  END LOOP;

  -- Insert order
  INSERT INTO orders (
    customer_name, customer_phone, customer_email,
    pickup_time, special_instructions, total_amount
  )
  VALUES (
    trim(_customer_name), trim(_customer_phone), _customer_email,
    _pickup_time, NULLIF(trim(COALESCE(_special_instructions, '')), ''), _total
  )
  RETURNING id INTO _order_id;

  -- Insert order items
  INSERT INTO order_items (order_id, item_name, item_price, quantity)
  SELECT
    _order_id,
    trim(item->>'name'),
    (item->>'price')::NUMERIC,
    COALESCE((item->>'quantity')::INTEGER, 1)
  FROM jsonb_array_elements(_items) AS item;

  RETURN jsonb_build_object('order_id', _order_id, 'total', _total);
END;
$$;

-- Grant execute to anonymous and authenticated users (guest checkout supported)
GRANT EXECUTE ON FUNCTION public.create_validated_order TO anon;
GRANT EXECUTE ON FUNCTION public.create_validated_order TO authenticated;
