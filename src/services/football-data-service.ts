import { env } from "../env"
import type { GetAllCompetitionsRequestType, GetAllMatchesInACompetitionRequest, GetAllTeamsInACompetitionRequest, GetTeamMatchesRequest, GetTeamRequest,  } from "../types/root"

export class FootballDataApi{
  constructor (private apiKey: string) {}

  async getAllCompetitions() {
    const request = await this.fetchToApi('/competitions')
    .then(res => res.json() as Promise<GetAllCompetitionsRequestType>)

    const competitions = request.competitions.map(i => ({
      id: i.id,
      area: {
        name: i.area.name,
        flag: i.area.flag
      },
      name: i.name,
      emblem: i.emblem,
      avaliableSeasons: i.numberOfAvaliableSeasons,
    }))

    return {
      count: request.count,
      competitions,
    }
  } // Checked

  async getAllMatchesInACompetition(name: string) {
    const request: GetAllMatchesInACompetitionRequest = await this.fetchToApi(`/competitions/${name}/matches`)
    .then(res => res.json() as Promise<GetAllMatchesInACompetitionRequest>)
    
    return request.matches.map(i => ({
      id: i.id,
      utcDate: i.utcDate,
      matchDay: i.matchday,
      stage: i.stage,
      ststus: i.status,
      teams: {
        homeTeam: i.homeTeam,
        awayTeam: i.awayTeam,
      },
      score: {
        winner: i.score.winner,
        duration: i.score.duration,
        fullTime: i.score.fullTime
      },
      referees: i.referees
    }))
  } // Cheked

  async getAllTeamsInACompetition(competitionName: string) {
    const request = await this.fetchToApi(`/${competitionName}/teams`)
    .then(res => res.json() as Promise<GetAllTeamsInACompetitionRequest>)

    return request.teams.map(i => ({
      id: i.id,
      area: {
        name: i.area.name,
        flag: i.area.flag
      },
      name: i.name,
      shortName: i.shortName,
      tla: i.tla,
      crest: i.crest
    }))
  } // Cheked

  async getTeam(teamId: string) {
    const request = await this.fetchToApi(`/teams/${teamId}`)
    .then(res => res.json() as Promise<GetTeamRequest>)

    return {
      ...request,
      area: {
        name: request.area.name,
        flag: request.area.flag
      },
    }
  } // Cheked

  async getTeamMatches(teamId: string) {
    const request = await this.fetchToApi(`/teams/${teamId}/matches`)
    .then(res => res.json() as Promise<GetTeamMatchesRequest>)

    return {
      ...request,
      matches: request.matches.map(i => ({
        competititon: i.competition,
        id: i.id,
        utcDate: i.utcDate,
        status: i.status,
        matchDay: i.matchday,
        teams: {
          homeTeam: i.homeTeam,
          awayTeam: i.awayTeam
        },
        score: i.score,
        referees: i.referees
      }))
    }
  } // Cheked

  async getTeamsMatchesPerCompetition(teamId: string, competitionId?: string) {
    const request = await this.fetchToApi(`/teams/${teamId}/matches?competitions=${competitionId}`)
    .then(res => res.json() as Promise<GetTeamMatchesRequest>)
    
    return {
      ...request,
      matches: request.matches.map(i => ({
        competititon: i.competition,
        id: i.id,
        utcDate: i.utcDate,
        status: i.status,
        matchDay: i.matchday,
        teams: {
          homeTeam: i.homeTeam,
          awayTeam: i.awayTeam
        },
        score: i.score,
        referees: i.referees
      }))
    }

  } // Cheked

  private async fetchToApi(url: string) {
    return await fetch(`https://api.football-data.org/v4${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.apiKey,
      }
    })
  } // Método de requisição
}

export const FootballDataService = new FootballDataApi(env.API_KEY)