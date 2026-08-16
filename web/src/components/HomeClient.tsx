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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Simple Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredCountries.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              該当する国が見つかりません
            </div>
          ) : (
            filteredCountries.map((country: any) => (
              <Link key={country.slug} href={`/country/${country.slug}`} className="block group">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4 h-full flex flex-col">
                  
                  {/* ヘッダー: 国旗、国名、通貨 */}
                  <div className="border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      {country.countryCode ? (
                        <img src={`https://flagcdn.com/w40/${country.countryCode}.png`} alt={`${country.name} flag`} className="w-8 h-auto shadow-sm border border-slate-100" />
                      ) : (
                        <span className="text-2xl leading-none">🏳️</span>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {country.name}
                        </h3>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {country.currency || "未設定"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3行構成のテキスト */}
                  <div className="flex-grow text-[13px] leading-snug tracking-tight text-slate-600 space-y-1.5 mb-4">
                    <div className="flex items-start gap-1.5">
                      <span className="shrink-0 text-slate-400">•</span>
                      <span>{country.paymentSummary}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="shrink-0 text-slate-400">•</span>
                      <span>{country.exchangeSummary}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="shrink-0 text-slate-400">•</span>
                      <span>{country.trivia}</span>
                    </div>
                  </div>

                  {/* フッター */}
                  <div className="pt-3 border-t border-slate-100 text-xs font-medium text-blue-600 flex justify-end items-center gap-4 mt-auto">
                    <span>お得な両替情報</span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-blue-600">
                      <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
