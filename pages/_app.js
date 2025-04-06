import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Firstcurve</title>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}
