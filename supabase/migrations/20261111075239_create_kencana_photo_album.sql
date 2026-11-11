/*
# Create kencana_photo_album table (single-tenant, no auth)

1. Plain-English summary
   The Kencana Lawang 2026 photo documentation app currently stores its photo
   album in a local file / browser localStorage, which does not sync to the
   published site. This migration creates a shared cloud table so every
   device (preview AND published site) sees the same album.

2. New Tables
   - `kencana_photo_album`
     - `id` (uuid, primary key, auto-generated)
     - `photo_id` (text, unique, not null) — the app-level photo id, stored as text to support both numeric and string ids
     - `title` (text, not null)
     - `category` (text, not null) — one of: simulasi, mitigasi, posko, respons, inovasi
     - `url` (text, not null)
     - `desc` (text, not null, default '')
     - `date` (text, nullable)
     - `location` (text, nullable)
     - `photographer` (text, nullable)
     - `sort_order` (integer, default 0) — preserves album ordering
     - `created_at` (timestamp with time zone, default now())

3. Modified Tables
   - None.

4. Security
   - Enable Row Level Security (RLS) on `kencana_photo_album`.
   - This is a single-tenant, no-sign-in app where the album is intentionally
     shared/public: all policies target `anon` + `authenticated` and allow
     full CRUD using `USING (true)` / `WITH CHECK (true)`, which is the
     documented acceptable use for intentionally shared data.
   - Grants: SELECT/INSERT/UPDATE/DELETE to `anon` and `authenticated` only.
*/

CREATE TABLE IF NOT EXISTS kencana_photo_album (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  url text NOT NULL,
  "desc" text NOT NULL DEFAULT '',
  date text,
  location text,
  photographer text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE kencana_photo_album ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON kencana_photo_album TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_photo_album" ON kencana_photo_album;
CREATE POLICY "anon_select_photo_album" ON kencana_photo_album
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_photo_album" ON kencana_photo_album;
CREATE POLICY "anon_insert_photo_album" ON kencana_photo_album
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_photo_album" ON kencana_photo_album;
CREATE POLICY "anon_update_photo_album" ON kencana_photo_album
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_photo_album" ON kencana_photo_album;
CREATE POLICY "anon_delete_photo_album" ON kencana_photo_album
FOR DELETE TO anon, authenticated USING (true);
