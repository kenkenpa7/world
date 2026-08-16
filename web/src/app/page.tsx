import { client } from "@/lib/sanity";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 60;

const GROQ_QUERY = `*[_type == "country" && defined(paymentSummary)] | order(name asc) {
  name,
  "slug": slug.current,
  countryCode,
  currency,
  paymentSummary,
  exchangeSummary,
  trivia,
  lastUpdated
}`;

export default async function Home() {
  let countries: any[] = [];
  try {
    countries = await client.fetch(GROQ_QUERY);
  } catch (e) {
    console.error("Failed to fetch countries on build:", e);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "世界の両替事情 (World Currency Guide)",
    description:
      "主要15カ国のキャッシュレス比率、おすすめ両替所、手数料最安のATM、現金の必要性を徹底解説する総合ガイド。",
    inLanguage: "ja-JP",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient initialCountries={countries || []} />
    </>
  );
}
