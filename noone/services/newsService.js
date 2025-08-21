import { config } from '../../src/config.js'
import { fetchNewsAPI } from './providers/newsapi.js'
import { fetchGNews } from './providers/gnews.js'
import { fetchNewsCatcher } from './providers/newscatcher.js'
export async function fetchNewsFromProvider(prefs, query) {
const language = prefs?.language || 'en'
const categories = prefs?.categories || []
const apiKey = config.providerKey
if (!apiKey) return []
if (config.provider === 'gnews') return await fetchGNews({ apiKey, query, categories, language })
if (config.provider === 'newscatcher') return await fetchNewsCatcher({ apiKey, query, categories, language })
return await fetchNewsAPI({ apiKey, query, categories, language })
}