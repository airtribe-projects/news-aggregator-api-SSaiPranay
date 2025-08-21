import express from 'express'
import cors from 'cors'
import newsRoutes from './routes/news.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/news', newsRoutes)

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
