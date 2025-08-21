import dotenv from 'dotenv'
dotenv.config()
export const config = {
port: process.env.PORT || 4000,
jwtSecret: process.env.JWT_SECRET || 'dev_secret',
tokenTtl: process.env.TOKEN_TTL || '1d',
provider: process.env.NEWS_PROVIDER || 'newsapi',
providerKey: process.env.NEWS_API_KEY || '',
cacheTtl: parseInt(process.env.CACHE_TTL_SECONDS || '900', 10),
cacheRefreshMs: parseInt(process.env.CACHE_REFRESH_MS || '600000', 10)
}