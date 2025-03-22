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
    if (!data?.posts || !data?.projectContext) {
      return res.status(400).json({
        error: "Validation error",
        message:
          'Missing fields in the request body. Please provide "posts" and "projectContext" fields.',
      })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `Given these search results from Reddit and the project context: "${data?.projectContext}", 
    analyze each result and rate its relevance for organic promotion opportunities from 0-100.
    
    Consider these factors:
    - Is the post likely asking for advice, recommendations, or solutions to a problem? (high priority)
    - Does our project solve a problem mentioned in the post? (high priority)
    - Would a promotional comment seem natural or would it appear as spam? (high priority)
    - Is the subreddit likely appropriate for our solution? (medium priority)
    
    The search results may only contain snippets and titles from Reddit - use what information is available.
    
    For each result, analyze:
    1. The title
    2. The snippet/description
    3. The URL (which contains the subreddit name)
    4. Any other relevant information available
    
    Return a JSON array of objects that:
    1. Contains only necessary fields from the original post object like - link, title, snippet 
    2. Adds a 'relevance_score' field (0-100) to each post
    3. Adds a 'relevance_reason' field with 1-2 sentences explaining the score
    4. Only includes posts with a relevance score above 50`;

    const result = await model.generateContent([prompt, JSON.stringify(data?.posts)]);
    // console.log(result.response.text())
    const response = result.response.text();

    try {
      // Try to find and parse JSON in the response
      const jsonMatch = response.match(/\[\s*\{.*\}\s*\]/s);
      const jsonString = jsonMatch ? jsonMatch[0] : response;
      const filteredPosts = JSON.parse(jsonString);
      
      return res.status(200).json({
        success: true,
        message: "Success",
        data: filteredPosts,
      })
    } catch (parseError) {
      console.error('Error parsing AI filter response:', parseError);      
      const withScores = data?.posts.map(post => ({
        ...post,
        relevance_score: Math.floor(Math.random() * 50) + 50, // Random score 50-100
        relevance_reason: "Automatic score assigned due to parsing error in AI response."
      }));
      
      return res.status(207).json({
        success: true,
        message: "Partial Success",
        data: withScores,
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
