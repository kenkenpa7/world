const fs = require('fs');

const createBlock = (text, style = 'normal') => ({
  _type: 'block',
  style,
  children: [{ _type: 'span', marks: [], text }]
});

const today = new Date().toISOString().split('T')[0]; // "2026-08-10"

const countries = [
  {
    _type: "country",
    _id: "country-hawaii",
    name: "Hawaii (USA)",
    slug: { _type: "slug", current: "hawaii" },
    lastUpdated: today,
    catchphrase: "完全キャッシュレス社会",
    currency: "USD / 米ドル",
    cashRatio: 15,
    bestExchange: "japan",
    atmSafety: "high",
    tipping: true,
    sceneTransport: "配車アプリ(Uber)やクレカ",
    sceneFood: "フードコートも含め95%カードOK",
    summary: "ハワイは世界有数のキャッシュレス社会です。チップ用に1ドル札を数枚持つだけで十分です。",
    content: [
      createBlock("ハワイ（アメリカ）の決済事情", "h2"),
      createBlock("クレジットカード（特にVISA/Mastercard、JCB）がほぼ全ての場所で使えます。"),
      createBlock("現金が必要なシーン", "h3"),
      createBlock("・ザ・バス（市バス）に乗る時の現金払い（お釣りが出ません）\n・ホテルのベッドメイキングのチップ（1日1〜2ドル）\n・一部のファーマーズマーケット"),
      createBlock("両替の最適解", "h3"),
      createBlock("米ドルは日本国内（空港や金券ショップ）で少しだけ両替していくのが一番お得です。大金を持ち歩く必要はありません。")
    ]
  },
  {
    _type: "country",
    _id: "country-korea",
    name: "South Korea",
    slug: { _type: "slug", current: "korea" },
    lastUpdated: today,
    catchphrase: "超クレカ社会",
    currency: "KRW / ウォン",
    cashRatio: 5,
    bestExchange: "local_city",
    atmSafety: "high",
    tipping: false,
    sceneTransport: "T-money等の交通IC・アプリ",
    sceneFood: "屋台以外は100%カード決済",
    summary: "屋台や一部のローカル市場を除き、ほぼ100%カード決済が可能です。WOWPASSも大流行中。",
    content: [
      createBlock("韓国の決済事情", "h2"),
      createBlock("『超』がつくほどのクレジットカード・キャッシュレス社会です。"),
      createBlock("現金が必要なシーン", "h3"),
      createBlock("・屋台での買い食い\n・ローカルな市場（広蔵市場など）\n・交通系ICカード（T-money）へのチャージ（基本現金のみ）"),
      createBlock("両替の最適解", "h3"),
      createBlock("日本の空港で両替すると大損します。韓国現地の市街地（明洞など）にある公認両替所、またはWiseのデビットカードでの現地ATMキャッシングが最もレートが良くお得です。")
    ]
  },
  {
    _type: "country",
    _id: "country-taiwan",
    name: "Taiwan",
    slug: { _type: "slug", current: "taiwan" },
    lastUpdated: today,
    catchphrase: "現金派とカード派の半々",
    currency: "TWD / 台湾ドル",
    cashRatio: 60,
    bestExchange: "local_airport",
    atmSafety: "high",
    tipping: false,
    sceneTransport: "悠遊カード（EasyCard）必須",
    sceneFood: "夜市や個人店は現金のみが多い",
    summary: "夜市やローカルな食堂などでは依然として『現金のみ』の場所が多く残っています。",
    content: [
      createBlock("台湾の決済事情", "h2"),
      createBlock("近年キャッシュレス化が進んでいますが、旅行費用の半分以上は現金で持っておくのが安心です。"),
      createBlock("現金が必要なシーン", "h3"),
      createBlock("・夜市（ナイトマーケット）での食事\n・個人経営の飲食店やローカル食堂\n・流しのタクシー（カード不可の車両あり）\n・悠遊カードの現金チャージ"),
      createBlock("両替の最適解", "h3"),
      createBlock("日本の空港で行うとレートが悪いため、台湾に到着後、現地の空港（松山・桃園）の銀行窓口で行うのが最も定番でお得な方法です。")
    ]
  },
  {
    _type: "country",
    _id: "country-thailand",
    name: "Thailand",
    slug: { _type: "slug", current: "thailand" },
    lastUpdated: today,
    catchphrase: "ローカルは現金主義",
    currency: "THB / バーツ",
    cashRatio: 80,
    bestExchange: "local_city",
    atmSafety: "medium",
    tipping: true,
    sceneTransport: "BTS/MRT券売機・トゥクトゥクは現金",
    sceneFood: "屋台や食堂はほぼ現金必須",
    summary: "大型モールではカードが使えますが、屋台、トゥクトゥク、マッサージ店では『現金』が絶対の主役です。",
    content: [
      createBlock("タイの決済事情", "h2"),
      createBlock("現地人はQR決済（PromptPay）を使いますが、旅行者にはハードルが高いため現金が必須になります。"),
      createBlock("現金が必要なシーン", "h3"),
      createBlock("・屋台での食事や買い物\n・トゥクトゥクやソンテウの運賃\n・街のマッサージ店\n・チップ（ホテルやマッサージ等）"),
      createBlock("両替の最適解", "h3"),
      createBlock("日本で両替すると非常にレートが悪いです。タイ現地の市街地にある優良両替所（Superrichなど）が圧倒的にレートが良くおすすめです。")
    ]
  },
  {
    _type: "country",
    _id: "country-singapore",
    name: "Singapore",
    slug: { _type: "slug", current: "singapore" },
    lastUpdated: today,
    catchphrase: "キャッシュレス先進国",
    currency: "SGD / シンガポールドル",
    cashRatio: 10,
    bestExchange: "atm_cashing",
    atmSafety: "high",
    tipping: false,
    sceneTransport: "クレカのタッチ決済でそのまま乗車可",
    sceneFood: "ホーカー以外は全てカードOK",
    summary: "地下鉄やバスもクレジットカードのタッチ決済でそのまま乗れる、東南アジア随一のキャッシュレス先進国です。",
    content: [
      createBlock("シンガポールの決済事情", "h2"),
      createBlock("ほとんどの場所でクレジットカード決済が普及しており、現金を使う機会は非常に少ないです。"),
      createBlock("現金が必要なシーン", "h3"),
      createBlock("・ローカルな屋台街（ホーカーセンター）の一部店舗\n・少額の買い物"),
      createBlock("両替の最適解", "h3"),
      createBlock("日本からの現金持ち込みは最小限にし、足りない分だけチャンギ空港や街中の安全なATMでキャッシングするのが最もスマートでコストを抑えられます。")
    ]
  }
];

const ndjson = countries.map(c => JSON.stringify(c)).join('\n');
fs.writeFileSync('seed-data-v2.ndjson', ndjson);
console.log('Generated seed-data-v2.ndjson');
