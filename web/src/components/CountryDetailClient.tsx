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

      <div className="max-w-4xl mx-auto px-4 pt-5 space-y-5">
        <AnimateIn>
          {/* ① 基本の決済事情と使い分け */}
          <section className="bg-white border border-slate-300 rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-slate-200">
              {country.countryCode ? (
                <img src={`https://flagcdn.com/w80/${country.countryCode}.png`} alt={`${country.name} flag`} className="w-12 sm:w-16 h-auto shadow-sm border border-slate-100 rounded-md" />
              ) : (
                <span className="text-4xl">🏳️</span>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{country.name || "未設定"}</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-bold mt-0.5">
                  通貨: {country.currency || "未設定"}
                </p>
              </div>
            </div>

            <div className="mt-3 sm:mt-4">
              <h2 className="text-sm sm:text-base font-black text-slate-800 mb-1.5 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                基本的な決済事情
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3 sm:mb-4">
                {country.summary || "データが未入力です。"}
              </p>
            </div>

            {/* 情報整理パネル */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-center min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-0.5">キャッシュレス普及率</span>
                <div className="flex items-baseline gap-0.5 break-words">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">{country.cashlessRate ?? "-"}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500">%</span>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-center min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 block mb-1 leading-snug">おすすめ現金所持目安<br/>(3泊4日)</span>
                <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 break-words leading-tight">{country.recommendedCash || "-"}</div>
                <span className="text-[9px] sm:text-[11px] text-slate-500 font-medium block mt-0.5 leading-tight">{country.recommendedCashLocal || "-"}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 block mb-1.5">おすすめの使い分けスタイル</span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed whitespace-pre-line break-words">
                  {country.usageStyle || "データ未入力"}
                </p>
              </div>
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          {/* ② お得な両替・現金調達の優先順位 */}
          <section className="bg-white border border-slate-300 rounded-2xl shadow-sm p-4 sm:p-5 border-l-4 border-l-blue-500">
            <h2 className="text-base font-black text-slate-900 tracking-wider flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              お得な両替・現金調達の優先順位
            </h2>

            <p className="text-sm sm:text-base text-slate-700 mb-3 font-bold">【おすすめの調達方法】</p>
            <div className="space-y-3 mb-5">
              {Array.isArray(country.exchangeRankingTop) && country.exchangeRankingTop.length > 0 ? (
                country.exchangeRankingTop.map((item: any, i: number) => (
                  <div key={i} className={`flex items-start gap-3 p-3 sm:p-4 bg-white border rounded-xl shadow-sm ${i === 0 ? 'border-blue-200' : 'border-blue-100'}`}>
                    <span className={`text-xl font-black w-10 text-center ${i === 0 ? 'text-blue-600' : 'text-blue-500'}`}>{item.rank}</span>
                    <div>
                      <div className="text-base font-bold text-slate-900 leading-tight">{item.title}</div>
                      <div className="text-sm text-slate-600 mt-1.5 leading-relaxed">{item.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">データ未入力</div>
              )}
            </div>
            
            <p className="text-sm sm:text-base text-slate-700 mb-3 font-bold text-red-600 border-t border-slate-200 pt-4">【おすすめしない調達方法】</p>
            <div className="space-y-3">
              {Array.isArray(country.exchangeNotRecommended) && country.exchangeNotRecommended.length > 0 ? (
                country.exchangeNotRecommended.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-base font-bold text-slate-700 leading-tight">{item.title}</div>
                      <div className="text-sm text-slate-500 mt-1.5 leading-relaxed">{item.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">データ未入力</div>
              )}
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          {/* ③ お得な両替所の詳しい情報 */}
          <section className="bg-white border border-slate-300 rounded-2xl shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-black text-slate-900 tracking-wider flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
              <MapPin className="w-5 h-5 text-blue-600" />
              お得な両替所の詳しい情報
            </h2>
            <div className="bg-blue-50/50 p-4 sm:p-5 rounded-xl border border-blue-100">
              {country.exchangeDetails ? (
                <PortableText value={country.exchangeDetails} components={portableTextComponents} />
              ) : (
                <div className="text-sm text-slate-500">データ未入力</div>
              )}
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          {/* ④ 現地キャッシングのお得な活用法 */}
          <section className="bg-white border border-slate-300 rounded-2xl shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-black text-slate-900 tracking-wider flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
              <Landmark className="w-5 h-5 text-blue-600" />
              現地キャッシングのお得な活用法
            </h2>
            <div className="bg-blue-50/50 p-4 sm:p-5 rounded-xl border border-blue-100">
              {country.atmDetails ? (
                <PortableText value={country.atmDetails} components={portableTextComponents} />
              ) : (
                <div className="text-sm text-slate-500">データ未入力</div>
              )}
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.4}>
          {/* ⑤ 利用シーン別のおすすめ決済 */}
          <section className="bg-white border border-slate-300 rounded-2xl shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-black text-slate-900 tracking-wider flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              利用シーン別のおすすめ決済
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-base font-black text-slate-900 mb-3">
                  <Train className="w-5 h-5 text-blue-600" />
                  交通機関・移動
                </div>
                <div className="text-sm sm:text-base text-slate-700 space-y-2">
                  {country.sceneTransport ? (
                    <PortableText value={country.sceneTransport} components={portableTextComponents} />
                  ) : (
                    <div>データ未入力</div>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-base font-black text-slate-900 mb-3">
                  <Utensils className="w-5 h-5 text-blue-600" />
                  飲食・ショッピング
                </div>
                <div className="text-sm sm:text-base text-slate-700 space-y-2">
                  {country.sceneFood ? (
                    <PortableText value={country.sceneFood} components={portableTextComponents} />
                  ) : (
                    <div>データ未入力</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </AnimateIn>

        <AnimateIn delay={0.5}>
          {/* ⑥ 現地で役立つアイテム・知っておくとお得なコツ */}
          <section className="bg-white border border-slate-300 rounded-2xl shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-black text-slate-900 tracking-wider flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              現地で役立つアイテム・知っておくと得するコツ
            </h2>
            
            {country.cardItem && (
              <div className="mb-5 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm sm:text-base font-bold text-blue-600 mb-2">【必須カードやアプリ】</p>
                <div className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed">
                  <PortableText value={country.cardItem} components={portableTextComponents} />
                </div>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700">
              <p className="font-bold text-slate-800">【知っておくと得するコツ】</p>
              {country.checklist ? (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <PortableText value={country.checklist} components={portableTextComponents} />
                </div>
              ) : (
                <div className="text-slate-500">データ未入力</div>
              )}
            </div>
          </section>
        </AnimateIn>

      </div>
    </main>
  );
}
