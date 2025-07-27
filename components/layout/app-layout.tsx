import { PropsWithChildren } from "react";
import AppNavbar from "@/components/navigation/app-navbar";
import SearchLimitExhaustedModal from "../search-logs/search-limit-exhausted-modal";

function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppNavbar />
      {children}
      <SearchLimitExhaustedModal />
    </>
  );
}

export default AppLayout;
