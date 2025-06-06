import AppLayout from "@/components/layout/app-layout";
import SearchForm from "@/components/product/search-form";

function DashboardIndexPage() {
  return (
    <>
      <AppLayout>
        <main className="container mx-auto min-h-screen flex flex-col justify-center items-center">
          <SearchForm containerClassName="w-sm" />
        </main>
      </AppLayout>
    </>
  );
}

export default DashboardIndexPage;
