import { createClient } from "@supabase/supabase-js";

const options = {
  schema: "public",
  headers: { "x-my-custom-header": "my-app-name" },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://snrxmggiuferssrzuzwh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucnhtZ2dpdWZlcnNzcnp1endoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3ODk3MTQsImV4cCI6MTk3NTM2NTcxNH0.d-TbYaOUZJGqUWZGCj4YYp5JNUi4wCt1C2oUPSTkV7I"
);
