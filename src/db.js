import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'data', 'db.json')
const adapter = new JSONFile(file)
export const db = new Low(adapter, { users: [], preferences: [], reads: [], favorites: [] })
export async function initDB() { await db.read(); db.data ||= { users: [], preferences: [], reads: [], favorites: [] }; await db.write() }