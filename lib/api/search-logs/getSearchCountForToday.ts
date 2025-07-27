import { createClient } from "@/lib/supabase/component";

const supabase = createClient();

interface GetSearchCountForTodayReturnInterface {
  count: number;
  resetDateTimeUTC: Intl.DateTimeFormat;
  localResetTime: string;
}

export async function getSearchCountForToday(): Promise<GetSearchCountForTodayReturnInterface> {
  const {
    data: { count: todaySearchCount, resetDateTime },
    error,
  } = await supabase.functions.invoke("get-today-search-count");

  if (error) {
    throw error;
  }

  return {
    count: todaySearchCount ?? 0,
    resetDateTimeUTC: resetDateTime,
    localResetTime: getLocalResetCountTime(),
  };
}

function getLocalResetCountTime() {
  // 1. Create a Date object for today's UTC midnight
  const now = new Date();
  const utcMidnight = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );

  // 2. Format the time in the user's local time zone
  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // optional, change to false for 24-hour format
  });

  const localTime = formatter.format(utcMidnight);
  return localTime;
}
