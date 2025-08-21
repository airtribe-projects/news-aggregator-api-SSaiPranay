import axios from 'axios'
export async function fetchNewsCatcher({ apiKey, query, categories, language, pageSize = 20 }) {
const url = 'https://api.newscatcherapi.com/v2/latest_headlines'
const params = { lang: language || 'en', page_size: pageSize }
if (query) params.q = query
const r = await axios.get(url, { params, headers: { 'x-api-key': apiKey } })
return (r.data.articles || []).map(a => ({
id: a.link,
title: a.title,
url: a.link,
source: a.clean_url || '',
description: a.excerpt || '',
publishedAt: a.published_date || '',
imageUrl: a.media || ''
}))
}