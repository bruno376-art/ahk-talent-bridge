import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/components/home/Home";
import { getOpenJobsAllLangs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const jobsByLang = await getOpenJobsAllLangs();
  return (
    <>
      <Header />
      <Home jobsByLang={jobsByLang} />
      <Footer />
    </>
  );
}
