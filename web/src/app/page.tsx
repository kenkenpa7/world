"use client";

import { useEffect, useState } from "react";
import { SplineBackground } from "@/components/SplineBackground";
import { AnimateIn } from "@/components/AnimateIn";
import { Search, Globe2, ShieldCheck, MapPin } from "lucide-react";
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

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // クライアント側でSanityから最新データをリアルタイム取得
    client.fetch(GROQ_QUERY).then((data) => {
      setCountries(data || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const filteredCountries = countries.filter((c) =>
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.currency || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen text-white/90 selection:bg-white/20">
      <SplineBackground url="https://my.spline.design/3dprojectionnoiseyachting-EPCgujQjMsZY8Aoxc2glwYh4-hYW/" />
      
      <div className="container mx-auto max-w-5xl px-6 flex flex-col items-center relative z-10 pointer-events-none pt-32 pb-24">
        
        {/* Hero */}
        <AnimateIn delay={0.2} className="w-full flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Globe2 className="w-4 h-4 text-white/70" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/70">
              World Currency Guide
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white drop-shadow-2xl">
            世界の両替事情
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed mb-12">
            旅行先を選ぶと、現金とカードの比率、安全なATM、そして一番お得な両替方法が一目でわかります。もう手数料で損をすることはありません。
          </p>

          <div className="w-full max-w-xl relative pointer-events-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="国名や都市名で検索..." 
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 backdrop-blur-xl transition-all"
            />
          </div>
        </AnimateIn>

        {/* 広告スペース */}
        <AnimateIn delay={0.4} className="w-full max-w-3xl mb-16 pointer-events-auto">
          <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-white/30 text-sm backdrop-blur-sm h-24">
            [ AdSense / Sponsor Banner Space ]
          </div>
        </AnimateIn>

        {/* Bento Grid (国一覧) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
          {loading ? (
            <div className="col-span-full text-center py-12 text-white/40 font-mono text-sm">
              Sanityから最新データを読み込み中...
            </div>
          ) : filteredCountries.length === 0 ? (
            <div className="col-span-full text-center py-12 text-white/40 font-mono text-sm">
              該当する国が見つかりません
            </div>
          ) : (
            filteredCountries.map((country: any, i: number) => (
              <AnimateIn key={country.slug} delay={0.1 + (i * 0.05)}>
                <Link href={`/country/${country.slug}`} className="block group cursor-pointer h-full">
                  <div className="w-full h-full bg-black/60 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl hover:bg-black/80 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                    
                    {/* カードHover時の光沢エフェクト */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                          {country.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs tracking-wider text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded-full">
                            {country.catchphrase || 'Details &rsaquo;'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-xl font-mono text-white/80">{country.currency}</p>
                        {country.lastUpdated && (
                          <p className="text-[10px] text-white/30 mt-1 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-green-500/50"></span>
                            Updated {country.lastUpdated.replace('-', '.').substring(0, 7)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                      <div>
                        <div className="flex justify-between text-xs text-white/60 mb-2">
                          <span>現金派</span>
                          <span>{country.cashRatio || 0}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/80 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${country.cashRatio || 0}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-white/70 pt-2 border-t border-white/5">
                        <MapPin className="w-4 h-4 text-white/40" />
                        <span>最適解: <strong className="text-white font-medium">
                          {country.bestExchange === 'japan' ? '日本国内' : 
                           country.bestExchange === 'local_airport' ? '現地空港' : 
                           country.bestExchange === 'local_city' ? '現地市街地' : 
                           country.bestExchange === 'atm_cashing' ? 'ATMキャッシング' : 
                           country.bestExchange === 'wise' ? 'Wise / オンライン' : '未設定'}
                        </strong></span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-white/70">
                        <ShieldCheck className="w-4 h-4 text-white/40" />
                        <span>ATM安全性: <strong className="text-white font-medium">
                          {country.atmSafety === 'high' ? '安全' : 
                           country.atmSafety === 'medium' ? '普通' : 
                           country.atmSafety === 'low' ? '危険' : '未設定'}
                        </strong></span>
                      </div>
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
