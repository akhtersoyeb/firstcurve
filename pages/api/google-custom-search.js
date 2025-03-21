export default async function handler(req, res) {
  // Check if the request method is not POST
  if (req.method !== "POST") {
    // Return 405 Method Not Allowed if the request is not a POST
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only POST requests are accepted on this endpoint",
    })
  }

  try {
    // Process the POST request data
    const data = req.body
    console.log("data: ", data)
    if (!data?.query) {
      return res.status(400).json({
        error: "Validation error",
        message:
          'Missing fields in the request body. Please provide "query" in the request body.',
      })
    }

    const searchUrl = new URL("https://www.googleapis.com/customsearch/v1")
    searchUrl.searchParams.append("key", process.env.GOOGLE_SEARCH_API_KEY)
    searchUrl.searchParams.append(
      "cx",
      process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID
    )
    searchUrl.searchParams.append("q", data.query)
    searchUrl.searchParams.append("num", "10")
    searchUrl.searchParams.append("start", "1")
    console.log(searchUrl.toString())
    // Make request to Google Search API
    const searchResponse = await fetch(searchUrl.toString())
    const searchData = await searchResponse.json()

    if (searchResponse.ok) {
      return res.status(200).json({
        success: true,
        message: "Success",
        data: searchData,
      })
    } else {
      return res.status(500).json({
        error: searchData?.error?.message || "Failed to perform search",
        message: "An error occurred while processing your request",
      })
    }
  } catch (error) {
    // Error handling
    console.error("API Error:", error)
    return res.status(500).json({
      error: "Internal server error",
      message: "An error occurred while processing your request",
    })
  }
}
