import { useState } from "react"
import { motion } from "motion/react"
import { Share2, Sparkles, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { toast } from "sonner"

const MOCK_QUERIES = [
  "best way to organize thoughts ideas",
  "simplest note taking method for students",
  "how to remember everything I learn",
  "struggling with information overload",
  "need a better way to manage tasks and notes",
  "recommended productivity tools for writers",
  "effective way to brainstorm ideas",
  "best way to collaborate on notes with team",
  "how to improve my study habits effectively",
  "looking for an app to keep track of projects",
  "note taking app for creative writing",
  "digital notebook alternative",
  "how to take better meeting notes",
  "tips for staying organized while working from home",
  "simplifying my workflow what tools to use",
  "best apps for capturing and organizing information",
  "dealing with scattered notes and documents",
  "note taking tips for better focus and concentration",
  "best way to plan and execute projects solo",
  "looking for an intuitive notes system",
  "organizing research for writing a book",
  "how to manage multiple projects effectively",
  "best app for creating knowledge base",
  "simplest way to take notes during lectures",
  "staying on top of my to do list and notes",
  "tips for organizing digital clutter",
  "best app for visual brainstorming",
  "how to create a personal wiki",
  "need a solution for managing recipes and meal planning",
  "organizing travel plans and itinerary",
  "managing client information and meeting notes",
  "best app for creating study guides",
  "how to take comprehensive notes quickly",
  "looking for a cross platform note taking app",
  "better way to track goals and progress",
  "simple note taking for journaling",
  "organizing my digital life advice needed",
  "top productivity apps for busy professionals",
  "managing notes and documents effectively",
  "need to organize my thoughts",
  "how do you stay organized",
  "simplest way to make notes",
  "managing information overload",
  "tips to organise information",
  "organizing data to plan a project",
  "how to simplify workflow",
  "tool to organize thoughts",
  "making notes effectively",
  "project tracking and note management",
  "how to make notes simpler",
]

const MOCK_GOOGLE_SEARCH_RESPONSE = {
  kind: "customsearch#search",
  url: {
    type: "application/json",
    template:
      "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
  },
  queries: {
    request: [
      {
        title:
          "Google Custom Search - simplifying my life with a digital workspace",
        totalResults: "5260",
        searchTerms: "simplifying my life with a digital workspace",
        count: 10,
        startIndex: 1,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "90333823f43724a38",
      },
    ],
    nextPage: [
      {
        title:
          "Google Custom Search - simplifying my life with a digital workspace",
        totalResults: "5260",
        searchTerms: "simplifying my life with a digital workspace",
        count: 10,
        startIndex: 11,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "90333823f43724a38",
      },
    ],
  },
  context: {
    title: "reddit-search",
  },
  searchInformation: {
    searchTime: 0.271567,
    formattedSearchTime: "0.27",
    totalResults: "5260",
    formattedTotalResults: "5,260",
  },
  items: [
    {
      kind: "customsearch#result",
      title: "Do you actually use Notion as a planner? : r/Notion",
      htmlTitle: "Do you actually use Notion as a planner? : r/Notion",
      link: "https://www.reddit.com/r/Notion/comments/mjd3qh/do_you_actually_use_notion_as_a_planner/",
      displayLink: "www.reddit.com",
      snippet:
        "Apr 3, 2021 ... My lovely ADHD requires visual cues so for me to go digital 100% I would have to project it on my wall. ... Notion has simplified my life and work ...",
      htmlSnippet:
        "Apr 3, 2021 <b>...</b> My lovely ADHD requires visual cues so for me to go <b>digital</b> 100% I would have to project it on my wall. ... Notion has <b>simplified my life</b> and work&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/r/.../do_you_actually_use_notion_as_a_planner/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/.../do_you_actually_use_notion_as_a_planner/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/mjd3qh",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/Notion on Reddit: Do you actually use Notion as a planner?",
            "og:site_name": "Reddit",
            "og:title":
              "r/Notion on Reddit: Do you actually use Notion as a planner?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/magnoliamahogany - 21 votes and 20 comments",
            "twitter:image": "https://share.redd.it/preview/post/mjd3qh",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/Notion/comments/mjd3qh/do_you_actually_use_notion_as_a_planner/",
          },
        ],
        cse_image: [
          {
            src: "https://share.redd.it/preview/post/mjd3qh",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "Anyone else obsessed with Simplifying Areas of your Life? : r/infj",
      htmlTitle:
        "Anyone else obsessed with <b>Simplifying</b> Areas of <b>your Life</b>? : r/infj",
      link: "https://www.reddit.com/r/infj/comments/kmdi6o/anyone_else_obsessed_with_simplifying_areas_of/",
      displayLink: "www.reddit.com",
      snippet:
        "Dec 29, 2020 ... In the meantime, I keep shutting myself out from people to work on myself or to make my digital workspace as productive as possible. Idk if ...",
      htmlSnippet:
        "Dec 29, 2020 <b>...</b> In the meantime, I keep shutting myself out from people to work on myself or to make <b>my digital workspace</b> as productive as possible. Idk if&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/.../anyone_else_obsessed_with_simplifying_areas_...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../anyone_else_obsessed_with_<b>simplifying</b>_areas_...",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/kmdi6o",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/infj on Reddit: Anyone else obsessed with Simplifying Areas of your Life?",
            "og:site_name": "Reddit",
            "og:title":
              "r/infj on Reddit: Anyone else obsessed with Simplifying Areas of your Life?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/mysterical_arts - 37 votes and 11 comments",
            "twitter:image": "https://share.redd.it/preview/post/kmdi6o",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/infj/comments/kmdi6o/anyone_else_obsessed_with_simplifying_areas_of/",
          },
        ],
        cse_image: [
          {
            src: "https://share.redd.it/preview/post/kmdi6o",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "Starting over with Notion - need to simplify... advice appreciated : r ...",
      htmlTitle:
        "Starting over with Notion - need to <b>simplify</b>... advice appreciated : r ...",
      link: "https://www.reddit.com/r/Notion/comments/1bp0372/starting_over_with_notion_need_to_simplify_advice/",
      displayLink: "www.reddit.com",
      snippet:
        "Mar 27, 2024 ... I've been in the exact same position as you and am still tidying up my workspaces! One tip I have is to create a single database for all your ...",
      htmlSnippet:
        "Mar 27, 2024 <b>...</b> I&#39;ve been in the exact same position as you and am still tidying up <b>my workspaces</b>! One tip I have is to create a single database for all <b>your</b>&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/.../starting_over_with_notion_need_to_simplify_ad...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../starting_over_with_notion_need_to_simplify_ad...",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/1bp0372",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/Notion on Reddit: Starting over with Notion - need to simplify... advice appreciated",
            "og:site_name": "Reddit",
            "og:title":
              "r/Notion on Reddit: Starting over with Notion - need to simplify... advice appreciated",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description": "Posted by u/crafty-p - 12 votes and 22 comments",
            "twitter:image": "https://share.redd.it/preview/post/1bp0372",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/Notion/comments/1bp0372/starting_over_with_notion_need_to_simplify_advice/",
          },
        ],
        cse_image: [
          {
            src: "https://share.redd.it/preview/post/1bp0372",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "What personal automation solution(s) do you have in place to ...",
      htmlTitle:
        "What personal automation solution(s) do you have in place to ...",
      link: "https://www.reddit.com/r/ExperiencedDevs/comments/1fck5f1/what_personal_automation_solutions_do_you_have_in/",
      displayLink: "www.reddit.com",
      snippet:
        "Sep 9, 2024 ... There are other parts of my digital life that I've tried optimizing only to find out that the automation costs more time than doing the task ...",
      htmlSnippet:
        "Sep 9, 2024 <b>...</b> There are other parts of <b>my digital life</b> that I&#39;ve tried optimizing only to find out that the automation costs more time than doing the task&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/.../what_personal_automation_solutions_do_you_h...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../what_personal_automation_solutions_do_you_h...",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/1fck5f1",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/ExperiencedDevs on Reddit: What personal automation solution(s) do you have in place to simplify your programming and streamline everyday work? Anything you find particularly brilliant, or that you'd recommend to the rest of us?",
            "og:site_name": "Reddit",
            "og:title":
              "r/ExperiencedDevs on Reddit: What personal automation solution(s) do you have in place to simplify your programming and streamline everyday work? Anything you find particularly brilliant, or that you'd recommend to the rest of us?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/BurritoBandito39 - 51 votes and 77 comments",
            "twitter:image": "https://share.redd.it/preview/post/1fck5f1",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/ExperiencedDevs/comments/1fck5f1/what_personal_automation_solutions_do_you_have_in/",
          },
        ],
        cse_image: [
          {
            src: "https://share.redd.it/preview/post/1fck5f1",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "My digital organization has always been fragmented and ...",
      htmlTitle:
        "<b>My digital</b> organization has always been fragmented and ...",
      link: "https://www.reddit.com/r/Notion/comments/k4dc58/my_digital_organization_has_always_been/",
      displayLink: "www.reddit.com",
      snippet:
        "Dec 1, 2020 ... r/Notion - Simplified my workspace by rebuilding it from scratch and fully utilizing the. 176 upvotes · 36 comments ...",
      htmlSnippet:
        "Dec 1, 2020 <b>...</b> r/Notion - <b>Simplified my workspace</b> by rebuilding it from scratch and fully utilizing the. 176 upvotes · 36 comments&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/r/.../my_digital_organization_has_always_been/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/.../<b>my</b>_<b>digital</b>_organization_has_always_been/",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlxYBp36Q7R_pClUjp_M8MzQmrsKiXm5Xz1ZSn6vNEb2PNNialhuTQWcM&s",
            width: "229",
            height: "220",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://preview.redd.it/z2f1ec6i3i261.png?width=1080&crop=smart&auto=webp&s=bda43e481a99294717cb18ccb433c6c6cf063ade",
            "theme-color": "#000000",
            "og:image:width": "1080",
            "og:type": "website",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/Notion on Reddit: My digital organization has always been fragmented and inconsistent. It's a simple use case for Notion, but this file structure breakdown has really helped me.",
            "og:site_name": "Reddit",
            "og:title":
              "r/Notion on Reddit: My digital organization has always been fragmented and inconsistent. It's a simple use case for Notion, but this file structure breakdown has really helped me.",
            "og:image:height": "1035",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/elitherenaissanceman - 294 votes and 18 comments",
            "twitter:image":
              "https://preview.redd.it/z2f1ec6i3i261.png?width=1080&crop=smart&auto=webp&s=bda43e481a99294717cb18ccb433c6c6cf063ade",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/Notion/comments/k4dc58/my_digital_organization_has_always_been/",
          },
        ],
        cse_image: [
          {
            src: "https://preview.redd.it/z2f1ec6i3i261.png?width=1080&crop=smart&auto=webp&s=bda43e481a99294717cb18ccb433c6c6cf063ade",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Overwhelmed by Too Many Productivity Apps – Need ...",
      htmlTitle: "Overwhelmed by Too Many Productivity Apps – Need ...",
      link: "https://www.reddit.com/r/ProductivityApps/comments/1eqj8uz/overwhelmed_by_too_many_productivity_apps_need/",
      displayLink: "www.reddit.com",
      snippet:
        "Aug 12, 2024 ... ... to Simplify Life & Work Management! Hey everyone, I'm looking for recommendations on productivity apps to help streamline my life and work.",
      htmlSnippet:
        "Aug 12, 2024 <b>...</b> ... to <b>Simplify</b> Life &amp; Work Management! Hey everyone, I&#39;m looking for recommendations on productivity apps to help streamline <b>my life</b> and work.",
      formattedUrl:
        "https://www.reddit.com/.../overwhelmed_by_too_many_productivity_apps...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../overwhelmed_by_too_many_productivity_apps...",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/1eqj8uz",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/ProductivityApps on Reddit: Overwhelmed by Too Many Productivity Apps – Need Recommendations to Simplify Life & Work Management!",
            "og:site_name": "Reddit",
            "og:title":
              "r/ProductivityApps on Reddit: Overwhelmed by Too Many Productivity Apps – Need Recommendations to Simplify Life & Work Management!",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/Panda_Material - 22 votes and 48 comments",
            "twitter:image": "https://share.redd.it/preview/post/1eqj8uz",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/ProductivityApps/comments/1eqj8uz/overwhelmed_by_too_many_productivity_apps_need/",
          },
        ],
        cse_image: [
          {
            src: "https://share.redd.it/preview/post/1eqj8uz",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "How do you automate your life to have more free time? : r/productivity",
      htmlTitle:
        "How do you automate <b>your life</b> to have more free time? : r/productivity",
      link: "https://www.reddit.com/r/productivity/comments/15f4s10/how_do_you_automate_your_life_to_have_more_free/",
      displayLink: "www.reddit.com",
      snippet:
        "Aug 1, 2023 ... What tips do you have for others who are looking to automate their lives? I'm especially interested in automating tasks related to: Personal ...",
      htmlSnippet:
        "Aug 1, 2023 <b>...</b> What tips do you have for others who are looking to automate <b>their</b> lives? I&#39;m especially interested in automating tasks related to: Personal&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/.../how_do_you_automate_your_life_to_have_mor...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../how_do_you_automate_your_<b>life</b>_to_have_mor...",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/15f4s10",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/productivity on Reddit: How do you automate your life to have more free time?",
            "og:site_name": "Reddit",
            "og:title":
              "r/productivity on Reddit: How do you automate your life to have more free time?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/Pheonixfage - 346 votes and 134 comments",
            "twitter:image": "https://share.redd.it/preview/post/15f4s10",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/productivity/comments/15f4s10/how_do_you_automate_your_life_to_have_more_free/",
          },
        ],
        cse_image: [
          {
            src: "https://share.redd.it/preview/post/15f4s10",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "How have you used technology to simplify your life? : r/minimalism",
      htmlTitle:
        "How have you used technology to <b>simplify your life</b>? : r/minimalism",
      link: "https://www.reddit.com/r/minimalism/comments/j1xd1o/how_have_you_used_technology_to_simplify_your_life/",
      displayLink: "www.reddit.com",
      snippet:
        "Sep 29, 2020 ... I'm curious, do you use an online storage or an external hard drive for storing the digital content? And do you have backups?",
      htmlSnippet:
        "Sep 29, 2020 <b>...</b> I&#39;m curious, do you use an online storage or an external hard drive for storing the <b>digital</b> content? And do you have backups?",
      formattedUrl:
        "https://www.reddit.com/.../how_have_you_used_technology_to_simplify_y...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../how_have_you_used_technology_to_simplify_y...",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG-WC9vHcYyUCx6b7xUFbBlNv__VDThyHszBdk75JJhaJKzkuMyL1dBos&s",
            width: "225",
            height: "225",
          },
        ],
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/j1xd1o",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/minimalism on Reddit: How have you used technology to simplify your life?",
            "og:site_name": "Reddit",
            "og:title":
              "r/minimalism on Reddit: How have you used technology to simplify your life?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description": "Posted by u/Mr94 - 236 votes and 175 comments",
            "twitter:image": "https://share.redd.it/preview/post/j1xd1o",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/minimalism/comments/j1xd1o/how_have_you_used_technology_to_simplify_your_life/",
          },
        ],
        cse_image: [
          {
            src: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Organising my Apartment : r/Notion",
      htmlTitle: "Organising <b>my</b> Apartment : r/Notion",
      link: "https://www.reddit.com/r/Notion/comments/18wqo28/organising_my_apartment/",
      displayLink: "www.reddit.com",
      snippet:
        "Jan 2, 2024 ... r/Notion - A guide to simplifying your workspace! 99 upvotes · 6 ... I made my life into a game!! r/Notion - I made my life into a game ...",
      htmlSnippet:
        "Jan 2, 2024 <b>...</b> r/Notion - A guide to <b>simplifying</b> your <b>workspace</b>! 99 upvotes · 6 ... I made <b>my life</b> into a game!! r/Notion - I made <b>my life</b> into a game&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/r/Notion/comments/.../organising_my_apartment/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/Notion/comments/.../organising_<b>my</b>_apartment/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/18wqo28",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title": "r/Notion on Reddit: Organising my Apartment",
            "og:site_name": "Reddit",
            "og:title": "r/Notion on Reddit: Organising my Apartment",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/Strange_Editor4021 - 4 votes and 2 comments",
            "twitter:image": "https://share.redd.it/preview/post/18wqo28",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/Notion/comments/18wqo28/organising_my_apartment/",
          },
        ],
        cse_image: [
          {
            src: "https://share.redd.it/preview/post/18wqo28",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "App to remove dot grid from notebook digital copy's : r/notebooks",
      htmlTitle:
        "App to remove dot grid from notebook <b>digital</b> copy&#39;s : r/notebooks",
      link: "https://www.reddit.com/r/notebooks/comments/8o8g6k/app_to_remove_dot_grid_from_notebook_digital_copys/",
      displayLink: "www.reddit.com",
      snippet:
        "Jun 3, 2018 ... r/Notion - Simplified my workspace by rebuilding it from scratch and fully utilizing the. 176 upvotes · 36 comments ...",
      htmlSnippet:
        "Jun 3, 2018 <b>...</b> r/Notion - <b>Simplified my workspace</b> by rebuilding it from scratch and fully utilizing the. 176 upvotes · 36 comments&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/.../app_to_remove_dot_grid_from_notebook_digit...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../app_to_remove_dot_grid_from_notebook_<b>digit</b>...",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbpjoiq9P7IVuIVSJ5MPDqcqUYx4mEhn-BApTX5dsKGqtR5YYPZgtiMKw&s",
            width: "140",
            height: "140",
          },
        ],
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/8o8g6k",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/notebooks on Reddit: App to remove dot grid from notebook digital copy’s",
            "og:site_name": "Reddit",
            "og:title":
              "r/notebooks on Reddit: App to remove dot grid from notebook digital copy’s",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description": "Posted by u/rrkpl - 9 votes and 4 comments",
            "twitter:image": "https://share.redd.it/preview/post/8o8g6k",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/notebooks/comments/8o8g6k/app_to_remove_dot_grid_from_notebook_digital_copys/",
          },
        ],
        cse_image: [
          {
            src: "https://b.thumbs.redditmedia.com/y4JFuw2e5aCW6QjkLksLSTcwUWSjbRt1xjHnC6rcWZE.jpg",
          },
        ],
      },
    },
  ],
}
// Mock data for Reddit posts
const MOCK_POSTS = [
  {
    title:
      "Can you actually learn just by immersion right from the start? : r ...",
    snippet:
      "Dec 25, 2021 ... ... studying with immersion and start reading ... Of course reading and listening has been a major part of language learning curricula forever.",
    link: "https://www.reddit.com/r/LearnJapanese/comments/rogpkd/can_you_actually_learn_just_by_immersion_right/",
    relevance_score: 75,
    relevance_reason:
      "This post is asking about immersion as a learning technique and reading. Our product helps with language immersion through reading and provides translations, which could be a helpful solution for the user. Since it is the LearnJapanese subreddit, promotional opportunities must be tailored accordingly.",
  },
  {
    title: "Watching media and reading books isn't immersion : r ...",
    snippet:
      "Dec 31, 2020 ... Ultimately language learning is a multi-faceted and complicated process and a lot of simple terms don't easily convey those complexities, so I ...",
    link: "https://www.reddit.com/r/languagelearning/comments/knwi5c/watching_media_and_reading_books_isnt_immersion/",
    relevance_score: 60,
    relevance_reason:
      "The post discusses the complexities of language learning and immersion through reading. This indicates a potential audience interested in tools that simplify the process, making this somewhat relevant, though more indirectly than others.",
  },
  {
    title:
      "App for immersive reading and bilingual books. : r/languagelearning",
    snippet:
      "Jun 10, 2024 ... App for immersive reading and bilingual books. · Translation Mode: Tap on sentences to see the corresponding parallel sentences. · Sync Mode: ...",
    link: "https://www.reddit.com/r/languagelearning/comments/1dciazz/app_for_immersive_reading_and_bilingual_books/",
    relevance_score: 80,
    relevance_reason:
      "This post directly discusses immersive reading and bilingual books, indicating a clear interest in the features our product offers. Since other apps are already mentioned, a promotional comment comparing functionalities would be natural.",
  },
  {
    title: "Start learning with immersion? : r/languagelearning",
    snippet:
      "Oct 20, 2023 ... I'm of the idea to start immersing as soon as possible using only content I want to immerse in (not graded readers for example)…usually within ...",
    link: "https://www.reddit.com/r/languagelearning/comments/17bx8v4/start_learning_with_immersion/",
    relevance_score: 85,
    relevance_reason:
      "The user is asking about starting language learning with immersion, which is a core element of our project. Mentioning how our project facilitates immersion with personalized translations would be very relevant and helpful, particularly for someone looking for content beyond graded readers.",
  },
  {
    title:
      "I've been told that 'immersive learning' is the most effective way, but ...",
    snippet:
      "Dec 31, 2023 ... Immersion is simply using your knowledge of the language, however little it may be, to consume media in that language and learn even more about ...",
    link: "https://www.reddit.com/r/languagelearning/comments/18vc190/ive_been_told_that_immersive_learning_is_the_most/",
    relevance_score: 90,
    relevance_reason:
      "This post explicitly asks what immersive learning is and how to find beginner-friendly resources, directly addressing the problem our project solves. A comment explaining our approach to making immersion accessible, providing translations and flashcards, would be extremely beneficial and well-received.",
  },
  {
    title: "Reading English translation before or after immersion : r ...",
    snippet:
      "Aug 18, 2023 ... Unless the translation is made specifically for language learning, helping out language learners isn't particularly high on translators' ...",
    link: "https://www.reddit.com/r/LearnJapanese/comments/15ue6a7/reading_english_translation_before_or_after/",
    relevance_score: 70,
    relevance_reason:
      "The post discusses when to read English translations in relation to immersion. Given that our product provides in-context translations while reading, it could be relevant, but the context in LearnJapanese requires that any suggestions must be tailored appropriately.",
  },
  {
    title: "Is it possible to learn a language only with immersion? : r ...",
    snippet:
      "Apr 15, 2020 ... ... learning languages. I've read and heard about people that learned a language just immersing themselves into it, without a textbook or any ...",
    link: "https://www.reddit.com/r/languagelearning/comments/g1wmjb/is_it_possible_to_learn_a_language_only_with/",
    relevance_score: 70,
    relevance_reason:
      "The post explores the possibilities of learning a language solely through immersion. Our product supports immersion through translated reading material, making this a relevant audience, but a promotional comment must acknowledge the debate of immersion vs. textbook learning.",
  },
  {
    title: "The balance between Anki and Immersion : r/languagelearning",
    snippet:
      "Jun 3, 2022 ... Hi everyone! I've been reading a lot of posts and watching some videos about Anki and its usefulness in learning languages.",
    link: "https://www.reddit.com/r/languagelearning/comments/v49mi5/the_balance_between_anki_and_immersion/",
    relevance_score: 80,
    relevance_reason:
      "This post directly asks for the balance between Anki (flashcards) and Immersion, which is a perfect opportunity to share our product. We offer flashcards from immersion readings, which makes this a very relevant topic.",
  },
  {
    title: "What actually is immersion? : r/languagelearning",
    snippet:
      "Oct 29, 2023 ... 15 votes, 18 comments. Does immersion just means watching/reading/listening and adding those words which you didn't understand to anki or ...",
    link: "https://www.reddit.com/r/languagelearning/comments/17ivmwe/what_actually_is_immersion/",
    relevance_score: 90,
    relevance_reason:
      "This post explicitly questions what immersion entails and mentions reading and vocabulary acquisition. Our product simplifies immersion through translated reading and flashcard creation, addressing the user's implicit needs. A promotional comment highlighting these features would be highly relevant.",
  },
  {
    title:
      "How to use LingQ or Pop Up Dictionaries / Reading Immersion : r ...",
    snippet:
      "Jul 16, 2024 ... This post needs to be stickied in how to read for language learning. I too have struggled with grasping a good idea as to how to approach ...",
    link: "https://www.reddit.com/r/languagelearning/comments/1e52zva/how_to_use_lingq_or_pop_up_dictionaries_reading/",
    relevance_score: 95,
    relevance_reason:
      "This post is ideal because it discusses reading immersion strategies. The user is asking for advice related to our specific niche and similar products already being discussed. This post presents a great opportunity to promote our language learning tool.",
  },
]

// Mock generated replies
const GENERATED_REPLIES = {
  1: "Based on my experience growing a SaaS business, I'd recommend focusing on these three areas: 1) Content marketing - create valuable resources that address pain points in your niche, 2) Strategic partnerships with complementary tools your target users already use, and 3) Optimizing your onboarding process to improve activation rates. These approaches tend to have better ROI than paid acquisition when you're on a limited budget. Happy to share more specific tactics if you're interested!",
}

async function getQueries({ projectName, projectDescription }) {
  const res = await fetch("/api/generate-queries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
      description: projectDescription,
    }),
  })
  const data = await res.json()
  // console.log("queries: ", data)
  return data?.data
}

async function getGoogleSearchResults({ query }) {
  const res = await fetch("/api/google-custom-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  })
  const data = await res.json()
  if (res.status === 429) {
    toast.error("Maximum number of requests reached. Please try again next day.")
    return []
  }
  return data?.data
}

async function analyzeAndFilterPosts({ posts, projectContext }) {
  const res = await fetch("/api/analyze-search-results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      posts: posts,
      projectContext: projectContext,
    }),
  })
  const data = await res.json()
  console.log("filtered posts: ", data)
  return data?.data
}

async function getGeneratedReply({ post, projectContext }) {
  const res = await fetch("/api/generate-reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: post,
      projectContext: projectContext,
    }),
  })
  const data = await res.json()
  console.log("generated reply: ", data)
  return data?.data
}

export default function RedditMarketingTool() {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [organicPosts, setOrganicPosts] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [generatingReply, setGeneratingReply] = useState(null)
  const [generatedReplies, setGeneratedReplies] = useState(GENERATED_REPLIES)
  const [copiedReply, setCopiedReply] = useState(null)

  const handleSearch = async () => {
    if (!projectName || !projectDescription) return
    if (projectName.length > 50 || projectDescription.length > 2000) return

    setOrganicPosts([])
    setShowResults(false)
    setIsSearching(true)

    try {
      // STEP 1: Generate queries and take a random query among them
      const generatedQueries = await getQueries({
        projectName: projectName,
        projectDescription: projectDescription,
      })
      const randomIndex = Math.floor(Math.random() * generatedQueries.length)
      const randomQuery = generatedQueries[randomIndex]

      // MOCK STEP 1:
      // const randomIndex = Math.floor(Math.random() * MOCK_QUERIES.length)
      // const randomQuery = MOCK_QUERIES[randomIndex]

      // STEP 2: Google search for the query
      const searchResults = await getGoogleSearchResults({
        query: randomQuery,
      })
      // console.log("searchResults: ", searchResults)

      // MOCK STEP 2:
      // const searchResults = MOCK_GOOGLE_SEARCH_RESPONSE

      if (searchResults.length === 0) {
        setOrganicPosts([])
        setShowResults(false)
        return
      }

      // STEP 3: Filter using gemini
      const filteredPosts = await analyzeAndFilterPosts({
        posts: searchResults?.items,
        projectContext: `${projectName}: ${projectDescription}`,
      })

      // MOCK STEP 3:
      // const filteredPosts = {
      //   data: MOCK_POSTS
      // }
      console.log("filtered posts: ", filteredPosts)
      setOrganicPosts(filteredPosts)
      setShowResults(true)
    } catch (error) {
      console.error("Error fetching Reddit posts:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleGenerateReply = async (post) => {
    if (generatedReplies[post?.link]) return

    setGeneratingReply(post?.link)

    const generatedReply = await getGeneratedReply({
      post: post,
      projectContext: `${projectName}: ${projectDescription}`,
    })

    setGeneratedReplies((prev) => ({
      ...prev,
      [post?.link]: generatedReply
    }))
    setGeneratingReply(null)
  }

  const handleCopyReply = (postLink) => {
    if (!generatedReplies[postLink]) return

    navigator.clipboard.writeText(generatedReplies[postLink])
    setCopiedReply(postLink)

    setTimeout(() => {
      setCopiedReply(null)
    }, 2000)
  }

  return (
    <>
      <div className="w-full h-screen bg-[#f8f9fa] dark:bg-[#171717] flex overflow-hidden pt-16">
        {/* Left Column - Fixed Form */}
        <div className="w-full lg:w-[400px] h-full p-6 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-[#171717] overflow-y-auto">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#171717] dark:text-white mb-6">
              Product Details
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="projectName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Product Name
                </label>
                <Input
                  id="projectName"
                  placeholder="Enter your product's name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border-gray-300 dark:border-gray-700"
                  maxLength={50}
                />
                <div className="flex justify-end">
                  <span
                    className={cn(
                      "text-xs",
                      projectName.length > 40
                        ? "text-amber-500"
                        : "text-gray-500",
                      projectName.length >= 50 ? "text-red-500" : ""
                    )}
                  >
                    {projectName.length}/50
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="projectDescription"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Product Description
                </label>
                <Textarea
                  id="projectDescription"
                  placeholder="Describe your product and target audience"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="min-h-[200px] max-h-[400px] border-gray-300 dark:border-gray-700"
                  maxLength={2000}
                />
                <div className="flex justify-end">
                  <span
                    className={cn(
                      "text-xs",
                      projectDescription.length > 1800
                        ? "text-amber-500"
                        : "text-gray-500",
                      projectDescription.length >= 2000 ? "text-red-500" : ""
                    )}
                  >
                    {projectDescription.length}/2000
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-auto">
            <Button
              onClick={handleSearch}
              disabled={
                isSearching ||
                !projectName ||
                !projectDescription ||
                projectName.length > 50 ||
                projectDescription.length > 2000
              }
              className="w-full bg-[#171717] hover:bg-[#2a2a2a] text-white dark:bg-primary dark:hover:bg-primary/90 h-12"
            >
              {isSearching ? "Searching..." : "Search Posts"}
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              2/3 daily limit
            </p>
          </div>
        </div>

        {/* Right Column - Scrollable Results */}
        <div className="flex-1 h-full overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
                {organicPosts.map((post, index) => (
                  <motion.div
                    key={post?.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-md overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg text-[#171717] dark:text-white mb-2">
                            {post?.title}
                          </h3>
                          <Link
                            href={post?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            // variant="ghost"
                            // size="icon"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Share2 className="h-4 w-4" />
                          </Link>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {post?.snippet}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Relevance Score: {post?.relevance_score}
                          </div>

                          {!generatedReplies[post?.link] && (
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "bg-gray-100 hover:bg-gray-200 text-[#171717] border-gray-200",
                                "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-700",
                                "transition-all duration-200"
                              )}
                              onClick={() => handleGenerateReply(post)}
                              disabled={generatingReply === post?.link}
                            >
                              {generatingReply === post?.link ? (
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
                        {generatedReplies[post?.link] && (
                          <div className="mt-6">
                            <Separator className="my-4" />

                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-[#171717] dark:text-white">
                                Generated Reply
                              </h4>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyReply(post?.link)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              >
                                {copiedReply === post?.link ? (
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
                              {generatedReplies[post?.link]}
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
                  Enter your product details and click "Search Posts" to find
                  relevant Reddit content
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
