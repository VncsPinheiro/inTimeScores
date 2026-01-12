import type { Request, Response } from 'express'
import { type FootballDataApi, FootballDataService } from '../services/football-data-service'

class GetTeamsMatchesPerCompetition {
  constructor(private apiService: FootballDataApi) {}
  handle = async (request: Request, response: Response) => {
    const { id, competitionId } = request.params
    const data = await this.apiService.getTeamsMatchesPerCompetition(id, competitionId)
    response.status(200).send(data)
  }
}

export const GetTeamsMatchesPerCompetitionController = new GetTeamsMatchesPerCompetition(FootballDataService)
