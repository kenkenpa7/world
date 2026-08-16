"use client";

import { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import { ArrowLeft, Wallet, Landmark, Train, HeartHandshake, ShieldCheck, Info, Utensils } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { PortableText } from '@portabletext/react';

export function CountryDetailClient({ initialData, slug }: { initialData: any, slug: string }) {
  const [country, setCountry] = useState<any>(initialData);

  useEffect(() => {
    const query = `*[_type == "country" && slug.current == $slug][0]`;
    client.fetch(query, { slug }, { cache: "no-store", next: { revalidate: 0 } }).then((freshData) => {
      if (freshData) {
        setCountry(freshData);
      }
    });
  }, [slug]);

  if (!country) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        読み込み中...
      </div>
    );
  }

  const getExchangeLabel = (val: string) => {
    switch (val) {
      case 'japan': return '日本国内';
      case 'local_airport': return '現地空港';
      case 'local_city': return '現地市街地';
      case 'atm_cashing': return 'ATMキャッシング';
      case 'wise': return 'Wise / オンライン';
      default: return val || '未設定';
    }
  };

  const getSafetyLabel = (val: string) => {
    switch (val) {
      case 'high': return '安全';
      case 'medium': return '普通';
      case 'low': return '危険';
      default: return val || '未設定';
    }
  };

  const portableTextComponents = {
    block: {
      h2: ({children}: any) => <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 border-b border-slate-200 pb-3 flex items-center gap-2"><Info className="w-5 h-5 text-blue-600" />{children}</h2>,
      h3: ({children}: any) => <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 border-l-4 border-blue-500 pl-3">{children}</h3>,
      normal: ({children}: any) => <p className="text-slate-700 leading-relaxed mb-6">{children}</p>,
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-200 pb-24">
      {/* ヘッダー */}
      <div className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>国一覧に戻る</span>
          </Link>
          <div className="text-sm font-semibold tracking-wide text-slate-800">World Currency Guide</div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 mt-12">
        <AnimateIn>
          {/* ヒーローセクション */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            {country.flag ? (
              <img 
                src={urlFor(country.flag).width(400).url()} 
                alt={`${country.name} Flag`} 
                className="w-44 h-auto rounded-xl shadow-md border border-slate-200"
              />
            ) : (
              <div className="w-44 h-28 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                No Flag
              </div>
            )}
            
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
                {country.name}
              </h1>
              <div className="flex items-center flex-wrap gap-3 text-slate-600 text-base">
                <span className="font-mono font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-800">{country.currency}</span>
                {country.catchphrase && (
                  <span className="bg-blue-50 border border-blue-200 text-blue-800 font-semibold px-3 py-1 rounded-full text-xs">
                    {country.catchphrase}
                  </span>
                )}
                {country.lastUpdated && (
                  <span className="text-xs flex items-center gap-1 text-slate-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Updated {country.lastUpdated}
                  </span>
                )}
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* トップ広告スペース */}
        <AnimateIn delay={0.1} className="w-full mb-10">
          <div className="w-full bg-white border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 text-sm h-20 shadow-sm">
            [ AdSense / Sponsor Banner Space ]
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 現金 vs カード 比率 */}
          <AnimateIn delay={0.2} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-lg font-bold text-slate-900">
              <Wallet className="w-5 h-5 text-blue-600" />
              1. 現金とカード、どっちが必要？
            </div>
            
            <div className="relative pt-4 pb-2">
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>完全キャッシュレス (0%)</span>
                <span>現金主義 (100%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
                  style={{ width: `${country.cashRatio || 0}%` }}
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500 font-medium">現金が必要な割合</p>
                <p className="text-4xl font-extrabold text-slate-900 mt-1">{country.cashRatio || 0}<span className="text-lg text-slate-500 font-normal">%</span></p>
              </div>
            </div>
          </AnimateIn>

          {/* 最適な両替場所 */}
          <AnimateIn delay={0.3} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4 text-lg font-bold text-slate-900">
              <Landmark className="w-5 h-5 text-blue-600" />
              2. どこで両替するのがお得？
            </div>
            <div className="flex flex-col items-center justify-center my-auto py-4 text-center">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">【結論】最適解はここ！</span>
              <span className="text-3xl font-extrabold text-slate-900 mb-4">{getExchangeLabel(country.bestExchange)}</span>
              
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-600">ATMの安全性: <strong className="text-slate-900">{getSafetyLabel(country.atmSafety)}</strong></span>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* シーン別早見表＆チップ */}
        <AnimateIn delay={0.4} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-sm font-bold text-slate-900">
                <Train className="w-4 h-4 text-blue-600" />
                交通機関
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{country.sceneTransport || "データなし"}</p>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-sm font-bold text-slate-900">
                <Utensils className="w-4 h-4 text-blue-600" />
                飲食店・屋台
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{country.sceneFood || "データなし"}</p>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-sm font-bold text-slate-900">
                <HeartHandshake className="w-4 h-4 text-blue-600" />
                チップ文化
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong className="text-slate-900">{country.tipping ? "あり (必須・推奨)" : "なし (不要)"}</strong><br/>
                <span className="text-slate-400 text-xs mt-1 block">
                  {country.tipping ? "現金でチップを渡す文化があるため少額紙幣を持っておくと便利です。" : "特別なサービスを受けた場合を除き、基本的にチップは不要です。"}
                </span>
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* リッチテキストによる詳細解説 */}
        <AnimateIn delay={0.5} className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
           {country.content ? (
             <div className="prose max-w-none text-slate-700">
               <PortableText value={country.content} components={portableTextComponents} />
             </div>
           ) : (
             <div className="text-slate-400 leading-relaxed text-sm">
               詳細記事がまだ登録されていません。
             </div>
           )}
        </AnimateIn>

        {/* ボトム広告スペース */}
        <AnimateIn delay={0.6} className="w-full mb-12">
          <div className="w-full bg-white border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 text-sm h-24 shadow-sm">
            [ Affiliate Link / Credit Card Recommend Space ]
          </div>
        </AnimateIn>
        
        {/* 免責事項 */}
        <div className="text-center text-slate-400 text-xs mt-12 border-t border-slate-200 pt-8">
          ※本サイトの情報は参考情報です。現地の決済事情や手数料は変動するため、渡航前に最新の公式情報等をご確認ください。
        </div>
      </div>
    </main>
  );
}
