import { GoogleGenerativeAI } from "@google/generative-ai"

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
    if (!data?.name || !data?.description) {
      return res.status(400).json({
        error: "Validation error",
        message:
          'Missing fields in the request body. Please provide "name" and "description" fields.',
      })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `Generate 50 unique search queries to find organic promotion opportunities for my startup.
    
    Startup Name: ${data?.name}
    Description: ${data?.description}
    
    The search queries should:
    1. Target communities where our target audience might be discussing related problems
    2. Be specific enough to find relevant discussions but not too narrow
    3. Focus on finding posts where people are asking for solutions to problems our startup solves
    4. Be phrased naturally as someone might search
    5. DO NOT include the word 'reddit' in the queries as these will only search on reddit
    6. Each query should be different from others to maximize diversity of results
    7. Include keywords related to the problem our startup solves
    8. DO NOT include quotes or special search operators
    
    Format the response as a JSON array of strings like: ["query 1", "query 2", ...]`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Parse the response to ensure it's valid JSON
    try {
      // Extract JSON if it's wrapped in markdown code blocks or other text
      const jsonMatch = response.match(/\[\s*".*"\s*\]/s)
      const jsonString = jsonMatch ? jsonMatch[0] : response
      const parsedQueries = JSON.parse(jsonString)
      return res.status(200).json({
        success: true,
        message: "Queries generated successfully.",
        data: parsedQueries,
      })
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)
      // Fallback: If parsing fails, try to extract strings that look like queries
      const fallbackQueries =
        response
          .match(/"([^"]*)"/g)
          ?.slice(0, count)
          .map((q) => q.replace(/"/g, "")) || []

      return res.status(200).json({
        success: true,
        message:
          "AI response was not in expected format, extracted best guesses",
        data: fallbackQueries,
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
