import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { CountryDetailClient } from "@/components/CountryDetailClient";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const countries = await client.fetch(`*[_type == "country"]{ "slug": slug.current }`);
    return countries.map((c: any) => ({ slug: c.slug }));
  } catch (e) {
    return [];
  }
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const query = `*[_type == "country" && slug.current == $slug][0]`;
  const country = await client.fetch(query, { slug: resolvedParams.slug });

  if (!country) {
    notFound();
  }

  return <CountryDetailClient initialData={country} slug={resolvedParams.slug} />;
}
