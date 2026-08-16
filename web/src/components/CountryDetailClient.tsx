"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { 
  ArrowLeft, Info, TrendingUp, Lightbulb, ShoppingBag, 
  Train, Utensils, CheckCircle2, AlertCircle, 
  MapPin, Landmark 
} from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { PortableText } from '@portabletext/react';

export function CountryDetailClient({ initialData, slug }: { initialData: any, slug: string }) {
  const [country, setCountry] = useState<any>(initialData);

  useEffect(() => {
    // 全フィールドを取るようにクエリを調整
    const query = `*[_type == "country" && slug.current == $slug][0]`;
    client.fetch(query, { slug }, { cache: "no-store", next: { revalidate: 0 } }).then((freshData) => {
      if (freshData) {
        setCountry(freshData);
      }
    });
  }, [slug]);

  if (!country) {
    return (
      <div className="min-h-screen bg-[#ebedf2] text-[#0f172a] flex items-center justify-center">
        読み込み中...
      </div>
    );
  }

  const portableTextComponents = {
    block: {
      normal: ({children}: any) => <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3">{children}</p>,
      h3: ({children}: any) => <h3 className="text-base font-bold text-slate-900 mb-2">{children}</h3>,
    },
    marks: {
      strong: ({children}: any) => <strong className="font-bold text-slate-900">{children}</strong>,
    }
  };

  return (
    <main className="min-h-screen bg-[#ebedf2] text-[#0f172a] selection:bg-blue-600 selection:text-white pb-24 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-300 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>国一覧に戻る</span>
          </Link>
          <div className="text-sm font-black tracking-wide text-slate-800">世界の両替・決済データベース</div>
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-8 sm:space-y-12 relative z-10">
        <AnimateIn>
          {/* ① 基本の決済事情と使い分け */}
          <section className="w-full bg-white/40 border border-white/60 p-2 sm:p-2.5 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
            <div className="w-full h-full bg-white/90 border border-white p-6 sm:p-8 rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.02)] relative overflow-hidden">
              
              <div className="flex items-center gap-4 sm:gap-6 pb-6 border-b border-slate-100 relative z-10">
                {country.countryCode ? (
                  <img src={`https://flagcdn.com/w80/${country.countryCode}.png`} alt={`${country.name} flag`} className="w-16 sm:w-24 h-auto shadow-sm border border-slate-100 rounded-md" />
                ) : (
                  <span className="text-5xl sm:text-7xl">🏳️</span>
                )}
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{country.name || "未設定"}</h1>
                  <p className="text-sm sm:text-base text-slate-400 font-bold mt-1 tracking-widest uppercase">
                    Currency: {country.currency || "未設定"}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 relative z-10">
                <h2 className="text-sm sm:text-sm font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Info className="w-4 h-4 text-blue-600" />
                  </span>
                  基本的な決済事情
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium mb-6">
                  {country.summary || "データが未入力です。"}
                </p>
              </div>

              {/* 情報整理パネル */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 relative z-10">
                <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Cashless Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">{country.cashlessRate ?? "-"}</span>
                    <span className="text-sm font-bold text-slate-400">%</span>
                  </div>
                </div>
                <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 leading-snug">Recommended Cash<br/><span className="text-[10px]">(3泊4日)</span></span>
                  <div className="text-lg font-black text-slate-900 break-words leading-tight">{country.recommendedCash || "-"}</div>
                  <span className="text-xs text-slate-500 font-medium block mt-1">{country.recommendedCashLocal || "-"}</span>
                </div>
                <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Usage Style</span>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed whitespace-pre-line break-words">
                    {country.usageStyle || "データ未入力"}
                  </p>
                </div>
              </div>
              
              {/* Subtle background glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-400/5 blur-3xl rounded-full opacity-100 pointer-events-none" />
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          {/* ② お得な両替・現金調達の優先順位 */}
          <section className="w-full bg-white/40 border border-white/60 p-2 sm:p-2.5 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
            <div className="w-full h-full bg-white/90 border border-white p-6 sm:p-8 rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.02)]">
              <h2 className="text-sm sm:text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </span>
                お得な両替・現金調達の優先順位
              </h2>

              <p className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-wider">【おすすめの調達方法】</p>
              <div className="space-y-4 mb-8">
                {Array.isArray(country.exchangeRankingTop) && country.exchangeRankingTop.length > 0 ? (
                  country.exchangeRankingTop.map((item: any, i: number) => (
                    <div key={i} className={`flex items-start gap-4 p-5 sm:p-6 bg-slate-50/50 border rounded-2xl shadow-sm transition-all duration-500 ease-spring hover:shadow-md hover:scale-[1.01] ${i === 0 ? 'border-blue-200/60' : 'border-slate-200/60'}`}>
                      <span className={`text-2xl font-black shrink-0 ${i === 0 ? 'text-blue-600' : 'text-blue-400'}`}>{item.rank}</span>
                      <div>
                        <div className="text-base sm:text-lg font-black text-slate-900 leading-tight mb-2">{item.title}</div>
                        <div className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">{item.description}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">データ未入力</div>
                )}
              </div>
              
              <p className="text-sm text-red-400 mb-4 font-bold uppercase tracking-wider border-t border-slate-100 pt-8">【おすすめしない調達方法】</p>
              <div className="space-y-4">
                {Array.isArray(country.exchangeNotRecommended) && country.exchangeNotRecommended.length > 0 ? (
                  country.exchangeNotRecommended.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-5 sm:p-6 bg-red-50/30 border border-red-100/50 rounded-2xl transition-all duration-500 ease-spring hover:bg-red-50/50">
                      <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </span>
                      <div>
                        <div className="text-base sm:text-lg font-black text-slate-900 leading-tight mb-2">{item.title}</div>
                        <div className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">{item.description}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">データ未入力</div>
                )}
              </div>
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          {/* ③ お得な両替所の詳しい情報 */}
          <section className="w-full bg-white/40 border border-white/60 p-2 sm:p-2.5 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
            <div className="w-full h-full bg-white/90 border border-white p-6 sm:p-8 rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.02)]">
              <h2 className="text-sm sm:text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </span>
                お得な両替所の詳しい情報
              </h2>
              <div className="bg-slate-50/50 p-5 sm:p-6 rounded-2xl border border-slate-200/60 leading-relaxed text-slate-700">
                {country.exchangeDetails ? (
                  <PortableText value={country.exchangeDetails} components={portableTextComponents} />
                ) : (
                  <div className="text-sm text-slate-400">データ未入力</div>
                )}
              </div>
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          {/* ④ 現地キャッシングのお得な活用法 */}
          <section className="w-full bg-white/40 border border-white/60 p-2 sm:p-2.5 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
            <div className="w-full h-full bg-white/90 border border-white p-6 sm:p-8 rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.02)]">
              <h2 className="text-sm sm:text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Landmark className="w-4 h-4 text-blue-600" />
                </span>
                現地キャッシングのお得な活用法
              </h2>
              <div className="bg-slate-50/50 p-5 sm:p-6 rounded-2xl border border-slate-200/60 leading-relaxed text-slate-700">
                {country.atmDetails ? (
                  <PortableText value={country.atmDetails} components={portableTextComponents} />
                ) : (
                  <div className="text-sm text-slate-400">データ未入力</div>
                )}
              </div>
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.4}>
          {/* ⑤ 利用シーン別のおすすめ決済 */}
          <section className="w-full bg-white/40 border border-white/60 p-2 sm:p-2.5 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
            <div className="w-full h-full bg-white/90 border border-white p-6 sm:p-8 rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.02)]">
              <h2 className="text-sm sm:text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                </span>
                利用シーン別のおすすめ決済
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/50 border border-slate-200/60 transition-all duration-500 ease-spring hover:shadow-sm">
                  <div className="flex items-center gap-3 text-lg font-black text-slate-900 mb-4">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Train className="w-4 h-4 text-slate-600" />
                    </span>
                    交通機関・移動
                  </div>
                  <div className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {country.sceneTransport ? (
                      <PortableText value={country.sceneTransport} components={portableTextComponents} />
                    ) : (
                      <div>データ未入力</div>
                    )}
                  </div>
                </div>
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/50 border border-slate-200/60 transition-all duration-500 ease-spring hover:shadow-sm">
                  <div className="flex items-center gap-3 text-lg font-black text-slate-900 mb-4">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4 text-slate-600" />
                    </span>
                    飲食・ショッピング
                  </div>
                  <div className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {country.sceneFood ? (
                      <PortableText value={country.sceneFood} components={portableTextComponents} />
                    ) : (
                      <div>データ未入力</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.5}>
          {/* ⑥ 現地で役立つアイテム・知っておくとお得なコツ */}
          <section className="w-full bg-white/40 border border-white/60 p-2 sm:p-2.5 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
            <div className="w-full h-full bg-white/90 border border-white p-6 sm:p-8 rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.02)]">
              <h2 className="text-sm sm:text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </span>
                現地で役立つアイテム・知っておくと得するコツ
              </h2>
              
              {country.cardItem && (
                <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-blue-50/30 border border-blue-100/50">
                  <p className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">必須カードやアプリ</p>
                  <div className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                    <PortableText value={country.cardItem} components={portableTextComponents} />
                  </div>
                </div>
              )}

              <div className="text-sm sm:text-base text-slate-700 font-medium">
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">知っておくと得するコツ</p>
                {country.checklist ? (
                  <div className="bg-slate-50/50 border border-slate-200/60 p-5 sm:p-6 rounded-2xl leading-relaxed">
                    <PortableText value={country.checklist} components={portableTextComponents} />
                  </div>
                ) : (
                  <div className="text-slate-400">データ未入力</div>
                )}
              </div>
            </div>
          </section>
        </AnimateIn>

      </div>
    </main>
  );
}
