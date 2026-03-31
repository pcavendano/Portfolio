-- Consulting Booking System
-- Run this in Supabase SQL Editor after creating your project

-- ============================================
-- Table: consulting_settings (single-row config)
-- ============================================
CREATE TABLE consulting_settings (
  id int4 PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  price_cents int4 NOT NULL DEFAULT 15000,
  currency text NOT NULL DEFAULT 'usd',
  session_duration_min int4 NOT NULL DEFAULT 60,
  description text NOT NULL DEFAULT 'One-on-one consulting session. SuiteScript, NetSuite integrations, React architecture, or general JavaScript development.',
  available_days int2[] NOT NULL DEFAULT '{1,2,3,4,5}',
  available_start_hour int2 NOT NULL DEFAULT 9,
  available_end_hour int2 NOT NULL DEFAULT 17,
  timezone text NOT NULL DEFAULT 'America/Montreal',
  booking_enabled bool NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Insert default settings row
INSERT INTO consulting_settings (id) VALUES (1);

-- ============================================
-- Table: bookings
-- ============================================
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_email text NOT NULL,
  details text NOT NULL DEFAULT '',
  requested_date date NOT NULL,
  requested_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'paid', 'completed', 'cancelled')),
  price_cents int4 NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  payment_status text NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  admin_notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Prevent double-booking the same slot (only for active bookings)
CREATE UNIQUE INDEX idx_bookings_unique_slot
  ON bookings (requested_date, requested_time)
  WHERE status NOT IN ('rejected', 'cancelled');

-- Index for common queries
CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_date ON bookings (requested_date);

-- ============================================
-- Table: blocked_dates
-- ============================================
CREATE TABLE blocked_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  reason text NOT NULL DEFAULT ''
);

-- ============================================
-- Auto-update updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_settings_updated_at
  BEFORE UPDATE ON consulting_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================

-- Enable RLS on all tables
ALTER TABLE consulting_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- consulting_settings: anyone can read, only service_role can write
CREATE POLICY "Public can read settings"
  ON consulting_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- bookings: anyone can insert (submit a booking)
CREATE POLICY "Public can submit bookings"
  ON bookings FOR INSERT
  TO anon
  WITH CHECK (true);

-- bookings: public can read only date/time/status (for calendar availability)
-- Full access only via service_role (edge functions)
CREATE POLICY "Public can read slot availability"
  ON bookings FOR SELECT
  TO anon
  USING (true);

-- blocked_dates: anyone can read
CREATE POLICY "Public can read blocked dates"
  ON blocked_dates FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role bypasses RLS automatically, so no policies needed for admin operations
