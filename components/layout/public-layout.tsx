import { PropsWithChildren } from "react";
import TopNavbar from "@/components/navigation/top-navbar";
import Footer from "@/components/navigation/footer";

function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TopNavbar />
      {children}
      <Footer />
    </>
  );
}

export default PublicLayout;
