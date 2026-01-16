import express from 'express'
import { GetCompetitionsController } from '../controllers/get-competition-controller'
import { GetMatchesInACompetitionController } from '../controllers/get-matches-in-a-competition-controller'
import { GetTeamController } from '../controllers/get-team-controller'
import { GetTeamsMatchesController } from '../controllers/get-team-matches-controller'
import { GetTeamsMatchesPerCompetitionController } from '../controllers/get-team-matches-per-competition-controller'
import { GetTeamsInACompetitionController } from '../controllers/get-teams-in-a-competition-controller'
import { signInController } from '../controllers/sign-in-controller'
import { signUpController } from '../controllers/sign-up-controller'
import { authMiddleware } from '../middleware/auth-middleware'

export const router = express.Router()

router.get(
	'/competitions',
	authMiddleware.handle,
	GetCompetitionsController.handle,
)
router.get(
	'/competitions/:name/matches',
	authMiddleware.handle,
	GetMatchesInACompetitionController.handle,
)
router.get(
	'/competitions/:name/teams',
	authMiddleware.handle,
	GetTeamsInACompetitionController.handle,
)
router.get('/team/:id', authMiddleware.handle, GetTeamController.handle)
router.get(
	'/team/:id/matches',
	authMiddleware.handle,
	GetTeamsMatchesController.handle,
)
router.get(
	'/team/:id/matches/:competitionId',
	authMiddleware.handle,
	GetTeamsMatchesPerCompetitionController.handle,
)

router.post('/sign-in', signInController.handle)
router.post('/sign-up', signUpController.handle)
