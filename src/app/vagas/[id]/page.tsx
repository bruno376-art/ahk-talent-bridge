import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobDetail from "@/components/JobDetail";
import { getJobAllLangs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export default async function VagaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobByLang = await getJobAllLangs(id);
  if (!jobByLang) notFound();

  return (
    <>
      <Header />
      <JobDetail jobByLang={jobByLang} />
      <Footer />
    </>
  );
}
