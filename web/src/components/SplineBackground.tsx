export function SplineBackground({ url }: { url: string }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50">
      <iframe 
        src={url} 
        frameBorder="0" 
        width="100%" 
        height="100%" 
        className="w-full h-full pointer-events-auto scale-[1.02] origin-center opacity-85"
      />
      
      {/* 右下のロゴ位置を白背景でガード */}
      <div className="absolute bottom-0 right-0 w-40 h-16 bg-slate-50 pointer-events-auto z-50"></div>

      {/* 白テーマ用のソフトグラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-transparent to-slate-50/90 pointer-events-none"></div>
    </div>
  );
}
