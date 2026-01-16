import jwt from 'jsonwebtoken'
import { type Either, left, right } from '../core/Either'
import { env } from '../env'

export class JwtEncrypter {
	private secret: string
	constructor() {
		this.secret = env.SECRET_KEY
	}

	sign(id: string): string {
		return jwt.sign({ id }, this.secret, {})
	}

	verify(token: string): Either<Error, { id: string }> {
		try {
			const result = jwt.verify(token, this.secret) as { id: string }
			return right(result)
		} catch (err: any) {
			return left(new Error('Erro'))
		}
	}
}

export const jwtEncrypter = new JwtEncrypter()
