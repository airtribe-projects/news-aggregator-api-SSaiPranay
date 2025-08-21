import NodeCache from 'node-cache'
import { config } from '../../src/config.js'
export const cache = new NodeCache({ stdTTL: config.cacheTtl, checkperiod: 60 })
export function cacheKeyForNews(userId) { return `news:${userId}` }