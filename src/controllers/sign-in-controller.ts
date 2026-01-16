import type { Request, Response } from 'express'
import { firebaseService, type FirebaseService } from '../services/firebase-service'
import { jwtEncrypter, type JwtEncrypter } from '../services/jwt-service'
import { hashService, HashService } from '../services/hash-service'

class SignInController {
	constructor(
		private firebaseService: FirebaseService,
		private jwtEncrypter: JwtEncrypter,
		private hashService: HashService,
	) {}

	handle = async (request: Request, response: Response) => {
		const { email, password } = request.body
		const user = await this.firebaseService.getUserByEmail({ email })

		if (!user)
			return response.status(400).send({
				message: 'Usuário não encontrado',
			})

		const isPasswordValid = await this.hashService.compare(user.password, password)

		if (!isPasswordValid) return response.status(400).send({
			message: 'Invalid password'
		})

		const token = this.jwtEncrypter.sign(user.id)

		response.status(200).json({
			token,
		})
	}
}

export const signInController = new SignInController(firebaseService, jwtEncrypter, hashService)
