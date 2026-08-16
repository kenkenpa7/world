import { client, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wallet, Landmark, Train, HeartHandshake, ShieldCheck, MapPin, Info, Utensils } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { PortableText } from '@portabletext/react';

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

  const getExchangeLabel = (val: string) => {
    switch (val) {
      case 'japan': return '日本国内';
      case 'local_airport': return '現地空港';
      case 'local_city': return '現地市街地';
      case 'atm_cashing': return 'ATMキャッシング';
      case 'wise': return 'Wise / オンライン';
      default: return '未設定';
    }
  };

  const getSafetyLabel = (val: string) => {
    switch (val) {
      case 'high': return '安全';
      case 'medium': return '普通';
      case 'low': return '危険';
      default: return '未設定';
    }
  };

  const portableTextComponents = {
    block: {
      h2: ({children}: any) => <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4 flex items-center gap-2"><Info className="w-5 h-5 text-white/50" />{children}</h2>,
      h3: ({children}: any) => <h3 className="text-xl font-bold text-white/90 mt-8 mb-4 border-l-2 border-white/20 pl-3">{children}</h3>,
      normal: ({children}: any) => <p className="text-white/70 leading-loose mb-6">{children}</p>,
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white/90 selection:bg-white/20 pb-24">
      {/* 簡易ヘッダー */}
      <div className="w-full border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Back to List</span>
          </Link>
          <div className="text-sm font-medium tracking-widest text-white/80">World Currency Guide</div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 mt-16">
        <AnimateIn>
          {/* ヒーローセクション */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16 border-b border-white/10 pb-16">
            {country.flag ? (
              <img 
                src={urlFor(country.flag).width(400).url()} 
                alt={`${country.name} Flag`} 
                className="w-48 h-auto rounded-lg shadow-2xl border border-white/10"
              />
            ) : (
              <div className="w-48 h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/20 text-sm">
                No Flag
              </div>
            )}
            
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white">
                {country.name}
              </h1>
              <div className="flex items-center flex-wrap gap-4 text-white/60 text-lg">
                <span className="font-mono bg-white/10 px-3 py-1 rounded-md text-white">{country.currency}</span>
                {country.catchphrase && (
                  <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 px-3 py-1 rounded-full text-white/90 text-sm">
                    {country.catchphrase}
                  </span>
                )}
                {country.lastUpdated && (
                  <span className="text-xs flex items-center gap-1 text-white/40">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
                    Updated {country.lastUpdated}
                  </span>
                )}
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* トップ広告スペース */}
        <AnimateIn delay={0.2} className="w-full mb-16">
          <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-white/30 text-sm h-24">
            [ AdSense / Sponsor Banner Space ]
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 現金 vs カード 比率 */}
          <AnimateIn delay={0.3} className="bg-black/60 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6 text-xl font-bold text-white">
              <Wallet className="w-5 h-5 text-white/60" />
              1. 現金とカード、どっちが必要？
            </div>
            
            <div className="relative pt-8 pb-4">
              <div className="flex justify-between text-sm text-white/60 mb-3">
                <span>完全キャッシュレス (0%)</span>
                <span>現金主義 (100%)</span>
              </div>
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                  style={{ width: `${country.cashRatio || 0}%` }}
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-white/60">現金が必要な割合</p>
                <p className="text-4xl font-extrabold text-white mt-1">{country.cashRatio || 0}<span className="text-xl text-white/50">%</span></p>
              </div>
            </div>
          </AnimateIn>

          {/* 最適な両替場所 */}
          <AnimateIn delay={0.4} className="bg-black/60 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6 text-xl font-bold text-white">
              <Landmark className="w-5 h-5 text-white/60" />
              2. どこで両替するのがお得？
            </div>
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <span className="text-sm text-white/50 mb-2">【結論】最適解はここ！</span>
              <span className="text-3xl font-bold text-white mb-4">{getExchangeLabel(country.bestExchange)}</span>
              
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm">
                <ShieldCheck className="w-4 h-4 text-white/50" />
                <span className="text-white/70">ATMの安全性: <strong className="text-white">{getSafetyLabel(country.atmSafety)}</strong></span>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* シーン別早見表＆チップ */}
        <AnimateIn delay={0.5} className="bg-black/60 border border-white/10 rounded-3xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4 text-base font-bold text-white">
                <Train className="w-4 h-4 text-white/60" />
                交通機関
              </div>
              <p className="text-white/70 text-sm">{country.sceneTransport || "データなし"}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4 text-base font-bold text-white">
                <Utensils className="w-4 h-4 text-white/60" />
                飲食店・屋台
              </div>
              <p className="text-white/70 text-sm">{country.sceneFood || "データなし"}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4 text-base font-bold text-white">
                <HeartHandshake className="w-4 h-4 text-white/60" />
                チップ文化
              </div>
              <p className="text-white/70 text-sm">
                <strong className="text-white">{country.tipping ? "あり (必須・推奨)" : "なし (不要)"}</strong><br/>
                <span className="text-white/40 text-xs mt-1 block">
                  {country.tipping ? "現金でチップを渡す文化があるため少額紙幣を持っておくと便利です。" : "特別なサービスを受けた場合を除き、基本的にチップは不要です。"}
                </span>
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* リッチテキストによる詳細解説 */}
        <AnimateIn delay={0.6} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
           {country.content ? (
             <div className="prose prose-invert max-w-none">
               <PortableText value={country.content} components={portableTextComponents} />
             </div>
           ) : (
             <div className="text-white/70 leading-loose">
               詳細記事がまだ登録されていません。
             </div>
           )}
        </AnimateIn>

        {/* ボトム広告スペース */}
        <AnimateIn delay={0.7} className="w-full mb-16">
          <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-white/30 text-sm h-32">
            [ Affiliate Link / Credit Card Recommend Space ]
          </div>
        </AnimateIn>
        
        {/* 免責事項 */}
        <div className="text-center text-white/30 text-xs mt-16 border-t border-white/5 pt-8">
          ※本サイトの情報はAI調査に基づく参考情報です。現地の決済事情や手数料は変動するため、渡航前に最新の公式情報等をご確認ください。
        </div>
      </div>
    </main>
  );
}
