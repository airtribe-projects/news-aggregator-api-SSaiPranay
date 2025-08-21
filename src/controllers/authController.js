import { db } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import { nanoid } from 'nanoid'
export async function register(req, res) {
await db.read()
const { email, password } = req.body
const exists = db.data.users.find(u => u.email === email)
if (exists) return res.status(409).json({ error: 'User exists' })
const hash = await bcrypt.hash(password, 10)
const user = { id: nanoid(), email, password: hash }
db.data.users.push(user)
db.data.preferences.push({ userId: user.id, categories: [], language: 'en' })
await db.write()
return res.status(201).json({ id: user.id, email: user.email })
}
export async function login(req, res) {
await db.read()
const { email, password } = req.body
const user = db.data.users.find(u => u.email === email)
if (!user) return res.status(401).json({ error: 'Invalid credentials' })
const ok = await bcrypt.compare(password, user.password)
if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.tokenTtl })
return res.json({ token })
}