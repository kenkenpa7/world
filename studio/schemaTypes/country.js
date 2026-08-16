import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'country',
  title: 'Country (国ごとの両替事情)',
  type: 'document',
  fields: [
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
      name: 'lastUpdated',
      title: '最終更新日',
      type: 'date',
      options: {
        dateFormat: 'YYYY.MM',
      }
    }),
    defineField({
      name: 'catchphrase',
      title: '一言タグ (例: 現金必須 / 超クレカ社会)',
      type: 'string',
    }),
    defineField({
      name: 'currency',
      title: '通貨名 (例: USD / 米ドル)',
      type: 'string',
    }),
    defineField({
      name: 'cashRatio',
      title: '現金が必要な割合 (%)',
      type: 'number',
      description: '0(完全キャッシュレス)〜100(完全現金主義)',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'bestExchange',
      title: '一番お得な両替方法',
      type: 'string',
      options: {
        list: [
          { title: '日本国内', value: 'japan' },
          { title: '現地空港', value: 'local_airport' },
          { title: '現地市街地', value: 'local_city' },
          { title: 'ATMキャッシング', value: 'atm_cashing' },
          { title: 'Wise / オンライン', value: 'wise' },
        ],
      },
    }),
    defineField({
      name: 'atmSafety',
      title: '現地ATMの安全性',
      type: 'string',
      options: {
        list: [
          { title: '安全 (High)', value: 'high' },
          { title: '普通 (Medium)', value: 'medium' },
          { title: '危険 (Low)', value: 'low' },
        ],
      },
    }),
    defineField({
      name: 'sceneTransport',
      title: '早見表：交通機関',
      type: 'string',
      description: '例: クレカタッチ決済OK / 現金のみ',
    }),
    defineField({
      name: 'sceneFood',
      title: '早見表：飲食店・屋台',
      type: 'string',
      description: '例: 大型店はカード、屋台は現金',
    }),
    defineField({
      name: 'tipping',
      title: 'チップの文化はあるか',
      type: 'boolean',
    }),
    defineField({
      name: 'summary',
      title: '一覧用の短い概要',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: '詳細な両替・決済ガイド（リッチテキスト）',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'flag',
      title: '国旗イメージ',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'currency',
      media: 'flag',
    },
  },
})
