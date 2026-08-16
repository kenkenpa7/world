import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'country',
  title: 'Country (国ごとの両替事情)',
  type: 'document',
  fields: [
    // --- 基本情報 ---
    defineField({
      name: 'name',
      title: '国名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL(英語小文字)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'countryCode',
      title: '国コード (例: jp, us, tw, us-hi)',
      type: 'string',
    }),
    defineField({
      name: 'currency',
      title: '通貨名 (例: KRW / ウォン / ₩)',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: '基本的な決済事情 (長文サマリー)',
      type: 'text',
      rows: 3,
    }),
    // --- 3行構成（一覧ページ用） ---
    defineField({
      name: 'paymentSummary',
      title: '【一覧用】決済事情の一言 (例: 屋台以外はカードが普及)',
      type: 'string',
    }),
    defineField({
      name: 'exchangeSummary',
      title: '【一覧用】両替ポイントの一言 (例: 現地のATMキャッシングがお得)',
      type: 'string',
    }),
    defineField({
      name: 'trivia',
      title: '【一覧用】プチ情報の一言 (例: 悠遊カードがあると便利)',
      type: 'string',
    }),
    defineField({
      name: 'cashlessRate',
      title: 'キャッシュレス普及率 (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'recommendedCash',
      title: 'おすすめ現金所持目安 (日本円)',
      type: 'string',
      description: '例: 約 10,000 円分',
    }),
    defineField({
      name: 'recommendedCashLocal',
      title: 'おすすめ現金所持目安 (現地通貨)',
      type: 'string',
      description: '例: (約 90,000 ウォン)',
    }),
    defineField({
      name: 'usageStyle',
      title: 'おすすめの使い分けスタイル',
      type: 'text',
      rows: 3,
      description: '改行して記述 例:\nメイン: クレカ決済\nサブ: WOWPASS\n予備: 現金',
    }),

    // --- 両替・現金調達 ---
    defineField({
      name: 'exchangeRankingTop',
      title: 'おすすめの調達方法 (上位)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'rank', title: '順位 (例: 1位)', type: 'string' },
            { name: 'title', title: 'タイトル (例: 現地の市街地にある両替所)', type: 'string' },
            { name: 'description', title: '説明', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'exchangeNotRecommended',
      title: 'おすすめしない調達方法',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'タイトル (例: 日本の空港での事前両替)', type: 'string' },
            { name: 'description', title: '説明', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'exchangeDetails',
      title: 'お得な両替所の詳しい情報',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'atmDetails',
      title: '現地キャッシングのお得な活用法',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // --- シーン別決済 ---
    defineField({
      name: 'sceneTransport',
      title: '交通機関・移動',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sceneFood',
      title: '飲食・ショッピング',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // --- 便利アイテム・コツ ---
    defineField({
      name: 'cardItem',
      title: '持っておくと便利なアイテム・アプリ',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'checklist',
      title: '知っておくと得するコツ',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'currency',
    },
  },
})
