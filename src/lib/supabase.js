import { createClient } from "@supabase/supabase-js";

const options = {
  schema: "public",
  headers: { "x-my-custom-header": "my-app-name" },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const projectUrl = process.env.SUPABASE_URL;
const publicAnonKey = process.env.SUPABASE_PUBLIC_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(projectUrl, publicAnonKey);
