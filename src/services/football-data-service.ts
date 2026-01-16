import { resolve } from 'node:dns'
import { type Either, Left, left, right } from '../core/Either'
import { env } from '../env'
import type {
	FormatedCompetition,
	FormatedMatch,
	FormatedMatchWithCompetition,
	FormatedTeam,
	GetAllCompetitionsRequestType,
	GetAllCompetitionsResponseType,
	GetAllMatchesInACompetitionRequest,
	GetAllMatchesInACompetitionResponse,
	GetAllTeamsInACompetitionRequest,
	GetAllTeamsInACompetitionResponse,
	GetTeamMatchesRequest,
	GetTeamMatchesResponse,
	GetTeamRequest,
	GetTeamResponse,
	GetTeamsMatchesPerCompetitionResponse,
} from '../types/root'

export class FootballDataApi {
	constructor(private apiKey: string) {}

	async getAllCompetitions(): Promise<
		Either<Error, GetAllCompetitionsResponseType>
	> {
		const request =
			await this.fetchToApi<GetAllCompetitionsRequestType>('/competitions')

		if (request.isLeft()) return left(request.value)

		const competitions: FormatedCompetition[] = request.value.competitions.map(
			(i) => ({
				id: i.id,
				area: {
					name: i.area.name,
					flag: i.area.flag,
				},
				name: i.name,
				emblem: i.emblem,
				avaliableSeasons: i.numberOfAvaliableSeasons,
			}),
		)

		return right({
			count: request.value.count,
			competitions,
		})
	} // Checked Again

	async getAllMatchesInACompetition(
		name: string,
	): Promise<Either<Error, GetAllMatchesInACompetitionResponse>> {
		const request = await this.fetchToApi<GetAllMatchesInACompetitionRequest>(
			`/competitions/${name}/matches`,
		)

		if (request.isLeft()) return left(request.value)

		const matches: FormatedMatch[] = request.value.matches.map((i) => ({
			id: i.id,
			utcDate: i.utcDate,
			matchDay: i.matchday,
			stage: i.stage,
			status: i.status,
			teams: {
				homeTeam: i.homeTeam,
				awayTeam: i.awayTeam,
			},
			score: {
				winner: i.score.winner,
				duration: i.score.duration,
				fullTime: i.score.fullTime,
			},
			referees: i.referees,
		}))

		return right({
			matches,
		})
	} // Cheked Again

	async getAllTeamsInACompetition(
		competitionName: string,
	): Promise<Either<Error, GetAllTeamsInACompetitionResponse>> {
		const request = await this.fetchToApi<GetAllTeamsInACompetitionRequest>(
			`/${competitionName}/teams`,
		)

		if (request.isLeft()) return left(request.value)

		const teams = request.value.teams.map((i) => ({
			id: i.id,
			area: {
				name: i.area.name,
				flag: i.area.flag,
			},
			name: i.name,
			shortName: i.shortName,
			tla: i.tla,
			crest: i.crest,
		}))

		return right({
			teams,
		})
	} // Cheked Again

	async getTeam(teamId: string): Promise<Either<Error, GetTeamResponse>> {
		const request = await this.fetchToApi<GetTeamRequest>(`/teams/${teamId}`)

		if (request.isLeft()) return left(request.value)

		const team: FormatedTeam = {
			id: request.value.id,
			area: {
				name: request.value.area.name,
				flag: request.value.area.flag,
			},
			name: request.value.name,
			shortName: request.value.shortName,
			tla: request.value.tla,
			crest: request.value.crest,
		}
		return right({
			team,
		})
	} // Cheked Again

	async getTeamMatches(
		teamId: string,
	): Promise<Either<Error, GetTeamMatchesResponse>> {
		const request = await this.fetchToApi<GetTeamMatchesRequest>(
			`/teams/${teamId}/matches`,
		)

		if (request.isLeft()) return left(request.value)

		const matches: FormatedMatchWithCompetition[] = request.value.matches.map(
			(i) => ({
				competition: i.competition,
				id: i.id,
				utcDate: i.utcDate,
				status: i.status,
				matchDay: i.matchday,
				stage: i.stage,
				teams: {
					homeTeam: i.homeTeam,
					awayTeam: i.awayTeam,
				},
				score: {
					winner: i.score.winner,
					duration: i.score.duration,
					fullTime: i.score.fullTime,
				},
				referees: i.referees,
			}),
		)

		return right({
			resultSet: request.value.resultSet,
			matches,
		})
	} // Cheked Again

	async getTeamsMatchesPerCompetition(
		teamId: string,
		competitionId?: string,
	): Promise<Either<Error, GetTeamsMatchesPerCompetitionResponse>> {
		const request = await this.fetchToApi<GetTeamMatchesRequest>(
			`/teams/${teamId}/matches?competitions=${competitionId}`,
		)

		if (request.isLeft()) return left(request.value)

		const matches: FormatedMatchWithCompetition[] = request.value.matches.map((i) => ({
			competition: i.competition,
			id: i.id,
			utcDate: i.utcDate,
			status: i.status,
			matchDay: i.matchday,
      stage: i.stage,
			teams: {
				homeTeam: i.homeTeam,
				awayTeam: i.awayTeam,
			},
			score: {
        winner: i.score.winner,
        duration: i.score.duration,
        fullTime: i.score.fullTime
      },
			referees: i.referees,
		}))

    return right ({
      resultSet: request.value.resultSet,
      matches,
    })
	} // Cheked Again

	private async fetchToApi<T>(url: string): Promise<Either<Error, T>> {
		try {
			const response = await fetch(`https://api.football-data.org/v4${url}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth-Token': this.apiKey,
				},
			}).then((res) => res.json() as Promise<T>)

			return right(response)
		} catch (err: any) {
			return left(new Error(`Api error. Message: ${err}`))
		}
	} // Método de requisição
}

export const FootballDataService = new FootballDataApi(env.API_KEY)