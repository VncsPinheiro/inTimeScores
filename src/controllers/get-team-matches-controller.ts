import type { Request, Response } from 'express'
import { type FootballDataApi, FootballDataService } from '../services/football-data-service'

class GetTeamsMatches {
  constructor(private apiService: FootballDataApi) {}
  handle = async (request: Request, response: Response) => {
    const { id } = request.params
    const data = await this.apiService.getTeamMatches(id)
    response.status(200).send(data)
  }
}

export const GetTeamsMatchesController = new GetTeamsMatches(FootballDataService)
