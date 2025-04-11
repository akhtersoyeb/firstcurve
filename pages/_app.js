import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Find Reddit Marketing Opportunities | Firstcurve</title>
        <meta name="description" content={"Discover Reddit posts where users are actively seeking solutions. Reach your target audience before competitors do."} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN_URL} />

        {/* Open Graph */}
        <meta property="og:title" content={"Find Reddit Marketing Opportunities | Firstcurve"} />
        <meta property="og:description" content={"Discover Reddit posts where users are actively seeking solutions. Reach your target audience before competitors do."} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN_URL} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_DOMAIN_URL + "/og-image.png"} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Find Reddit Marketing Opportunities | Firstcurve"} />
        <meta name="twitter:description" content={"Discover Reddit posts where users are actively seeking solutions. Reach your target audience before competitors do."} />
        <meta name="twitter:image" content={process.env.NEXT_PUBLIC_DOMAIN_URL + "/og-image.png"} />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}
