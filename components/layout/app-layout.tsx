import { PropsWithChildren } from "react";
import AppNavbar from "@/components/navigation/app-navbar";
import SearchLimitExhaustedModal from "../search-logs/search-limit-exhausted-modal";
import Head from "next/head";

function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        {/* SEO */}
        <title>AI-Powered Reddit Post Finder | Firstcurve</title>
        <meta
          name="description"
          content="Firstcurve is an AI-powered Reddit post finder that helps you find the best reddit posts for your product."
        />
        <link rel="canonical" href="https://firstcurve.in" />

        {/* Open Graph tags for rich social sharing */}
        <meta
          property="og:title"
          content="AI-Powered Reddit Post Finder | Firstcurve"
        />
        <meta
          property="og:description"
          content="Firstcurve is an AI-powered Reddit post finder that helps you find the best reddit posts for your product."
        />
        <meta
          property="og:image"
          content="https://firstcurve.in/hero-image.png"
        />
        <meta property="og:url" content="https://firstcurve.in" />
        <meta property="og:type" content="website" />

        {/* favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </Head>
      <AppNavbar />
      {children}
      <SearchLimitExhaustedModal />
    </>
  );
}

export default AppLayout;
