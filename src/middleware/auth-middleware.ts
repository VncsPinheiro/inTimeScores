import type { NextFunction, Request, Response } from 'express'
import { type JwtEncrypter, jwtEncrypter } from '../services/jwt-service'

export class AuthMiddleware {
	constructor(private jwtEncrypter: JwtEncrypter) {}

	handle = async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization
		const token = authHeader?.split(' ')[1]

		if (!token)
			return res
				.status(401)
				.send({ message: 'Acesso negado. Token não fornecido.' })

		const result = this.jwtEncrypter.verify(token)

		if (result.isLeft())
			return res.status(400).send({
				message: 'Token Inválido',
			})
		req.userId = result.value.id
		next()
	}
}

export const authMiddleware = new AuthMiddleware(jwtEncrypter)
