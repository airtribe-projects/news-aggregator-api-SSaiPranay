import { db } from '../db.js'
export async function getPreferences(req, res) {
await db.read()
const p = db.data.preferences.find(x => x.userId === req.user.id)
return res.json(p || { userId: req.user.id, categories: [], language: 'en' })
}
export async function updatePreferences(req, res) {
await db.read()
const { categories, language } = req.body
let p = db.data.preferences.find(x => x.userId === req.user.id)
if (!p) {
p = { userId: req.user.id, categories: categories || [], language: language || 'en' }
db.data.preferences.push(p)
} else {
if (Array.isArray(categories)) p.categories = categories
if (language) p.language = language
}
await db.write()
return res.json(p)
}