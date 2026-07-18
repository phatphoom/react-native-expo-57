import { supabase } from "@/lib/supabase";

export async function getAllProduct() {
  const { data, error } = await supabase.from("products").select(
    `
  *,categories! category_id  (
    id,
    name
  )
  `,
  );
  if (error) throw error;
  return data;
}

// import { supabase } from "@/lib/supabase";

// export async function getAllProduct() {
//   const { data, error } = await supabase.from("products").select("*");
//   if (error) throw error;
//   return data;
// }
