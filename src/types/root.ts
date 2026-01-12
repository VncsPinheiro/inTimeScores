export interface Root {
  filters: Filters
  resultSet: ResultSet
  matches: Match[]
}

export interface Filters {
  competitions: string
  permission: string
  limit: number
}

export interface ResultSet {
  count: number
  competitions: string
  first: string
  last: string
  played: number
  wins: number
  draws: number
  losses: number
}

export interface Match {
  area: Area
  competition: Competition
  season: Season
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: string
  group: any
  lastUpdated: string
  homeTeam: HomeTeam
  awayTeam: AwayTeam
  score: Score
  odds: Odds
  referees: Referee[]
}

export interface Area {
  id: number
  name: string
  code: string
  flag: string
}

export interface Competition {
  id: number
  name: string
  code: string
  type: string
  emblem: string
}

export interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner: any
}

export interface HomeTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

export interface AwayTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

export interface Score {
  winner?: string
  duration: string
  fullTime: FullTime
  halfTime: HalfTime
}

export interface FullTime {
  home?: number
  away?: number
}

export interface HalfTime {
  home?: number
  away?: number
}

export interface Odds {
  msg: string
}

export interface Referee {
  id: number
  name: string
  type: string
  nationality: string
}

export interface MatchResponse {
  area: Area
  competition: Competition
  season: Season
  id: string
  utcDate: string
  status: string
  matchday: number
  stage: string
  lastUpdated: string
  homeTeam: HomeTeam
  awayTeam: AwayTeam
  score: Score
  odds: Odds
  referees: Referee[]
}

export interface CompetitionResponse {
  filters: Filters,
  resultSet: ResultSet,
  competition: Competition,
  matches: Match[]
}

export interface TeamsByCompetition {
  count: number,
  filters: Filters,
  competition: Competition,
  season: Season,
  teams: Team[]
}

export interface Contract {
  start: string
  until: string
}

export interface Coach {
  id: number
  firstName: string
  lastName: string
  name: string
  dateOfBirth: string
  nationality: string
  contract: Contract
}

export interface Player {
  id: number
  name: string
  position: string
  dateOfBirth: string
  nationality: string
}

export type Squad = Player[]

export interface Team {
  area: Area
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: string
  clubColors: string
  venue: string
  runningCompetitions: Competition[]
  coach: Coach
  squad: Squad
  staf: any[]
  lastUpdated: string
}

export interface dataTeamsFormatted {
  id: number
  name: string
}



















// Rota 1: Todas as competições
export interface GetAllCompetitionsRequestType {
  count: number
  competitions: Competition[]
}

export interface Competition {
  id: number
  area: Area
  name: string
  code: string
  type: string
  emblem: string
  plan: string
  currentSeason: Season
  numberOfAvaliableSeasons: number
  lastUpdated: string
}

// Rota 2: Todas as partidas em uma competição específica
export interface GetAllMatchesInACompetitionRequest {
  competition: Competition
  matches: Match[]
}


// Rota 3: Todos os times em uma competição específica
export interface GetAllTeamsInACompetitionRequest {
  competition: Competition
  teams: Team[]
}

// Rota 4: Pegar um time específico
export type GetTeamRequest = Team

// Rota 5: Pegar as partidas de um time
export interface GetTeamMatchesRequest {
  resultSet: ResultSet
  matches: Match[]
}