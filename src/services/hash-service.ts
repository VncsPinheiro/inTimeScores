import bcrypt from 'bcrypt'

export class HashService {
  private saltRounds: number
	constructor() {
		this.saltRounds = 10
	}

	async hash(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds)
	}

	async compare(hash: string, password: string): Promise<boolean> {
		return bcrypt.compare(password, hash)
	}
}

export const hashService = new HashService()
