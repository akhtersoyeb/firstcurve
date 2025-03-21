import { useState } from "react"
import { motion } from "motion/react"
import { Share2, Sparkles, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/user-navbar"

// Mock data for Reddit posts
const MOCK_POSTS = [
  {
    id: 1,
    title: "What's the best way to grow my SaaS business?",
    content:
      "I've been running my SaaS for about 6 months now and growth has been steady but slow. I'm looking for strategies to accelerate user acquisition without burning through my limited marketing budget. Any advice from those who've been there?",
    relevanceScore: 89,
  },
  {
    id: 2,
    title: "Need help with customer retention strategies",
    content:
      "Our acquisition numbers are good, but we're seeing a higher churn rate than expected. We offer a 14-day free trial, but many users don't convert to paid plans. What retention strategies have worked well for your SaaS products?",
    relevanceScore: 92,
  },
  {
    id: 3,
    title: "Recommendations for SaaS pricing models?",
    content:
      "I'm in the process of revamping our pricing structure and would love to hear what's working for other founders. Currently using a tiered model, but considering usage-based pricing. What pricing models have you found most effective for sustainable growth?",
    relevanceScore: 85,
  },
  {
    id: 4,
    title: "How important is having a mobile app for your SaaS?",
    content:
      "We're debating whether to invest in building native mobile apps for our SaaS platform. Our web app is responsive, but some competitors have dedicated apps. Has anyone seen significant ROI from building mobile apps for their SaaS product?",
    relevanceScore: 78,
  },
]

// Mock generated replies
const GENERATED_REPLIES = {
  1: "Based on my experience growing a SaaS business, I'd recommend focusing on these three areas: 1) Content marketing - create valuable resources that address pain points in your niche, 2) Strategic partnerships with complementary tools your target users already use, and 3) Optimizing your onboarding process to improve activation rates. These approaches tend to have better ROI than paid acquisition when you're on a limited budget. Happy to share more specific tactics if you're interested!",
}

export default function RedditMarketingTool() {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [generatingReply, setGeneratingReply] = useState(null)
  const [generatedReplies, setGeneratedReplies] = useState(GENERATED_REPLIES)
  const [copiedReply, setCopiedReply] = useState(null)

  const handleSearch = async () => {
    if (!projectName || !projectDescription) return

    setIsSearching(true)

    try {
      // fetch a post request
      const res = await fetch('/api/generate-queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          description: projectDescription
        })
      })
      const data = await res.json()
      console.log('response: ', data)
    } catch (error) {
      console.error("Error fetching Reddit posts:", error)
    } finally {
      setIsSearching(false)
    }
    

    // Simulate API call
    // setTimeout(() => {
    //   setIsSearching(false)
    //   setShowResults(true)
    // }, 1500)
  }

  const handleGenerateReply = (postId) => {
    if (generatedReplies[postId]) return

    setGeneratingReply(postId)

    // Simulate API call
    setTimeout(() => {
      setGeneratingReply(null)
      setGeneratedReplies((prev) => ({
        ...prev,
        [postId]:
          "Based on my experience, I'd recommend focusing on building strong relationships with your early users. Personalized onboarding calls, responsive support, and regularly soliciting feedback can significantly improve retention. Consider implementing a customer success program that proactively reaches out at key moments in the user journey. Also, analyze your churn data to identify common drop-off points and address those specific pain points in your product.",
      }))
    }, 2000)
  }

  const handleCopyReply = (postId) => {
    if (!generatedReplies[postId]) return

    navigator.clipboard.writeText(generatedReplies[postId])
    setCopiedReply(postId)

    setTimeout(() => {
      setCopiedReply(null)
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-[#f8f9fa] dark:bg-[#171717] flex overflow-hidden pt-16">
        {/* Left Column - Fixed Form */}
        <div className="w-full lg:w-[400px] h-full p-6 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-[#171717] overflow-y-auto">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-white mb-6">Project Details</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="projectName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Name
                </label>
                <Input
                  id="projectName"
                  placeholder="Enter your product's name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border-gray-300 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="projectDescription" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Description
                </label>
                <Textarea
                  id="projectDescription"
                  placeholder="Describe your product and target audience"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="min-h-[200px] border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-auto">
            <Button
              onClick={handleSearch}
              disabled={isSearching || !projectName || !projectDescription}
              className="w-full bg-[#171717] hover:bg-[#2a2a2a] text-white dark:bg-primary dark:hover:bg-primary/90 h-12"
            >
              {isSearching ? "Searching..." : "Search Posts"}
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">2/3 daily limit</p>
          </div>
        </div>

        {/* Right Column - Scrollable Results */}
        <div className="flex-1 h-full overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-6 text-[#171717] dark:text-white bg-[#f8f9fa] dark:bg-[#171717] py-2 z-10">
              Search Results
            </h2>

            {showResults ? (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {MOCK_POSTS.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-md overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg text-[#171717] dark:text-white mb-2">{post.title}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.content}</p>

                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Relevance Score: {post.relevanceScore}
                          </div>

                          {!generatedReplies[post.id] && (
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "bg-gray-100 hover:bg-gray-200 text-[#171717] border-gray-200",
                                "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700",
                                "transition-all duration-200",
                              )}
                              onClick={() => handleGenerateReply(post.id)}
                              disabled={generatingReply === post.id}
                            >
                              {generatingReply === post.id ? (
                                "Generating..."
                              ) : (
                                <>
                                  <Sparkles className="mr-2 h-4 w-4" />
                                  Generate Reply
                                </>
                              )}
                            </Button>
                          )}
                        </div>

                        {/* Generated Reply Section */}
                        {generatedReplies[post.id] && (
                          <div className="mt-6">
                            <Separator className="my-4" />

                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-[#171717] dark:text-white">Generated Reply</h4>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyReply(post.id)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              >
                                {copiedReply === post.id ? (
                                  <>
                                    <Check className="h-4 w-4 mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                              {generatedReplies[post.id]}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
                  Enter your project details and click "Search Posts" to find relevant Reddit content
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

