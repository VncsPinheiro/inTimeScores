import type { Request, Response } from 'express'
import { firebaseService, type FirebaseService } from '../services/firebase-service'
import { jwtEncrypter, type JwtEncrypter } from '../services/jwt-service'
import { hashService, type HashService } from '../services/hash-service'

class SignUpController {
	constructor(private firebaseService: FirebaseService, private jwtEncrypter: JwtEncrypter, private hashService: HashService) {}

	handle = async (request: Request, response: Response) => {
		const { email, password, name, username } = request.body
		const validUser = await this.firebaseService.getUserByEmail({ email })

		if (validUser) return response.status(404).json({
			message: 'Email já está cadastrado!'
		})
		
		const hashedPassword = await this.hashService.hash(password) 
		const userId = await this.firebaseService.createUser({
			email,
			password: hashedPassword,
			name, 
			username,
		})

		if (userId.isLeft()) return response.status(400).send({
			message: 'Erro ao criar usuário'
		})

		const token = this.jwtEncrypter.sign(userId.value.id)
		response.status(201).json({
			token,
		})
	}
}

export const signUpController = new SignUpController(firebaseService, jwtEncrypter, hashService)