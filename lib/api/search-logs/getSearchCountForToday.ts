import { createClient } from "@/lib/supabase/component";

const supabase = createClient();

export async function getSearchCountForToday(): Promise<number> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  const { count, error } = await supabase
    .from("user_search_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id)
    .gte("created_at", startOfToday.toISOString())
    .lt("created_at", endOfToday.toISOString());

  if (error) {
    throw error;
  }

  return count ?? 0;
}
