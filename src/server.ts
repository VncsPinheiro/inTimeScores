import cors from 'cors'
import express from 'express'
import { env } from './env'
import { router } from './routes/routes'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (__req, res) => {
	res.status(200).send('OK')
})

app.use(router)

app.listen(env.PORT, () => {
	console.log(`System is running on port ${env.PORT}`)
})
