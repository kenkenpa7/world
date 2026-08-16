export function SplineBackground({ url }: { url: string }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
      <iframe 
        src={url} 
        frameBorder="0" 
        width="100%" 
        height="100%" 
        className="w-full h-full pointer-events-auto scale-[1.02] origin-center"
      />
      
      {/* 念のため右下のロゴがあった位置を物理的にガードしてクリックを防止 */}
      <div className="absolute bottom-0 right-0 w-40 h-16 bg-[#050505] pointer-events-auto z-50"></div>

      {/* ミニマルダーク用のシャドウオーバーレイ */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none"></div>
    </div>
  );
}
