import axios from 'axios'
export async function fetchGNews({ apiKey, query, categories, language, pageSize = 20 }) {
const url = 'https://gnews.io/api/v4/top-headlines'
const params = { token: apiKey, lang: language || 'en', max: pageSize }
if (query) params.q = query
const r = await axios.get(url, { params })
return (r.data.articles || []).map(a => ({
id: a.url,
title: a.title,
url: a.url,
source: a.source?.name || '',
description: a.description || '',
publishedAt: a.publishedAt || '',
imageUrl: a.image || ''
}))
}