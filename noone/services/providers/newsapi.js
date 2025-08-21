import axios from 'axios'
export async function fetchNewsAPI({ apiKey, query, categories, language, pageSize = 20 }) {
const url = 'https://newsapi.org/v2/top-headlines'
const params = {}
if (language) params.language = language
if (categories && categories.length) params.category = categories[0]
if (query) params.q = query
params.pageSize = pageSize
const r = await axios.get(url, { headers: { 'X-Api-Key': apiKey }, params })
return (r.data.articles || []).map(a => ({
id: a.url,
title: a.title,
url: a.url,
source: a.source?.name || '',
description: a.description || '',
publishedAt: a.publishedAt || '',
imageUrl: a.urlToImage || ''
}))
}