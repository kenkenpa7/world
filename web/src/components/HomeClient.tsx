"use client";

import { useEffect, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { Search, Globe2, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity";
import Link from "next/link";

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
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-200">
      
      <div className="container mx-auto max-w-5xl px-6 flex flex-col items-center pt-24 pb-24">
        
        {/* Hero */}
        <AnimateIn delay={0.1} className="w-full flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white border border-slate-200 shadow-sm mb-6">
            <Globe2 className="w-4 h-4 text-blue-600" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-600">
              World Currency Guide
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900">
            世界の両替事情
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mb-10">
            旅行先を選ぶと、現金とカードの比率、安全なATM、そして一番お得な両替方法が一目でわかります。手数料の損を防ぐ完全ガイド。
          </p>

          <div className="w-full max-w-xl relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="国名や都市名で検索..." 
              className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </AnimateIn>

        {/* 広告スペース */}
        <AnimateIn delay={0.2} className="w-full max-w-3xl mb-12">
          <div className="w-full bg-white border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 text-sm h-20 shadow-sm">
            [ AdSense / Sponsor Banner Space ]
          </div>
        </AnimateIn>

        {/* Bento Grid (国一覧) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCountries.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400 font-mono text-sm">
              該当する国が見つかりません
            </div>
          ) : (
            filteredCountries.map((country: any, i: number) => (
              <AnimateIn key={country.slug} delay={0.05 + (i * 0.03)}>
                <Link href={`/country/${country.slug}`} className="block group cursor-pointer h-full">
                  <div className="w-full h-full bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                    
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {country.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                              {country.catchphrase || '詳細を見る'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className="text-lg font-mono font-bold text-slate-700">{country.currency}</p>
                          {country.lastUpdated && (
                            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Updated {country.lastUpdated.replace('-', '.').substring(0, 7)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                            <span>現金派</span>
                            <span>{country.cashRatio || 0}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${country.cashRatio || 0}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-600 pt-3 border-t border-slate-100">
                          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span>最適解: <strong className="text-slate-800 font-semibold">
                            {country.bestExchange === 'japan' ? '日本国内' : 
                             country.bestExchange === 'local_airport' ? '現地空港' : 
                             country.bestExchange === 'local_city' ? '現地市街地' : 
                             country.bestExchange === 'atm_cashing' ? 'ATMキャッシング' : 
                             country.bestExchange === 'wise' ? 'Wise / オンライン' : '未設定'}
                          </strong></span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>ATM安全性: <strong className="text-slate-800 font-semibold">
                            {country.atmSafety === 'high' ? '安全' : 
                             country.atmSafety === 'medium' ? '普通' : 
                             country.atmSafety === 'low' ? '危険' : '未設定'}
                          </strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                      <span>詳細な決済・両替ガイド</span>
                      <ArrowRight className="w-4 h-4" />
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
