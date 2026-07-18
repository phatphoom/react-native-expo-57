import { supabase } from "@/lib/supabase";

export async function getCategory() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
}
