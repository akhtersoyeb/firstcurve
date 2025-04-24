import PublicFooter from "@/components/PublicFooter";
import PublicNavbar from "@/components/PublicNavbar";
import Head from "next/head";
import Link from "next/link";

const blogs = [
  {
    title: "How to Find Users Actively Searching for Your Product on Reddit",
    slug: "find-users-searching-your-product-reddit-engage-buyers",
    date: "April 24, 2025",
    excerpt:
      "Learn proven ways to tap into high-intent Reddit discussions and convert users who are ready to buy.",
  },
  {
    title: "10 Proven Organic Growth Strategies for Early-Stage SaaS 🚀",
    slug: "organic-growth-strategies-for-saas",
    date: "April 16, 2025",
    excerpt:
      "Tired of burning cash on ads? Discover 10 organic growth strategies to grow your early-stage SaaS using SEO, Reddit, content marketing, and more.",
  },
  {
    title: "Reddit Growth Playbook for Early-Stage SaaS",
    slug: "reddit-growth-playbook",
    date: "April 11, 2025",
    excerpt:
      "Learn how early-stage SaaS founders can use Reddit to find leads, build trust, and grow organically. Full playbook included.",
  },
  // Add more blogs here
];

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Growth Marketing Blog for SaaS Founders | Firstcurve</title>
        <meta
          name="description"
          content="Explore SEO tips, Reddit growth strategies, and actionable marketing guides for early-stage SaaS founders. Learn how to grow your startup with Firstcurve."
        />
        <link rel="canonical" href="https://firstcurve.in/blog" />
        <meta
          property="og:title"
          content="Growth Marketing Blog for SaaS Founders | Firstcurve"
        />
        <meta
          property="og:description"
          content="Explore SEO tips, Reddit growth strategies, and actionable marketing guides for early-stage SaaS founders. Learn how to grow your startup with Firstcurve."
        />
        <meta property="og:url" content="https://firstcurve.in/blog" />
        <meta
          property="og:image"
          content="https://firstcurve.in/og-image.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Firstcurve Blog – Growth Tips for SaaS Founders"
        />
        <meta
          name="twitter:description"
          content="Actionable growth tips, SEO tactics, and Reddit marketing playbooks for early-stage SaaS founders."
        />
        <meta
          name="twitter:image"
          content="https://firstcurve.in/og-image.png"
        />
      </Head>
      <PublicNavbar />
      <main className="min-h-svh max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Firstcurve Blog
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Actionable growth strategies, Reddit marketing tips, and SEO guides
          for SaaS founders.
        </p>

        <div className="space-y-10">
          {blogs.map((blog) => (
            <article key={blog.slug} className="border-b pb-6">
              <Link href={`/blog/${blog.slug}`} className="block group">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mt-1">{blog.date}</p>
              <p className="text-gray-700 mt-2">{blog.excerpt}</p>
              <Link
                href={`/blog/${blog.slug}`}
                className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
