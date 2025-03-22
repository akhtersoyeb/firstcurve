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
    if (!data?.post || !data?.projectContext) {
      return res.status(400).json({
        error: "Validation error",
        message:
          'Missing fields in the request body. Please provide "post" and "projectContext" fields.',
      })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Extract post title and content from the search result
    const title = data?.post?.title?.replace(/<\/?b>/g, "") || ""
    const content = data?.post?.snippet?.replace(/<\/?b>/g, "") || ""

    // Extract subreddit name from URL if possible
    const subredditMatch = data?.post?.link?.match(/reddit\.com\/r\/([^/]+)/)
    const subreddit = subredditMatch ? subredditMatch[1] : "unknown"

    const prompt = `Write a helpful reply to this Reddit post. The reply should subtly and organically promote a solution that fits with this project context: "${data?.projectContext}"

Post on r/${subreddit}:
Title: ${title}
Content: ${content}
URL: ${data?.post?.link}

Your reply should:
1. Be helpful, supportive, and address the specific question or problem in the post
2. Show genuine understanding and empathy for the poster's situation
3. Mention your solution/product only if it naturally fits into the conversation
4. Include personal experience or insights where appropriate
5. Sound like a real person who happens to have found a great solution, not like marketing copy
6. Be conversational and match Reddit's tone (friendly, informal but informative)
7. Be concise (2-4 paragraphs maximum)
8. Never start with "As someone who works at...", "Hey, that's a great question" or similar obvious promotional language
9. Don't use hashtags or emojis which aren't common on Reddit
10. Only return the reply. Your response should not include texts like "Okay, here's a possible response" or other obvious phrases.

Important: If the post doesn't seem to be asking a question or presenting a problem that your solution could help with, respond with "This post doesn't seem to be a good fit for organic promotion."`

    console.log("Sending reply generation request to Gemini")
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    console.log("Successfully generated reply")
    return res.status(200).json({
      success: true,
      message: "Success",
      data: response,
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
