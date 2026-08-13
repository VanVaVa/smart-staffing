import { getAboutPageContent } from "@/entities/landing/server";
import { AboutPage } from "@/views/about";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { blocks } = await getAboutPageContent();
  return <AboutPage blocks={blocks} />;
}
