import { supabase } from "@/lib/supabase";

export async function getProduct() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
}

export async function getCategory() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
}
