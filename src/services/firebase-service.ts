import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from 'firebase/firestore'
import { db } from '../../firebase-config'
import { type Either, left, right } from '../core/Either'
import { snapshot } from 'node:test'

interface DocSnapDatatype {
	username: string
	password: string
	email: string
	name: string
}

export class FirebaseService {
	async createUser(data: {
		name: string
		username: string
		email: string
		password: string
	}): Promise<Either<Error, { id: string }>> {
		try {
			const docRef = await addDoc(collection(db, 'users'), { ...data, status: 'ACTIVE' })
			return right({ id: docRef.id })
		} catch (err: any) {
			return left(
				new Error(
					`Firebase reornou um erro ao tentar salvar os dados de ${data.email} no banco. Mensagem de erro: ${err.message}`,
				),
			)
		}
	}

	async isUserValid({ email, password }: { email: string, password: string}): Promise<null | { id: string}> {
		console.log(`Email: ${email}, Password: ${password}`)
		const q =  query(collection(db, 'users'), where('email', '==', email), where('password', '==', password), where('status', '==', 'ACTIVE'))
		const docSnap = await getDocs(q)
		console.log(docSnap.empty)

		const user = docSnap.docs[0]
		console.log(user.data())

		if (!user.id) return null

		return {
			id: user.id
		}
	}

	async getUserByEmail({ email }: { email: string}): Promise<null | { id: string } & User> {
		const collectionRef = collection(db, 'users')
		const q = query(
			collectionRef,
			where('email', '==', email),
			where('status', '==', 'ACTIVE'),
		)
		const snapshot = await getDocs(q)

		if (snapshot.empty) return null

		const user = snapshot.docs[0]

		return {
			id: user.id,
			... user.data() as User
		}
	}
}

interface User {

	name: string
	username: string
	email: string
	password: string
}

export const firebaseService = new FirebaseService()
