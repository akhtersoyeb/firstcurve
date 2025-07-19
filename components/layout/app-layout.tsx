import { PropsWithChildren } from "react";
import AppNavbar from "@/components/navigation/app-navbar";

function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
}

export default AppLayout;
