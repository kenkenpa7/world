import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { CountryDetailClient } from "@/components/CountryDetailClient";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const countries = await client.fetch(
      `*[_type == "country"]{ "slug": slug.current }`
    );
    return countries.map((c: any) => ({ slug: c.slug }));
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const query = `*[_type == "country" && slug.current == $slug][0]{
    name,
    currency,
    catchphrase,
    summary,
    paymentSummary,
    exchangeSummary,
    countryCode,
    lastUpdated
  }`;
  const country = await client.fetch(query, { slug: resolvedParams.slug });

  if (!country) {
    return {
      title: "国情報が見つかりません",
      description: "指定された国の両替・決済情報は見つかりませんでした。",
    };
  }

  const title = `${country.name}の両替・決済事情まとめ | 手数料最安のATMと現金ルール`;
  const description =
    country.summary ||
    `${country.name}（通貨: ${country.currency}）の最新決済事情。${country.paymentSummary || ""} ${country.exchangeSummary || ""} おすすめ両替所やATM、キャッシュレス普及率を徹底解説。`;

  return {
    title,
    description,
    keywords: [
      `${country.name} 両替`,
      `${country.name} キャッシング`,
      `${country.name} クレジットカード`,
      `${country.name} 現金`,
      `${country.name} キャッシュレス`,
      country.currency,
      "海外両替",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ja_JP",
      images: country.countryCode
        ? [
            {
              url: `https://flagcdn.com/w320/${country.countryCode}.png`,
              width: 320,
              height: 240,
              alt: `${country.name}の国旗`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const query = `*[_type == "country" && slug.current == $slug][0]`;
  const country = await client.fetch(query, { slug: resolvedParams.slug });

  if (!country) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${country.name}の両替・決済事情完全ガイド`,
    description: country.summary,
    inLanguage: "ja-JP",
    author: {
      "@type": "Organization",
      name: "世界の両替事情 編集部",
    },
    publisher: {
      "@type": "Organization",
      name: "世界の両替事情",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryDetailClient initialData={country} slug={resolvedParams.slug} />
    </>
  );
}
