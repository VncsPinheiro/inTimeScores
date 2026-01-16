import type { Request, Response } from 'express'
import {
	type FootballDataApi,
	FootballDataService,
} from '../services/football-data-service'

class GetTeam {
	constructor(private apiService: FootballDataApi) {}
	handle = async (request: Request, response: Response) => {
		const { id } = request.params
		const data = await this.apiService.getTeam(id)
		response.status(200).send(data)
	}
}

export const GetTeamController = new GetTeam(FootballDataService)
