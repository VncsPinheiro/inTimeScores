import express from 'express'
import { env } from './env'
import cors from 'cors'
import { GetMatchesInACompetitionController } from './controllers/get-matches-in-a-competition-controller'
import { GetCompetitionsController } from './controllers/get-competition-controller'
import { GetTeamsInACompetitionController } from './controllers/get-teams-in-a-competition-controller'
import { GetTeamController } from './controllers/get-team-controller'
import { GetTeamsMatchesController } from './controllers/get-team-matches-controller'
import { GetTeamsMatchesPerCompetitionController } from './controllers/get-team-matches-per-competition-controller'
import { SignUpWithFirebaseController } from './controllers/sign-up-controller'
// import { SignInWithFirebaseController } from './controllers/sign-in-controller'
import { authMiddleware } from './middleware/auth-middleware'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (__req, res) => {
  res.status(200).send('OK')
})

app.get('/competitions', authMiddleware, GetCompetitionsController.handle)
app.get('/competitions/:name/matches', authMiddleware, GetMatchesInACompetitionController.handle)
app.get('/competitions/:name/teams', authMiddleware, GetTeamsInACompetitionController.handle)
app.get('/team/:id', authMiddleware, GetTeamController.handle)
app.get('/team/:id/matches', authMiddleware, GetTeamsMatchesController.handle)
app.get('/team/:id/matches/:competitionId', authMiddleware, GetTeamsMatchesPerCompetitionController.handle)

app.post('/sign-up', SignUpWithFirebaseController.handle)
// app.post('/sign-in', SignInWithFirebaseController.handle)

app.listen(env.PORT, () => {
  console.log(`System is running on port ${env.PORT}`)
})