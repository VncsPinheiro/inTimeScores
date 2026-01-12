import type { Request, Response } from 'express'
import { type FootballDataApi, FootballDataService } from '../services/football-data-service'

class GetCompetitions {
  constructor(private apiService: FootballDataApi) {}
  handle = async (__request: Request, response: Response) => {
      const data = await this.apiService.getAllCompetitions()
      response.status(200).send(data)
  }
}

export const GetCompetitionsController = new GetCompetitions(FootballDataService)