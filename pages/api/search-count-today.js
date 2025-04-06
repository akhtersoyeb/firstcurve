import createClient from "@/lib/supabase/api"

export default async function handler(req, res) {
  // Check if the request method is not POST
  if (req.method !== "GET") {
    // Return 405 Method Not Allowed if the request is not a POST
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only GET requests are accepted on this endpoint",
    })
  }

  try {
    // Process the POST request data
    const data = req.body
    const supabase = createClient(req, res)


    // First, try to get the user's current usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISOString = today.toISOString();
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Count today's searches for this user
    const { count, error: countError } = await supabase
      .from('google_searches')
      .select('id', { count: 'exact' })
      .eq('user_id', user.id)
      .gte('created_at', todayISOString);

      if (countError) {
        console.error('Error counting searches:', countError);
        throw countError;
      }
      return res.status(200).json({
        success: true,
        message: "Success",
        data: count,
      })

  } catch (error) {
    // Error handling
    console.error("API Error:", error)
    return res.status(500).json({
      error: "Internal server error",
      message: "An error occurred while processing your request",
    })
  }
}
