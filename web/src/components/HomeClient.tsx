"use client";

import { useEffect, useState } from "react";
import { SplineBackground } from "@/components/SplineBackground";
import { AnimateIn } from "@/components/AnimateIn";
import { Search, Globe2, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity";
import Link from "next/link";

const GROQ_QUERY = `*[_type == "country" && defined(paymentSummary)] | order(name asc) {
  name,
  "slug": slug.current,
  flag,
  currency,
  paymentSummary,
  exchangeSummary,
  trivia,
  lastUpdated
}`;

export function HomeClient({ initialCountries }: { initialCountries: any[] }) {
  const [countries, setCountries] = useState<any[]>(initialCountries || []);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    client.fetch(GROQ_QUERY, {}, { cache: "no-store", next: { revalidate: 0 } }).then((data) => {
      if (data && data.length > 0) {
        setCountries(data);
      }
    }).catch((err) => {
      console.log("Using initial static data:", err);
    });
  }, []);

  const displayList = countries.length > 0 ? countries : initialCountries;

  const filteredCountries = displayList.filter((c) =>
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.currency || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#ebedf2] text-slate-900 selection:bg-blue-100 relative pb-24 font-sans">
      {/* 3D地球背景 (透過して固定) */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <SplineBackground url="https://my.spline.design/3dprojectionnoiseyachting-EPCgujQjMsZY8Aoxc2glwYh4-hYW/" />
      </div>

      {/* スマートヘッダー */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-300/60 shadow-sm py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-wide text-slate-900 leading-none">世界の両替事情</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1">World Currency Guide</p>
            </div>
          </div>
          
          <div className="w-full sm:w-80 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="国名や通貨で検索..." 
              className="w-full bg-white border border-slate-300 rounded-full py-2 pl-9 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 relative z-10">
        
        {/* Bento Grid (国一覧: スマホ2列 -> PC3~4列) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {filteredCountries.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 font-bold text-sm bg-white/80 rounded-2xl border border-slate-200 backdrop-blur-md">
              該当する国が見つかりません
            </div>
          ) : (
            filteredCountries.map((country: any, i: number) => (
              <AnimateIn key={country.slug} delay={0.05 + (i * 0.03)} className="h-full">
                <Link href={`/country/${country.slug}`} className="block group cursor-pointer h-full">
                  <div className="w-full h-full bg-white/95 border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-blue-400 backdrop-blur-xl transition-all duration-300 flex flex-col">
                    
                    {/* ヘッダー: 国旗、国名、通貨をコンパクトに横並び（または綺麗に2行に収める） */}
                    <div className="border-b border-slate-200 pb-2 mb-3 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {country.countryCode ? (
                          <img src={`https://flagcdn.com/w40/${country.countryCode}.png`} alt={`${country.name} flag`} className="w-7 sm:w-8 h-auto shadow-sm border border-slate-100 shrink-0 rounded-sm" />
                        ) : (
                          <span className="text-2xl sm:text-3xl shrink-0 leading-none">🏳️</span>
                        )}
                        <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-none truncate">
                          {country.name}
                        </h3>
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 text-right shrink-0">
                        {country.currency || "未設定"}
                      </div>
                    </div>

                    {/* 3行構成のテキスト (ぶら下がりインデントで文字の左側を完璧に揃える) */}
                    <div className="flex-grow text-[11px] sm:text-xs font-bold text-slate-700 leading-snug space-y-2 mb-3">
                      <div className="flex items-start gap-1">
                        <span className="shrink-0 pt-0.5">•</span>
                        <span className="line-clamp-2">{country.paymentSummary}</span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="shrink-0 pt-0.5">•</span>
                        <span className="line-clamp-2">{country.exchangeSummary}</span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="shrink-0 pt-0.5">•</span>
                        <span className="line-clamp-2">{country.trivia}</span>
                      </div>
                    </div>

                    {/* フッター: 詳細ナビ */}
                    <div className="pt-2.5 border-t border-slate-200 flex justify-end text-[10px] sm:text-xs font-bold text-blue-600 group-hover:text-blue-700 mt-auto transition-colors">
                      <span>お得な両替情報 &rarr;</span>
                    </div>

                  </div>
                </Link>
              </AnimateIn>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
