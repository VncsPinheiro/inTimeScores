import type { Request, Response } from 'express'
import { type FootballDataApi, FootballDataService } from '../services/football-data-service'

class GetTeamsInACompetition {
  constructor(private apiService: FootballDataApi) {}
  handle = async (request: Request, response: Response) => {
    const { name } = request.params
    const data = await this.apiService.getAllTeamsInACompetition(name)
    response.status(200).send(data)
  }
}

export const GetTeamsInACompetitionController = new GetTeamsInACompetition(FootballDataService)
