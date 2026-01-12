// import type { Request, Response } from 'express'
// import { Firebase, type FirebaseInstance } from "../services/firebase-service";

// class SignInWithFirebase {
//   constructor(private firebase: FirebaseInstance) {}

//   handle = async (request: Request, response: Response) => {
//     const { email, password } = request.body
//     await this.firebase.signIn({ email, password })
//     response.status(200).send('User authenticated')
//   }
// }

// export const SignInWithFirebaseController = new SignInWithFirebase(Firebase)