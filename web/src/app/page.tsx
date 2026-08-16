import { client } from "@/lib/sanity";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 60;

const GROQ_QUERY = `*[_type == "country"] | order(name asc) {
  name,
  "slug": slug.current,
  currency,
  cashRatio,
  bestExchange,
  atmSafety,
  lastUpdated,
  catchphrase
}`;

export default async function Home() {
  let countries: any[] = [];
  try {
    countries = await client.fetch(GROQ_QUERY);
  } catch (e) {
    console.error("Failed to fetch countries on build:", e);
  }

  return <HomeClient initialCountries={countries || []} />;
}
